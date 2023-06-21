import {RecordUpdateModalHeader} from './RecordUpdateModalHeader'
import {useSelector} from 'react-redux'

// Types
import {IState} from '../../types/reducer.types'
import {RecordUpdateModalForm} from './RecordUpdateModalForm'

const RecordUpdateModal = () => {
  const {isUpdateModalOpen} = useSelector((state: IState) => state.modalReducer)

  return (
    <>
      <div
        className={`modal ${isUpdateModalOpen ? 'fade show d-block' : ''}`}
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <RecordUpdateModalHeader />
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <RecordUpdateModalForm />
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      {isUpdateModalOpen && <div className='modal-backdrop fade show' />}
      {/* end::Modal Backdrop */}
    </>
  )
}

export {RecordUpdateModal}
