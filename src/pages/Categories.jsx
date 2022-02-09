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

import { getAllCategories } from '../services/categoriesService'
import Loading from '../components/Loading'

const Categories = () => {
  const [data, setData] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      getAllCategories()
        .then((res) => {
          if (res.data) {
            setData(res.data)
            setLoading(false)
          }
        });
    } catch (e) {
      // ..
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
