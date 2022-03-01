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
    <Box backgroundColor="#f2f2f2" justifyContent="center" textAlign="center">
      <Title title="DONACIÓN" fontSize={25} />
      <Box
        w={{ base: '90%', md: '40%' }}
        backgroundColor="purple.100"
        p={6}
        margin="0 auto"
        marginBottom="6"
        width="90%"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px solid white"
        border="2px solid black"
      >
        <Text>
          En Fundación Somos Mas realizamos campañas de solidaridad personalizada,
          para llevar infancia, dignidad y autoestima a los niñas y niñas más
          olvidados de nuestra sociedad.
        </Text>
      </Box>
      <Box
        w={{ base: '90%', md: '40%' }}
        p={6}
        justifyContent="center"
        margin="auto"
        width="90%"
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px solid white"
        border="2px solid black"
        backgroundColor="#ffffcc"
      >
        <Text fontWeight="500" fontSize="25px">
          {' '}
          ES MUY FÁCIL
        </Text>
        <Text fontWeight="500">ELEGÍ TU FORMA DE COLABORAR</Text>
        <Text padding="3">
          Podés donar por única vez o mensualmente por medio de MERCADOPAGO.
        </Text>
        <Text padding="3">Te pedimos algunos datos para registrar tu donación.</Text>
        <Text padding="3">
          Podés hacer una transferencia bancaria o pagar con tarjeta de crédito.
        </Text>
      </Box>
      <Text fontWeight="500" paddingTop="25px" fontSize="25px">
        ¡Colaborá con nosotros!
      </Text>
      <Box
        display="flex"
        justifyContent="center"
      >
        <Stack
          w={{ base: '90%', md: '40%' }}
          margin="4"
          p="25px"
          borderRadius="lg"
          boxShadow="lg"
          borderWidth="1px solid white"
          border="2px solid black"
          backgroundColor="#ffffcc"
        >
          <InputGroup justifyContent="space-evenly">
            {' '}
            <FormLabel className="font-size" fontWeight="bold" fontSize="15px">Ingresa el monto a donar</FormLabel>
            <Input
              backgroundColor="white"
              w={200}
              type="number"
              placeholder="Monto a donar"
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
      </Box>
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
