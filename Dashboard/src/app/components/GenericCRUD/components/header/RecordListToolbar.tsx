import {KTIcon} from '../../../../../_metronic/helpers'
import {RecordsListFilter} from './RecordsListFilter'
import {useDispatch} from 'react-redux'

// Actions
import {openOperationModal} from '../../../../store/actions'

const RecordListToolbar = () => {
  const dispatch = useDispatch()

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <RecordsListFilter />

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        Export
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <button
        type='button'
        className='btn btn-primary'
        onClick={() => dispatch(openOperationModal())}
      >
        <KTIcon iconName='plus' className='fs-2' />
        Add User
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {RecordListToolbar}
