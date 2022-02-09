/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
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
import Alert from '../alert/Alert'
import { addActivity, getActivityById, updateActivity } from '../../services/activitiesService'
import imgUploadService from '../../services/imgUploadService'
import './ActivitiesForm.css'

const ActivitiesForm = () => {
  const { id } = useParams()

  const [loadImage, setLoadImage] = useState(null)
  const [comment, setComment] = useState('')
  const [data, setData] = useState('')
  const [activity, setActivity] = useState({
    id: null,
    name: '',
    image: null,
    content: '',
    textButton: 'Crear',
    inputText: 'Imagen',
  })
  const [ready, setReady] = useState(false)
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })
  const loadactivity = async () => {
    if (id) {
      try {
        const loadedactivity = await getActivityById(id)
        // eslint-disable-next-line no-console
        console.log(loadedactivity);
        setActivity({
          id: loadedactivity.data.result.id,
          name: loadedactivity.data.result.name,
          oldImage: loadedactivity.data.result.image,
          content: loadedactivity.data.result.content,
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
    loadactivity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateChangeHandler = async (values) => {
    const updatedActivity = await updateActivity(id, {
      name: values.name,
      content: data.content,
      image: values.image ? await imgUploadService(values.image) : activity.oldImage,
    })
    if (updatedActivity) {
      const successAlert = {
        show: true,
        title: 'Actividad',
        message: 'La actividad se ha actualizado!',
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
    }
  }

  const AddSubmitHandler = async (values) => {
    try {
      const newActivity = await addActivity({
        name: values.name,
        content: data.content,
        image: values.image ? await imgUploadService(values.image) : null,
      })
      if (newActivity) {
        const successAlert = {
          show: true,
          title: 'Actividad',
          message: 'Actividad agregada!',
          icon: 'success',
          onConfirm: () => {},
        }
        setAlerts(successAlert)
        Navigate('/')
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
          initialValues={activity}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Nombre requerido!')
              .min(3, 'Nombre muy corto!'),
            content: Yup.string().min(1).max(150).required(),
          })}
          onSubmit={(values) =>
            (id ? updateChangeHandler(values) : AddSubmitHandler(values))}
        >
          {({
            values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit,
          }) => (
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
                w={{ base: '100%', md: '90%', sm: '90%' }}
                h="auto"
                justifyContent="center"
                borderWidth="1px solid white"
                borderRadius="lg"
                boxShadow="lg"
                backgroundColor="white"
                display="block"
                onSubmit={handleSubmit}
              >
                <Heading align="center">Actividad</Heading>
                <FormControl>
                  <FormLabel paddingLeft="2">Titulo</FormLabel>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    onBlur={handleBlur}
                    value={values.name}
                    onChange={handleChange}
                  />
                  <small>{errors.name && touched.name && errors.name}</small>

                </FormControl>
                <Spacer />
                <FormControl id="content">
                  <FormLabel paddingLeft="2">Contenido</FormLabel>
                  <CKEditor
                    data={values.content}
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const editedData = editor.getData()
                      setComment(editedData)
                      setFieldValue('content', editor.getData())
                      console.log(editedData);
                      setData({ ...activity, content: editedData })
                    }}
                  />
                  { comment === ''
                  && <small>El comentario es obligatio</small>}
                </FormControl>
                {id && (
                <Box>
                  <FormLabel>Imagen actual</FormLabel>
                  <Image alt={activity.name} objectFit="cover" src={activity.oldImage} />
                </Box>
                )}
                <Box>
                  <FormControl>
                    <FormLabel>{activity.inputText}</FormLabel>
                    <input
                      type="file"
                      onChange={(event) => {
                        setFieldValue('image', event.currentTarget.files[0])
                        setLoadImage(event.currentTarget.files[0])
                      }}
                      value={values.file}
                    />
                  </FormControl>
                  { loadImage === null
                    && <small>La imagen es obligatoria</small>}
                </Box>
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

export default ActivitiesForm
