import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required').min(3, 'Too Short!'),
})

export default loginSchema
