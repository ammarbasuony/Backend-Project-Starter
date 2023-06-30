import {KTIcon} from '../../../_metronic/helpers'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'

// Actions
import {closeOperationModal} from '../../store/actions'

// Types
import {IState} from '../../models/reducer.types'

// Utils
import {singularize} from '../../utils/functions.util'

const RecordCreateModalHeader = () => {
  const dispatch = useDispatch()
  const {tableName} = useSelector((state: IState) => state.crudReducer)

  return (
    <div className='modal-header'>
      {/* begin::Modal title */}
      <h2 className='fw-bolder' style={{marginBottom: 0}}>
        Add {singularize(tableName)}
      </h2>
      {/* end::Modal title */}

      {/* begin::Close */}
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => dispatch(closeOperationModal())}
        style={{cursor: 'pointer'}}
      >
        <KTIcon iconName='cross' className='fs-1' />
      </div>
      {/* end::Close */}
    </div>
  )
}

export {RecordCreateModalHeader}
