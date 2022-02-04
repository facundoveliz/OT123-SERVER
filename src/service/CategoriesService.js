import instance from 'http'

export default function getAll() {
  return instance.get('categories/')
}
