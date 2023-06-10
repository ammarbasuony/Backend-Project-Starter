/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Main</span>
        </div>
      </div>

      <SidebarMenuItem to='/home' icon='home' title={intl.formatMessage({id: 'MENU.HOME'})} />

      <SidebarMenuItemWithSub to='' title={intl.formatMessage({id: 'MENU.USERS'})} icon='user'>
        <SidebarMenuItem
          to='/users'
          icon='user'
          title={intl.formatMessage({id: 'MENU.ALL_USERS'})}
        />
        <SidebarMenuItem to='/roles' icon='lock' title={intl.formatMessage({id: 'MENU.ROLES'})} />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to='' title={intl.formatMessage({id: 'MENU.POSTS'})} icon='clipboard'>
        <SidebarMenuItem
          to='/posts'
          icon='clipboard'
          title={intl.formatMessage({id: 'MENU.ALL_POSTS'})}
        />
        <SidebarMenuItem
          to='/categories'
          icon='bookmark'
          title={intl.formatMessage({id: 'MENU.CATEGORIES'})}
        />
      </SidebarMenuItemWithSub>
    </>
  )
}

export {SidebarMenuMain}
