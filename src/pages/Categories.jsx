import React, { useState, useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react'

import getAll from '../service/CategoriesService'
import Loading from '../components/Loading'

const Categories = () => {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      getAll()
        .then((res) => {
          // console.log('Hay algo', res.data)
          if (res.data) {
            setData(res.data)
            setLoading(false)
          }
        });
    } catch (e) {
      console.log('error', e)
    }
  }, [])

  return (
    <Loading active={loading}>

      {
                data
      && (
      <Table variant="simple">
        <TableCaption>Listado de Categorias</TableCaption>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Descripcion</Th>
          </Tr>
        </Thead>
        <Tbody>

          {data.map((Item) => (
            <Tr key={Item.id}>
              <Td>{Item.name}</Td>
              <Td>{Item.description}</Td>
            </Tr>
          ))}

        </Tbody>
        <Tfoot />

      </Table>
      )
    }

    </Loading>

  )
}

export default Categories
