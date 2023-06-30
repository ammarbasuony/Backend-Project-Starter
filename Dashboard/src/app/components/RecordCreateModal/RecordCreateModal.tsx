import {RecordCreateModalHeader} from './RecordCreateModalHeader'
import {useSelector} from 'react-redux'

// Types
import {IState} from '../../models/reducer.types'
import {RecordCreateModalForm} from './RecordCreateModalForm'

const RecordCreateModal = () => {
  const {isModalOpen} = useSelector((state: IState) => state.modalReducer)

  return (
    <>
      <div
        className={`modal ${isModalOpen ? 'fade show d-block' : ''}`}
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <RecordCreateModalHeader />
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <RecordCreateModalForm />
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      {isModalOpen && <div className='modal-backdrop fade show' />}
      {/* end::Modal Backdrop */}
    </>
  )
}

export {RecordCreateModal}
