/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  Box,
  Spinner,
} from '@chakra-ui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Alert from '../alert/Alert'
import {
  addActivity,
  getActivityById,
  updateActivity,
} from '../../services/activitiesService'
import './ActivitiesForm.css'
import UploadFile from '../../services/imgUploadService'
import GridImages from './GridImages'

const ActivitiesForm = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadImage, setLoadImage] = useState(null)
  const [comment, setComment] = useState(null)
  const [data, setData] = useState('')
  const [activity, setActivity] = useState({
    id: null,
    name: '',
    image: null,
    oldImage: '',
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
          title: 'Hubo un error!',
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
    UploadFile(values.image)
    const updatedActivity = await updateActivity(id, {
      name: values.name,
      content: data.content,
      image: values.image ? await UploadFile(values.image) : activity.oldImage,
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
      navigate('/')
    }
  }

  const AddSubmitHandler = async (values) => {
    if (loadImage !== '') {
      try {
        setLoading(true)
        const newActivity = await addActivity({
          name: values.name,
          content: data.content,
          image: values.image ? await UploadFile(values.image) : null,
        })
        if (newActivity) {
        // eslint-disable-next-line no-console
          console.log(newActivity);
          const successAlert = {
            show: true,
            title: 'Actividad',
            message: 'Actividad agregada!',
            icon: 'success',
            onConfirm: () => {},
          }
          setAlerts(successAlert)
          navigate('/')
          setLoading(false)
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
  }

  const onSave = () => {
    if (!comment) setComment('')
    if (!loadImage) setLoadImage('')
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
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleBlur,
            handleSubmit,
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
                <Heading mb="16px">Actividad</Heading>
                <FormControl>
                  <FormLabel paddingLeft="0.5" fontSize="lg">Titulo</FormLabel>
                  <Input
                    backgroundColor="white"
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
                  <FormLabel paddingLeft="0.5" fontSize="lg">Contenido</FormLabel>
                  <CKEditor
                    data={values.content}
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const editedData = editor.getData()
                      setComment(editedData)
                      setFieldValue('content', editor.getData())
                      setData({ ...activity, content: editedData })
                    }}
                  />
                  {comment === '' && !id && (
                    <small>El comentario es obligatio</small>
                  )}
                </FormControl>
                <Box align="left" w="100%" pb="16px">
                  <FormControl>
                    <FormLabel>{activity.inputText}</FormLabel>
                    <Box>
                      <Input
                        width="230px"
                        border-radius="5px"
                        padding="4px 5px"
                        cursor="pointer"
                        type="file"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0]
                          setFieldValue('image', file)
                          setLoadImage(URL.createObjectURL(file))
                        }}
                        value={values.file}
                      />
                    </Box>
                  </FormControl>
                  {loadImage === '' && !id && (
                    <small>La imagen es obligatoria</small>
                  )}
                  <GridImages
                    id={id}
                    name={values.name}
                    oldImage={values.oldImage}
                    loadImage={loadImage}
                  />
                </Box>
                <Button
                  border="2px solid black"
                  backgroundColor="#d6f5d6"
                  _hover={{
                    backgroundColor: '#6fdc6f',
                  }}
                  type="submit"
                  w="100%"
                  onClick={onSave}
                >
                  {loading ? <Spinner /> : 'Guardar'}
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
