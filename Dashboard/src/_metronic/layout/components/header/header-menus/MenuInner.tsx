import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.HOME'})} to='/home' />
      <MenuItem title={intl.formatMessage({id: 'MENU.POSTS'})} to='/posts' />
      <MenuItem title={intl.formatMessage({id: 'MENU.USERS'})} to='/users' />
    </>
  )
}
