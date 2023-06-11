import {FC, useState, useEffect} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {AuthPage} from '../modules/auth'
import {App} from '../App'
import {useSelector} from 'react-redux'

// Hooks
import useGetUser from '../hooks/useGetUser.hook'

// Utils
import {UserToken} from '../utils/constants.util'

// Types
import {IState} from '../types/reducer.types'

const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  useGetUser()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!UserToken)
  const appData = useSelector((state: IState) => state.appReducer)

  useEffect(() => {
    if (UserToken) return
    console.log('appData.isAuthenticated', appData.isAuthenticated)
    console.log('UserToken', UserToken);
    

    setIsAuthenticated(appData.isAuthenticated)
  }, [appData])

  useEffect(() => {
    if (appData.loggedOut) setIsAuthenticated(false)
  }, [appData.loggedOut])

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          {isAuthenticated ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/home' />} />
            </>
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
