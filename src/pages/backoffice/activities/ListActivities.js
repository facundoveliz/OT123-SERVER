import React, { useEffect, useState } from 'react'
import { IoTrashBin, IoPencil } from 'react-icons/io5'
import {
  Box,
  Table,
  Heading,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import loadListData from '../allListData'

const ListActivities = () => {
  const [activitiesData, setActivitiesData] = useState([])
  useEffect(() => {
    loadListData('actividades').then(({ activities }) => setActivitiesData(activities))
  }, [])

  return (
    <Box display="flex" height="100vh" width="100%" backgroundColor="#FAFA88">
      <Box
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="white"
        w={{ base: '90%', md: 600 }}
        h="max-content"
        m="auto"
        p="2"
        justifyContent="center"
        overflow="hidden"
      >
        <Heading align="center">Activities</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activitiesData.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td maxWidth="120px">
                  <ButtonGroup
                    display="flex"
                    flexWrap="wrap"
                    textAlign="center"
                    spacing="0"
                    width="fit-content"
                  >
                    <Button
                      width="100px"
                      leftIcon={<IoPencil />}
                      marginRight="6"
                      marginBottom="1"
                      size="sm"
                    >
                      Editar
                    </Button>
                    <Button width="100px" leftIcon={<IoTrashBin />} size="sm">
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default ListActivities
