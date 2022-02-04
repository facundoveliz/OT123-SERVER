import React from 'react'
import { PropTypes } from 'prop-types'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Field, useField } from 'formik'
import { Textarea } from '@chakra-ui/react'

const TextField = ({ label, ...props }) => {
  const { type } = props
  const [field, meta] = useField(props)
  console.log(label)
  return (
    <FormControl isInvalid={meta.error && meta.touched}>
      <FormLabel>{label}</FormLabel>
      {type === 'textarea' ? (
        <Field as={Textarea} {...field} {...props} style={{ color: 'black' }} />
      ) : (
        <Field as={Input} {...field} {...props} style={{ color: 'black' }} />
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default TextField
