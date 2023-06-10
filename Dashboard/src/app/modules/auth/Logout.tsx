import {useEffect} from 'react'
import {Navigate, Routes} from 'react-router-dom'

export function Logout() {
  useEffect(() => {
    document.location.reload()
  }, [])

  return (
    <Routes>
      <Navigate to='/auth/login' />
    </Routes>
  )
}
