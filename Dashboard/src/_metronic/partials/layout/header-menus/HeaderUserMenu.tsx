/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../helpers'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

// Actions
import {removeUser} from '../../../../app/store/actions'

// Properties
import properties from '../../../../app/properties.json'

// Types
import {IState} from '../../../../app/types/reducer.types'

const HeaderUserMenu: FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, loggedOut} = useSelector((state: IState) => state.appReducer)

  const goToLogo = () => {
    navigate('/auth')
  }

  const logout = () => {
    Cookies.remove(properties.AUTH_COOKIE_NAME)
    dispatch(removeUser())
  }

  useEffect(() => {
    if (loggedOut) {
      goToLogo()
    }
  }, [loggedOut])

  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img alt='Logo' src={`${properties.API_URL}${user?.profilePicture}`} />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {user?.name}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>
                {user?.role?.name}
              </span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {user?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
          My Profile
        </Link>
      </div>

      <div className='menu-item px-5'>
        <a onClick={() => logout()} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
