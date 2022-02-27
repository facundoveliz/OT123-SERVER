import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik } from 'formik'
import {
  FormControl,
  FormLabel,
  VStack,
  Button,
  HStack,
  Box,
  Input,
  Image,
  Icon,
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch } from 'react-redux'
import Spinner from '../Spinner'
import { getSliderById, updateSlider } from '../../services/slidersService'
import UploadFile from '../../services/imgUploadService'
import { setAlertData } from '../../app/slices/alert'

const EditSlideForm = () => {
  const dispatch = useDispatch()
  const [loadImage, setLoadImage] = useState(null)
  const navigate = useNavigate()
  const { id: slideId } = useParams()
  const [slide, setSlide] = useState({
    imageUrl: '',
    text: '',
    order: '',
    image: null,
  })

  useEffect(() => {
    getSliderById(slideId).then(({ data }) => {
      setSlide(data.result)
    })
    // eslint-disable-next-line
  }, [])

  const onSubmit = async (values, { setSubmitting }) => {
    if (values.image !== undefined) {
      const URL = await UploadFile(values.image)
      values.imageUrl = URL
    }

    const updatedSlider = await updateSlider(slideId, values)
    if (updatedSlider) {
      const successAlert = {
        show: true,
        title: 'Actualizar slide',
        message: 'Se actualizo el slide exito!',
        icon: 'success',
        onConfirm: () => {},
      }
      dispatch(setAlertData(successAlert))
      setSubmitting(false)
      navigate('/home')
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={slide}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <HStack
          display="flex"
          justifyContent="center"
          backgroundColor="#f2f2f2"
        >
          <VStack
            as="form"
            h="auto"
            w={{ base: '90%', md: '40%' }}
            m="40px"
            p="25px"
            borderRadius="lg"
            boxShadow="lg"
            borderWidth="1px solid white"
            border="2px solid black"
            backgroundColor="#ffffcc"
            onSubmit={handleSubmit}
          >
            <Box width="100%">
              <Icon
                alignitems="left"
                as={FiArrowLeft}
                w={8}
                h={8}
                mb={4}
                border="2px solid black"
                borderRadius="lg"
                boxShadow="lg"
                backgroundColor="#ccebff"
                _hover={{
                  backgroundColor: '#4db8ff',
                  transition: 'all 0.3s ease',
                }}
                cursor="pointer"
                onClick={() => {
                  navigate(-1)
                }}
              />
            </Box>
            <FormControl>
              <FormLabel fontSize="4xl" textAlign="center">
                Editar slide
              </FormLabel>
              {/* SLIDE ORDER */}
              <Input type="hidden" name="order" value={values.order} />
              {/* SLIDE IMAGE URL */}
              <Input type="hidden" name="imageUrl" value={values.imageUrl} />
              {/* SLIDE TEXT */}
              <FormControl id="text">
                <FormLabel>Ingrese el texto</FormLabel>
                <Input
                  backgroundColor="white"
                  type="text"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <small>{errors.text && touched.text && errors.text}</small>
              </FormControl>
              {/* SLIDE IMAGE */}
              <FormControl id="image">
                <FormLabel paddingTop="2" fontSize="2xl" textAlign="center">
                  Imagen para slide
                </FormLabel>
                <FormLabel>Imagen actual</FormLabel>
                <Box p={4}>
                  <Image src={slide.imageUrl} />
                </Box>
                <Box align="left" w="100%" pb="16px">
                  <FormControl>
                    <Input
                      width="240px"
                      border-radius="5px"
                      padding="4px 5px"
                      type="file"
                      onChange={(event) => {
                        const file = event.currentTarget.files[0]
                        setFieldValue('image', file)
                        setLoadImage(URL.createObjectURL(file))
                      }}
                      value={values.file}
                    />
                  </FormControl>
                  {loadImage === null && !slideId && (
                    <small>La imagen es obligatoria</small>
                  )}
                </Box>
                {loadImage !== null && (
                  <>
                    <FormLabel textAlign="center">Nueva imagen</FormLabel>
                    <Box paddingBottom="2">
                      <Image
                        alt={`slider ${slideId}`}
                        objectFit="cover"
                        src={loadImage}
                      />
                    </Box>
                  </>
                )}

                <small>{errors.image && touched.image && errors.image}</small>
              </FormControl>
              {/* SUBMIT */}
              <Button
                type="submit"
                loadingText="Enviando"
                spinner={isSubmitting ? <Spinner /> : null}
                size="lg"
                border="2px solid black"
                backgroundColor="#d6f5d6"
                _hover={{
                  backgroundColor: '#6fdc6f',
                }}
                w="100%"
              >
                Enviar
              </Button>
            </FormControl>
          </VStack>
        </HStack>
      )}
    </Formik>
  )
}

export default EditSlideForm
