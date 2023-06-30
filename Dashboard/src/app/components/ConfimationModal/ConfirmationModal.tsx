import {FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// Actions
import {closeConfirmationModal, setIsConfirmed} from '../../store/actions'

// Types
import {IState} from '../../models/reducer.types'

interface Props {
  onConfirm: (isConfirmed: boolean) => void
}

const ConfirmationModal: FC<Props> = ({onConfirm}) => {
  const dispatch = useDispatch()
  const {isConfirmationModalOpen} = useSelector((state: IState) => state.modalReducer)

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setIsConfirmed(true))
    dispatch(closeConfirmationModal())
    onConfirm(true)
  }

  return (
    <>
      <div
        className={`modal ${isConfirmationModalOpen ? 'fade show d-block' : ''}`}
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>
            <div className='modal-body scroll-y my-7'>
              <form id='kt_modal_add_user_form' className='form' onSubmit={handleConfirm}>
                <div className='d-flex flex-column scroll-y ps-2 me-n7 pe-7'>
                  <div className='fs-1 fw-bold text-gray-800 text-center mb-11'>
                    Are you sure you want to delete this record/s?
                  </div>
                </div>

                <div className='text-center'>
                  <button
                    type='button'
                    onClick={() => dispatch(closeConfirmationModal())}
                    className='btn btn-light me-3'
                  >
                    Cancel
                  </button>

                  <button type='submit' className='btn btn-primary'>
                    <span className='indicator-label'>Sure</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* begin::Modal Backdrop */}
      {isConfirmationModalOpen && <div className='modal-backdrop fade show' />}
      {/* end::Modal Backdrop */}
    </>
  )
}

export {ConfirmationModal}
