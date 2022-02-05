import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { Heading, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";


export default function ContactForm() {
    return (
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={ Yup.object({
          name: Yup.string().required("Nombre requerido!").min(3, "Nombre muy corto!"),
          email: Yup.string().email("E-mail inválido!").required("E-mail requerido!"),
          message: Yup.string().required("El mensaje es requerido!").min(6, "Mensaje muy corto"),
        })}
        onSubmit={(values, actions) => {
          const user = { ...values }
          console.log(user)
          alert(JSON.stringify(values, null, 2));
          actions.resetForm();
        }}
      >
        {formik => (
          <HStack display="flex"  backgroundColor={"brand.lightBlue"}>
            <VStack
              as="form"
              m="auto"
              p="2"
              w={{ base: 300, md: 500, sm:400  }}
              h="auto"
              justifyContent="center"
              borderWidth='1px solid white' 
              borderRadius='lg'
              boxShadow='lg'
              backgroundColor={"white"}
              onSubmit={formik.handleSubmit}
              display="block"
            >
              <Heading align="center" color="gray.500">Mensaje</Heading>
              <TextField name="name" placeholder="Nombre" label="Nombre"/>
              <TextField name="email" placeholder="E-mail" type="email" label="Email" />
              <TextField name="message" placeholder="Mensaje" type="textarea" label="Mensaje" />
              <Button type="submit"  w="100%" backgroundColor={"brand.yellow"} color="gray.500">
                Crear cuenta
              </Button>
            </VStack>
          </HStack>  
        )}
      </Formik>
    );
}