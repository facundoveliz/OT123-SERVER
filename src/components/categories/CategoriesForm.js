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
} from '@chakra-ui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { createCategory, getCategoryById, updateCategory } from '../../services/categoriesService'
import Alert from '../alert/Alert'

const CategoriesForm = () => {
  const { id } = useParams()
  const [categoriesData, setCategoriesData] = useState({
    id: null,
    name: '',
    description: '',
  })
  const [ready, setReady] = useState(false)
  const [alerts, setAlerts] = useState({
    show: false,
    title: '',
    message: '',
    icon: '',
    onConfirm: () => {},
  })
  const loadCategoryData = async () => {
    if (id) {
      try {
        const loadedCategoryData = await getCategoryById(id)
        setCategoriesData({
          id: loadedCategoryData.data.result.id,
          name: loadedCategoryData.data.result.name,
          description: loadedCategoryData.data.result.description,
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
    loadCategoryData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ckChangeHandler = (event, editor) => {
    const editedData = editor.getData()
    setCategoriesData((data) => ({ ...data, description: editedData }))
  }
  const updateChangeHandler = async (values) => {
    const updatedCategory = await updateCategory(id, {
      name: values.name,
      description: categoriesData.description,
    })
    if (updatedCategory) {
      const successAlert = {
        show: true,
        title: 'Categoria',
        message: 'La categoria se ha actualizado!',
        icon: 'success',
        onConfirm: () => {},
      }
      setAlerts(successAlert)
    }
  }

  const addSubmitHandler = async (values) => {
    try {
      const newCategory = await createCategory({
        name: values.name,
        description: categoriesData.description,
      })
      if (newCategory) {
        const successAlert = {
          show: true,
          title: 'Categoria',
          message: 'Categoria agregada!',
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
          initialValues={categoriesData}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Nombre requerido!')
              .min(3, 'Nombre muy corto!'),
          })}
          onSubmit={(values) =>
            (id ? updateChangeHandler(values) : addSubmitHandler(values))}
        >
          {({ values, handleSubmit, handleChange }) => (
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
                border="2px solid black"
                backgroundColor="#ffffcc"
                onSubmit={handleSubmit}
              >
                <Heading mb="16px">Categoria</Heading>
                <FormControl>
                  <FormLabel paddingLeft="0.5" fontSize="lg">Titulo</FormLabel>
                  <Input
                    backgroundColor="white"
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <Spacer />
                <FormControl pb="16px">
                  <FormLabel paddingLeft="0.5" fontSize="lg">Contenido</FormLabel>
                  <CKEditor
                    name="description"
                    data={values.description}
                    editor={ClassicEditor}
                    onChange={ckChangeHandler}
                  />
                </FormControl>
                <Button
                  border="2px solid black"
                  backgroundColor="#d6f5d6"
                  _hover={{
                    backgroundColor: '#6fdc6f',
                  }}
                  type="submit"
                  w="100%"
                >
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

export default CategoriesForm
