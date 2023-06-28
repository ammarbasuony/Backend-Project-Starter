import {useSelector} from 'react-redux'
import {useIntl} from 'react-intl'

// Components
import {MenuItem} from './MenuItem'

// Data
import AppMainMenu from '../../../../../app/data/menu.app'

// Types
import {IMenuItem} from '../../../../../app/types/menu.types'
import {IState} from '../../../../../app/types/reducer.types'

export function MenuInner() {
  const intl = useIntl()
  const menu = AppMainMenu()
  const {user} = useSelector((state: IState) => state.appReducer)

  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.HOME'})} to='/home' />
      {menu.map(
        (item: IMenuItem) => user?.role[item.role as keyof typeof user.role] && <MenuItem title={item.title} to={item.to} />
      )}
    </>
  )
}
