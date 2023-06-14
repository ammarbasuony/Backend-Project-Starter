import {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

// API
import {getUserFromToken} from '../api/auth.api'

// Actions
import {setUser} from '../store/actions'

// Utils
import {UserToken} from '../utils/constants.util'

const useGetUser = () => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<any>(null)

  const fetchUser = async () => {
    if (!UserToken) return

    const user = await getUserFromToken()
    setUserData(userData)

    console.log('user', user)

    dispatch(setUser(user.data))
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return userData
}

export default useGetUser
