import {useIntl} from 'react-intl'

// Utils
import {Roles} from '../utils/constants.util'

const AppMainMenu = () => {
  const intl = useIntl()

  return [
    {
      title: intl.formatMessage({id: 'MENU.HOME'}),
      icon: 'home',
      to: '/home',
    },
    {
      title: intl.formatMessage({id: 'MENU.USERS'}),
      icon: 'user',
      to: '/users',
      role: Roles.ALLOW_USERS_VIEW,
      subMenu: [
        {
          title: intl.formatMessage({id: 'MENU.ALL_USERS'}),
          icon: 'user',
          to: '/users',
          role: Roles.ALLOW_USERS_VIEW,
        },
        {
          title: intl.formatMessage({id: 'MENU.ROLES'}),
          icon: 'lock',
          to: '/roles',
          role: Roles.ALLOW_ROLES_VIEW,
        },
      ],
    },
    {
      title: intl.formatMessage({id: 'MENU.POSTS'}),
      icon: 'clipboard',
      to: '/posts',
      role: Roles.ALLOW_POSTS_VIEW,
      subMenu: [
        {
          title: intl.formatMessage({id: 'MENU.ALL_POSTS'}),
          icon: 'clipboard',
          to: '/posts',
          role: Roles.ALLOW_POSTS_VIEW,
        },
        {
          title: intl.formatMessage({id: 'MENU.CATEGORIES'}),
          icon: 'bookmark',
          to: '/categories',
          role: Roles.ALLOW_CATEGORIES_VIEW,
        },
      ],
    },
  ]
}

export default AppMainMenu
