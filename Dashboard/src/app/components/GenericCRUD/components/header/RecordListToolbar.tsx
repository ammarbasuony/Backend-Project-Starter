import { useState } from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {RecordsListFilter} from './RecordsListFilter'
import {useDispatch, useSelector} from 'react-redux'

// API
import genericCrudAPI from '../../../../api/generic-crud.api'

// Actions
import {openOperationModal} from '../../../../store/actions'

// Types
import { IState } from '../../../../types/reducer.types'

// Utils
import { singularize } from '../../../../utils/functions.util'

const RecordListToolbar = () => {
  const dispatch = useDispatch()
  const [isExporting, setIsExporting] = useState(false)
  const {tableName} = useSelector((state: IState) => state.crudReducer)

  const handleExport = async () => {}

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <RecordsListFilter />

      {/* begin::Export */}
      <button type='button' className='btn btn-light-primary me-3'>
        <KTIcon iconName='exit-up' className='fs-2' />
        {/* <span className="spinner-border spinner-border-sm align-middle me-1" /> */}
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
        Add {singularize(tableName)}
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {RecordListToolbar}
