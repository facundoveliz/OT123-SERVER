import React from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import TextField from "./TextField";
import { Heading, HStack, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export default function SignIn() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={ Yup.object({
          email: Yup.string().email("Invalid e-mail!").required("E-mail required!"),
          password: Yup.string().required("Password required!").min(6, "Password is too short!"),
        })}
        onSubmit={(values, actions) => {
          const user = { ...values }
          console.log(user)
          alert(JSON.stringify(values, null, 2));
          actions.resetForm();
        }}
      >
        {formik => (
          <HStack display="flex" height="100vh" backgroundColor={"#FAFA88"}>
            <VStack
              as="form"
              m="auto"
              p="4"
              w={{ base: "90%", md: 500 }}
              h="auto"
              justifyContent="center"
              borderWidth='1px solid white' 
              borderRadius='lg'
              boxShadow='lg'
              backgroundColor={"white"}
              onSubmit={formik.handleSubmit}
              display="block"
            >
              <Heading textAlign="center">
                Sign In
              </Heading>
              <TextField name="email" placeholder="E-mail" type="email" />
              <TextField name="password" placeholder="Password" type="password" />
              <Button type="submit"  w="100%">
                Sign In
              </Button>
            </VStack>
          </HStack>  
        )}
      </Formik>
    );
}
