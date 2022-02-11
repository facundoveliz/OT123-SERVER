import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserData,
  setUserData,
  deleteUserData,
} from '../app/slices/auth'
import { getUserById, signIn, signUp } from '../services/usersService'

export default function useUser() {
  const userData = useSelector(getUserData)
  const jwt = window.localStorage.getItem('x-access-token')
  const dispatch = useDispatch()

  const isUserData = () => {
    if (!userData && jwt) {
      getUserById().then(({ data }) => {
        const { result } = data
        dispatch(setUserData(result))
      })
    }
  }

  useEffect(() => {
    isUserData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const registerUser = (user) =>
    signUp(user).then(({ data }) => {
      const { result } = data
      dispatch(setUserData(result.user))
      window.localStorage.setItem('x-access-token', result.token)
    })

  const loginUser = (user) =>
    signIn(user).then(({ data }) => {
      const { result } = data
      dispatch(setUserData(result.user))
      window.localStorage.setItem('x-access-token', result.token)
    })
  const logoutUser = () => {
    window.localStorage.removeItem('x-access-token')
    dispatch(deleteUserData())
  }

  return {
    registerUser,
    loginUser,
    isLoggedIn: Boolean(jwt),
    logoutUser,
    userData,
  }
}
