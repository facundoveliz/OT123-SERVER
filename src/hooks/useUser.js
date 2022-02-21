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

  const registerUser = async (user) => {
    let registerSuccess = false

    // eslint-disable-next-line no-useless-catch
    try {
      await signUp({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }).then(({ data }) => {
        registerSuccess = true
        const { result } = data
        dispatch(setUserData(result.user))
        window.localStorage.setItem('x-access-token', result.token)
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }

    return registerSuccess
  }

  const loginUser = async (user) => {
    let loginSuccess = false

    // eslint-disable-next-line no-useless-catch
    try {
      await signIn({ email: user.email, password: user.password }).then(({ data }) => {
        loginSuccess = true
        const { result } = data
        dispatch(setUserData(result.user))
        window.localStorage.setItem('x-access-token', result.token)
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }

    return loginSuccess
  }

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
