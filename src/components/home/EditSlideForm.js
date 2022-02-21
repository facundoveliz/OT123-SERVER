/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Formik } from 'formik'
import {
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  HStack,
  Box,
  Input,
  Image,
} from '@chakra-ui/react'

import { useDispatch } from 'react-redux'
import Spinner from '../Spinner'
import { getSliderById, updateSlider } from '../../services/slidersService'
import UploadFile from '../../services/imgUploadService'
import { setAlertData } from '../../app/slices/alert'

export default function EditSlideForm() {
  const dispatch = useDispatch()
  const [loadImage, setLoadImage] = useState(null)
  const imageRef = useRef(null)
  const navigate = useNavigate()
  const { id: slideId } = useParams()
  console.log(slideId)
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
    const URL = await UploadFile(values.image)
    values.imageUrl = URL

    const { data } = await updateSlider(slideId, values)
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
        <Form
          onSubmit={handleSubmit}
          align="center"
          justify="center"
          bg="gray.100"
        >
          <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
            <Heading fontSize="4xl" textAlign="center">
              Editar slide
            </Heading>
            <Stack spacing={4} rounded="lg" bg="white" boxShadow="lg" p={8}>
              {/* SLIDE ORDER */}
              <Input type="hidden" name="order" value={values.order} />
              {/* SLIDE IMAGE URL */}
              <Input type="hidden" name="imageUrl" value={values.imageUrl} />
              {/* SLIDE TEXT */}
              <FormControl id="text">
                <FormLabel>Ingrese el texto</FormLabel>
                <Input
                  type="text"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <small>{errors.text && touched.text && errors.text}</small>
              </FormControl>
              {/* SLIDE IMAGE */}
              <FormControl id="image">
                <FormLabel fontSize="2xl" textAlign="center">
                  Imagen para slide
                </FormLabel>
                <FormLabel>Imagen actual</FormLabel>
                <Box p={4}>
                  <Image src={slide.imageUrl} />
                </Box>

                <Box>
                  <FormControl>
                    <input
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
                    <Image
                      alt={`slider ${slideId}`}
                      objectFit="cover"
                      src={loadImage}
                    />
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
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Enviar
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
