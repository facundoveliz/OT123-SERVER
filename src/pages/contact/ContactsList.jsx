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
    <Center>
      <Box
        bg="brand.yellow"
        color="white"
        borderRadius="lg"
        padding={50}
      >
        <Center fontSize="6xl">
          Lista de
          <br />
          Contactos
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
    </Center>
  )
}

export default ContactsList;
