import React, { useEffect, useState } from 'react'
import { IoTrashBin, IoPencil, IoAddOutline } from 'react-icons/io5'
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
import { useNavigate } from 'react-router'
import loadListData from '../allListData'

const ListActivities = () => {
  const navigate = useNavigate()
  const [activitiesData, setActivitiesData] = useState([])
  useEffect(() => {
    loadListData('actividades').then(({ activities }) => setActivitiesData(activities))
  }, [])

  return (
    <Box display="flex" height="100%" width="100%" backgroundColor="#FAFA88" justifyContent="center">
      <Box
        borderWidth="1px solid white"
        borderRadius="lg"
        boxShadow="lg"
        backgroundColor="white"
        w={{ base: '98%', md: '90%' }}
        m={{ base: '10px', md: '50px' }}
        p="2"
        overflow="auto"
      >
        <Box display="flex" justifyContent="space-between" mx="6" my="5">
          <Heading>Actividades</Heading>
          <Button leftIcon={<IoAddOutline size="22" />} onClick={() => navigate('./nuevo')}>
            Crear nuevo
          </Button>
        </Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activitiesData.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td display="flex" justifyContent="center">
                  <ButtonGroup
                    flexWrap="wrap"
                    textAlign="center"
                    width="fit-content"
                  >
                    <Button
                      width="100px"
                      leftIcon={<IoPencil />}
                      marginBottom="1"
                      size="sm"
                      onClick={() => navigate(`./${item.id}`)}
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
