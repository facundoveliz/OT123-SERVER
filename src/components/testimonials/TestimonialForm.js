import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Heading,
  HStack,
  VStack,
  Button,
  FormLabel,
  Input,
  Spacer,
  FormControl,
  Image,
  Box,
} from '@chakra-ui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { add, getTestimonial, update } from '../../services/testimonialsService'
import Alert from '../alert/Alert'

const TestimonialForm = () => {
  const { id } = useParams()
  const [testimonialData, setTestimonialData] = useState({
    id: null,
    name: '',
    image:
      'https://nypost.com/wp-content/uploads/sites/2/2021/12/nature_14.jpg?quality=80&strip=all&w=744',
    content: '',
  })
  const [ready, setReady] = useState(false)
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })
  const loadTestimonialData = async () => {
    if (id) {
      try {
        const loadedTestimonialData = await getTestimonial(id)
        setTestimonialData({
          id: loadedTestimonialData.data.result.id,
          name: loadedTestimonialData.data.result.name,
          image:
            'https://nypost.com/wp-content/uploads/sites/2/2021/12/nature_14.jpg?quality=80&strip=all&w=744',
          content: loadedTestimonialData.data.result.content,
        })
        setReady(true)
      } catch (error) {
        const errorAlert = {
          show: true,
          title: 'Ooops, algo ha fallado!',
          message: error.message,
          icon: 'error',
          onConfirm: () => {},
        }
        setAlerts(errorAlert)
      }
    }
  }
  useEffect(() => {
    loadTestimonialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ckChangeHandler = (event, editor) => {
    const editedData = editor.getData()
    setTestimonialData((data) => ({ ...data, content: editedData }))
  }
  const updateChangeHandler = async (values) => {
    const updatedTestimonial = await update(id, {
      name: values.name,
      content: testimonialData.content,
      image: testimonialData.image,
    })
    if (updatedTestimonial) {
      const successAlert = {
        show: true,
        title: 'Testimonio',
        message: 'El testimonio se ha actualizado!',
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
    }
  }

  const AddSubmitHandler = async (values) => {
    try {
      const newTestimonial = await add({
        name: values.name,
        content: testimonialData.content,
        image: values.image,
      })
      if (newTestimonial) {
        const successAlert = {
          show: true,
          title: 'Testimonio',
          message: 'Testimonio agregado!',
          icon: 'success',
          onConfirm: () => {},
        }
        setAlerts(successAlert)
      }
    } catch (error) {
      const errorAlert = {
        show: true,
        title: 'hubo un error!',
        message: error.message,
        icon: 'error',
        onConfirm: () => {},
      }
      setAlerts(errorAlert)
    }
  }

  return (
    <>
      <Alert {...alerts} />
      {((id && ready) || !id) && (
        <Formik
          initialValues={testimonialData}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Nombre requerido!')
              .min(3, 'Nombre muy corto!'),
          })}
          onSubmit={(values) =>
            (id ? updateChangeHandler(values) : AddSubmitHandler(values))}
        >
          {({ values, handleSubmit, handleChange }) => (
            <HStack
              display="flex"
              height="100vh"
              backgroundColor="#FAFA88"
              width="100%"
            >
              <VStack
                as="form"
                m="auto"
                p="2"
                w={{ base: '90%', md: 400, sm: 300 }}
                h="auto"
                justifyContent="center"
                borderWidth="1px solid white"
                borderRadius="lg"
                boxShadow="lg"
                backgroundColor="white"
                display="block"
                onSubmit={handleSubmit}
              >
                <Heading align="center">Testimonio</Heading>
                <FormControl>
                  <FormLabel paddingLeft="2">Titulo</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <Spacer />
                <FormControl>
                  <FormLabel paddingLeft="2">Contenido</FormLabel>
                  <CKEditor
                    name="content"
                    data={values.content}
                    editor={ClassicEditor}
                    onChange={ckChangeHandler}
                  />
                </FormControl>
                <FormLabel paddingLeft="2">Imagen</FormLabel>
                <FormControl
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  <Box paddingBottom="2" align="center">
                    <Input
                      width="230px"
                      border-radius="5px"
                      padding="4px 5px"
                      cursor="pointer"
                      type="file"
                    />
                  </Box>
                  <Box paddingLeft="4" paddingRight="4">
                    <Image objectFit="cover" src={testimonialData.image} />
                  </Box>
                </FormControl>
                <Button type="submit" w="100%">
                  Guardar
                </Button>
              </VStack>
            </HStack>
          )}
        </Formik>
      )}
    </>
  )
}

export default TestimonialForm
