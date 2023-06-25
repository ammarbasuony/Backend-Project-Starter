import {useSelector} from 'react-redux'

// Components
import {MenuItem} from './MenuItem'

// Data
import AppMainMenu from '../../../../../app/data/menu.app'

// Types
import {IMenuItem} from '../../../../../app/types/menu.types'
import {IState} from '../../../../../app/types/reducer.types'

export function MenuInner() {
  const menu = AppMainMenu()
  const {user} = useSelector((state: IState) => state.appReducer)

  return (
    <>
      {menu.map(
        (item: IMenuItem) => user?.role[item.role] && <MenuItem title={item.title} to={item.to} />
      )}
    </>
  )
}
