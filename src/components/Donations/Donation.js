/* eslint-disable no-console */
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Button,
  Input,
  FormLabel,
  InputGroup,
  Stack,
  Box,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import Title from '../pageUtils/Title/Title'
import FormDonation from './FormDonation'

const Donations = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [amount, setAmount] = useState(0)
  const [error, setError] = useState('')
  const onChange = (e) => {
    setAmount(e.target.value);
    if (amount > 0) setError('')
  }
  const onSubmit = () => {
    if (amount < 1) { setError('Debe ingresar un valor mayor 0') } else onOpen();
  }
  return (
    <Box justifyContent="center" textAlign="center">

      <Title title="DONACIÓN" fontSize={25} />
      {/* eslint-disable-next-line */}
      <Text backgroundColor={'purple.100'} p={10} margin='auto' width={"80%"}>
        En Fundación Somos Mas realizamos campañas de solidaridad personalizada,
        para llevar infancia, dignidad y autoestima a los niñas y niñas más
        olvidados de nuestra sociedad.
      </Text>
      <Text fontWeight="500" paddingTop="25px" fontSize="25px">
        {' '}
        ES MUY FÁCIL
      </Text>
      <Text fontWeight="500">ELEGÍ TU FORMA DE COLABORAR</Text>
      <Text>
        Podés donar por única vez o mensualmente por medio de MERCADOPAGO.
      </Text>
      <Text>Te pedimos algunos datos para registrar tu donación.</Text>
      <Text>
        Podés hacer una transferencia bancaria o pagar con tarjeta de crédito.
      </Text>
      <Text fontWeight="500" paddingTop="25px" fontSize="25px">
        ¡Colaborá con nosotros!
      </Text>
      <Stack
        mx="auto"
        my={20}
        p={10}
        width={500}
        border="2px solid black"
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="#ffffcc"
      >
        <InputGroup justifyContent="center">
          {' '}
          <FormLabel fontWeight="bold" fontSize={20}>Ingresa el monto a donar</FormLabel>
          <Input
            backgroundColor="white"
            w={200}
            type="number"
            placeholder="monto a donar"
            borderColor="gray.500"
            onChange={(e) => onChange(e)}
          />
        </InputGroup>
        <Text color="red">{error}</Text>
        <Button
          border="2px solid black"
          backgroundColor="#d6f5d6"
          _hover={{
            backgroundColor: '#6fdc6f',
          }}
          onClick={onSubmit}
        >
          ¡Donar!
        </Button>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Metodo de pago</ModalHeader>
          <ModalCloseButton />
          <FormDonation amount={amount} onClose={onClose} />
        </ModalContent>
      </Modal>

    </Box>
  )
}

export default Donations
