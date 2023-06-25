import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import AppMainMenu from '../../../../../app/data/menu.app'

// Types
import {IMenuItem} from '../../../../../app/types/menu.types'

const SidebarMenuMain = () => {
  const menu = AppMainMenu()

  const renderedMenu = menu.map((item: IMenuItem) => {
    if (item.subMenu) {
      const renderedSubMenu = item.subMenu.map((subItem: IMenuItem) => {
        return (
          <SidebarMenuItem
            to={subItem.to}
            icon={subItem.icon}
            title={subItem.title}
            key={subItem.title}
          />
        )
      })

      return (
        <SidebarMenuItemWithSub to='' icon={item.icon} title={item.title} key={item.title}>
          {renderedSubMenu}
        </SidebarMenuItemWithSub>
      )
    } else {
      return <SidebarMenuItem to={item.to} icon={item.icon} title={item.title} key={item.title} />
    }
  })

  return (
    <>
      <div className='menu-item'>
        <div className='menu-content pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Main</span>
        </div>
      </div>

      {renderedMenu}
    </>
  )
}

export {SidebarMenuMain}
