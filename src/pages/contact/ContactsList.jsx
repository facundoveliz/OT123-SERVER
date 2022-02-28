/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  Box, Heading,
} from '@chakra-ui/react'
import loadListData from '../backoffice/allListData';
import ItemCollapse from './ItemCollapse'

const ContactsList = () => {
  const [contactsData, setContactsData] = useState([])
  useEffect(() => {
    loadListData('contactos').then(({ contacts }) => setContactsData(contacts))
  }, [])

  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      backgroundColor="#f2f2f2"
      justifyContent="center"
    >
      <Box
        border="2px solid black"
        backgroundColor="#ffffcc"
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: '90%', md: '70%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
      >
        <Box display="flex" justifyContent="space-between" mx="5" my="5">
          <Heading>Lista de Contactos</Heading>
        </Box>

        {contactsData.map((item) => (
          <ItemCollapse
            key={item.id}
            item={item}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ContactsList;
