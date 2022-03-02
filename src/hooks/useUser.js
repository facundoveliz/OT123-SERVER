import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserData,
  setUserData,
  deleteUserData,
} from '../app/slices/auth'
import {
  getUserById,
  signIn,
  signUp,
  edit,
  deleteUser,
} from '../services/usersService'

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

  const editUser = async (id, user) => {
    let editSuccess = false

    // eslint-disable-next-line no-useless-catch
    try {
      await edit(id, {
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        image: user.image,
      }).then(({ data }) => {
        editSuccess = true
        const currentUserId = userData.payload.persistedReducer.userData.dataValues.id.toString()
        if (id === currentUserId) {
          const { result } = data
          dispatch(setUserData(result.updatedUser))
          window.localStorage.setItem('x-access-token', result.token)
        }
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }

    return editSuccess
  }

  const logoutUser = () => {
    window.localStorage.removeItem('x-access-token')
    dispatch(deleteUserData())
  }

  const delUser = async (id) => {
    deleteUser(id)
    window.localStorage.removeItem('x-access-token')
    dispatch(deleteUserData())
  }

  const isAdmin = () => {
    const { roleId } = userData.payload.persistedReducer.userData.dataValues
    if (roleId === 1) return true
    return false
  }
  return {
    registerUser,
    loginUser,
    isLoggedIn: Boolean(jwt),
    editUser,
    logoutUser,
    delUser,
    userData,
    isAdmin,
  }
}
