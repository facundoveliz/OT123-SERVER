import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
  Text,
  Spinner,
  Icon,
} from '@chakra-ui/react'
import { FiArrowLeft } from 'react-icons/fi';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// eslint-disable-next-line import/no-unresolved
import { useSelector } from 'react-redux'
import { add, getOne, update } from '../../services/newsService'
import Alert from '../alert/Alert'
import UploadFile from '../../services/imgUploadService'
import GridImages from '../activitiesForm/GridImages'
import MenuCategories from './MenuCategories'
import { getCategoryData } from '../../app/slices/category'

const NewsForm = () => {
  const { id } = useParams()
  const Category = useSelector(getCategoryData)
  const categoryName = Category.payload.category.categoryData.name
  const categoryID = Category.payload.category.categoryData.id
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadImage, setLoadImage] = useState(null)
  const [comment, setComment] = useState(null)
  const [newsData, setNewsData] = useState('')
  const [entry, setEntry] = useState({
    id: null,
    name: '',
    image: null,
    oldImage: '',
    content: '',
    categoryId: 1,
    type: 'news',
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

  const loadNewsData = async () => {
    if (id) {
      try {
        const loadedNewsData = await getOne(id)
        setEntry({
          id: loadedNewsData.data.result.id,
          name: loadedNewsData.data.result.name,
          oldImage: loadedNewsData.data.result.image,
          content: loadedNewsData.data.result.content,
          category: loadedNewsData.data.result.categoryId,
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
    loadNewsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateChangeHandler = async (values) => {
    UploadFile(values.image)
    const updatedEntry = await update(id, {
      type: categoryName,
      name: values.name,
      content: newsData.content,
      image: values.image ? await UploadFile(values.image) : entry.oldImage,
      category: categoryID,
    })
    // eslint-disable-next-line no-console
    if (updatedEntry) {
      const successAlert = {
        show: true,
        title: 'Novedad',
        message: 'La novedad se ha actualizado!',
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
        const newNews = await add({
          type: categoryName,
          name: values.name,
          content: newsData.content,
          image: values.image ? await UploadFile(values.image) : null,
          categoryId: categoryID,
        })
        if (newNews) {
          const successAlert = {
            show: true,
            title: 'Novedad',
            message: 'Novedad agregada!',
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
          title: 'Hubo un error!',
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
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Nombre requerido!')
              .min(3, 'Nombre muy corto!'),
          })}
          initialValues={entry}
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
              padding="8 auto"
              backgroundColor="#f2f2f2"
              width="100%"
              justifyContent="center"
            >
              <VStack
                as="form"
                h="auto"
                w={{ base: '90%', md: '40%' }}
                m="40px"
                p="25px"
                borderRadius="lg"
                boxShadow="lg"
                border="2px solid black"
                backgroundColor="#ffffcc"
                display="block"
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
                <Heading align="center">Novedad</Heading>
                <FormControl display="flex" justifyContent="space-between">
                  <FormLabel paddingLeft="2">Titulo</FormLabel>
                </FormControl>
                <FormControl>
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
                  <FormLabel paddingLeft="2">Contenido</FormLabel>
                  <CKEditor
                    name="content"
                    newsData={values.content}
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const editedData = editor.getData()
                      setComment(editedData)
                      setFieldValue('content', editor.getData())
                      setNewsData({ ...entry, content: editedData })
                    }}
                  />
                  {comment === '' && !id && (
                  <small>El comentario es obligatio</small>
                  )}
                </FormControl>
                <Box display="flex" justifyContent="space-evenly">

                  <MenuCategories />
                  <Text fontWeight="bold" pt={2} fontSize={20}>
                    {categoryName}
                    {' '}
                  </Text>
                </Box>
                <GridImages
                  id={id}
                  name={values.name}
                  oldImage={values.oldImage}
                  loadImage={loadImage}
                />
                <Box>
                  <FormControl>
                    <FormLabel paddingLeft="2">{entry.inputText}</FormLabel>
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

                  {loadImage === '' && !id && (
                    <small>La imagen es obligatoria</small>
                  )}
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

export default NewsForm
