/* eslint-disable no-console */
import { Button } from '@chakra-ui/button'
import { FormLabel } from '@chakra-ui/form-control'
import {
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import PropTypes from 'prop-types'
import './Donation.css'
import { useDispatch } from 'react-redux'
import { setAlertData } from '../../app/slices/alert'

const FormDonation = ({ amount, onClose }) => {
  const dispatch = useDispatch()
  const [numberError, setNumberError] = useState('')
  const [nameError, setNameError] = useState('')
  const [expiryError, setExpiryError] = useState('')
  const [cvcError, setCvcError] = useState('')

  const [state, setState] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  })

  const handleInputChange = (e) => {
    if (state.number.length > 14) {
      setNumberError('')
    }
    if (state.name.length > 2) {
      setNameError('')
    }
    if (state.expiry.length > 2) {
      setExpiryError('')
    }
    if (state.cvc.length > 2) {
      setCvcError('')
    }
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleFocusChange = (e) => {
    setState({
      ...state,
      focus: e.target.name,
    })
  }
  function validation() {
    let value = false
    if (state.number.length < 15) {
      setNumberError('La cantidad de numeros es 16')
      value = false
    } else if (state.name.length < 3) {
      setNameError('Nombre muy corto')
      value = false
    } else if (state.expiry.length < 3) {
      setExpiryError('La cantidad de numeros es 4')
      value = false
    } else if (state.cvc.length < 3) {
      setCvcError('La cantidad de numeros es 4')
      value = false
    } else {
      value = true
    }
    return value
  }
  const processPayment = () => {
    state.amount = amount
    if (validation()) {
      onClose()
      const successAlert = {
        show: true,
        title: 'Gracias por su donación',
        message: 'La donacion se realizo con exito!',
        icon: 'success',
        onConfirm: () => {},
      }
      dispatch(setAlertData(successAlert))
      console.table(state)
    }
  }

  return (
    <div className="card">
      <Box mt={5}>
        <Cards
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focus}
        />
      </Box>
      <Stack>
        <Table mt={10} size="sm">
          <Thead>
            <Tr>
              <Th fontSize={20} fontWeight="bold">
                Monto:
                {' '}
              </Th>
              <Th textAlign="center" fontSize={30} fontWeight="bold">
                $
                {amount}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                {' '}
                <FormLabel htmlFor="number">Número de la tarjeta</FormLabel>
              </Td>
              <Td>
                {' '}
                <Input
                  type="number"
                  name="number"
                  id="number"
                  maxLength="16"
                  borderColor="gray.500"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
                <Text color="red">
                  {' '}
                  {numberError}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                {' '}
                <FormLabel htmlFor="name">Nombre</FormLabel>
              </Td>
              <Td>
                {' '}
                <Input
                  type="text"
                  name="name"
                  id="name"
                  maxLength="30"
                  borderColor="gray.500"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
                <Text color="red">
                  {' '}
                  {nameError}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                {' '}
                <FormLabel htmlFor="expiry">Fecha de expiración</FormLabel>
              </Td>
              <Td>
                {' '}
                <Input
                  type="number"
                  name="expiry"
                  id="expiry"
                  maxLength="4"
                  borderColor="gray.500"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
                <Text color="red">
                  {' '}
                  {expiryError}
                </Text>
              </Td>
            </Tr>
            <Tr>
              <Td>
                {' '}
                <FormLabel htmlFor="cvc">CVC</FormLabel>
              </Td>
              <Td>
                {' '}
                <Input
                  type="number"
                  borderColor="gray.500"
                  name="cvc"
                  id="cvc"
                  maxLength="4"
                  onChange={handleInputChange}
                  onFocus={handleFocusChange}
                />
                <Text color="red">
                  {' '}
                  {cvcError}
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
      <Box display="flex" justifyContent="right">
        <Button
          onClick={onClose}
          color="white"
          m={2}
          bgColor="red"
          w={20}
          type="button"
        >
          Salir
        </Button>
        <Button onClick={processPayment} w={20} m={2} type="button">
          ¡Donar!
        </Button>
      </Box>
    </div>
  )
}
FormDonation.propTypes = {
  amount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default FormDonation
