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
// eslint-disable-next-line import/no-unresolved
import { add, getOne, update } from '../../services/newsService'
import Alert from '../alert/Alert'

const NewsForm = () => {
  const { id } = useParams()
  const [newsData, setNewsData] = useState({
    id: null,
    name: '',
    image:
      'https://nypost.com/wp-content/uploads/sites/2/2021/12/nature_14.jpg?quality=80&strip=all&w=744',
    content: '',
    categoryId: '',
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
        setNewsData({
          id: loadedNewsData.data.result.id,
          name: loadedNewsData.data.result.name,
          image:
            'https://nypost.com/wp-content/uploads/sites/2/2021/12/nature_14.jpg?quality=80&strip=all&w=744',
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

  const ckChangeHandler = (event, editor) => {
    const editedData = editor.getData()
    setNewsData((data) => ({ ...data, content: editedData }))
  }
  const updateChangeHandler = async (values) => {
    const updatedEntry = await update(id, {
      name: values.name,
      content: newsData.content,
      image: newsData.image,
      category: newsData.categoryId,
    })
    // eslint-disable-next-line no-console
    console.log(updatedEntry)
    if (updatedEntry) {
      const successAlert = {
        show: true,
        title: 'Novedad',
        message: 'El novedad se ha actualizado!',
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
    }
  }

  const AddSubmitHandler = async (values) => {
    try {
      const newNews = await add({
        name: values.name,
        content: newsData.content,
        image: values.image,
        category: values.categoryId,
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

  return (
    <>
      <Alert {...alerts} />
      {((id && ready) || !id) && (
        <Formik
          initialValues={newsData}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Título requerido!')
              .min(3, 'Título muy corto!'),
          })}
          onSubmit={(values) =>
            (id ? updateChangeHandler(values) : AddSubmitHandler(values))}
        >
          {({ values, handleSubmit, handleChange }) => (
            <HStack
              display="flex"
              justifyContent="center"
              backgroundColor="#FAFA88"
            >
              <VStack
                as="form"
                h="auto"
                w={{ base: '90%', md: '40%' }}
                m="40px"
                p="25px"
                borderRadius="lg"
                boxShadow="lg"
                backgroundColor="white"
                onSubmit={handleSubmit}
              >
                <Heading mb="16px">Novedad</Heading>
                <FormControl>
                  <FormLabel paddingLeft="0.5" fontSize="lg">Titulo</FormLabel>
                  {id && (
                    <FormLabel width="200px">
                      Categoria:
                      {newsData.categoryId}
                    </FormLabel>
                  )}
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
                  <FormLabel paddingLeft="0.5" fontSize="lg">Contenido</FormLabel>
                  <CKEditor
                    name="content"
                    data={values.content}
                    editor={ClassicEditor}
                    onChange={ckChangeHandler}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel paddingLeft="0.5" fontSize="lg">Imagen</FormLabel>
                  <Box>
                    <Input
                      width="230px"
                      border-radius="5px"
                      padding="4px 5px"
                      cursor="pointer"
                      type="file"
                    />
                  </Box>
                  <Box>
                    <Image objectFit="cover" my="16px" src={newsData.image} />
                  </Box>
                </FormControl>
                <Button type="submit" colorScheme="blue" w="100%">
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

export default NewsForm
