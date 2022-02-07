import React from 'react';
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
import PropTypes from 'prop-types'

const ContacstList = ({ contactsData }) => (
  <Center>
    <Box
      bg="brand.lightBlue"
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

ContacstList.propTypes = {
  contactsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
}

export default ContacstList;
