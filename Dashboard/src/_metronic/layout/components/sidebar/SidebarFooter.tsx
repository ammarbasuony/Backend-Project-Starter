/* eslint-disable react/jsx-no-target-blank */
import {KTIcon} from '../../../helpers'

const SidebarFooter = () => {
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
      <a
        href={process.env.REACT_APP_CONTACT_US_URL}
        target='_blank'
        className='btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100'
        data-bs-toggle='tooltip'
        data-bs-trigger='hover'
        data-bs-dismiss-='click'
        title='Contact Us'
      >
        <KTIcon iconName='phone' className='btn-icon fs-2 m-0' />
        <span className='btn-label'>Contact Us</span>
      </a>
    </div>
  )
}

export {SidebarFooter}
