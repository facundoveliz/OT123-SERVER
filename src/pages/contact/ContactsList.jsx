/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Center,
} from '@chakra-ui/react'
import loadListData from '../backoffice/allListData';

const ContactsList = () => {
  const [contactsData, setContactsData] = useState([])
  useEffect(() => {
    loadListData('contactos').then(({ contacts }) => setContactsData(contacts))
  }, [])
  console.log(contactsData)

  return (
    <Box display="flex" height="100%" width="100%" backgroundColor="#f2f2f2" justifyContent="center">
      <Box
        border="2px solid black"
        backgroundColor="#ffffcc"
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: '98%', md: '90%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
        overflow="auto"
      >
        <Center fontSize="6xl">
          Lista de Contactos
        </Center>
        <Box paddingBottom={50}>
          <Table color="black">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th isNumeric>Phone</Th>
                <Th>Email</Th>
                <Th>Message</Th>
              </Tr>
            </Thead>
            {
            contactsData.map((item) => (
              <Tbody key={item.id}>
                <Tr>
                  <Td>{item.name}</Td>
                  <Td isNumeric>
                    {item.phone}
                  </Td>
                  <Td>{item.email}</Td>
                  <Td>{item.message}</Td>
                </Tr>
              </Tbody>
            ))
          }
          </Table>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactsList;
