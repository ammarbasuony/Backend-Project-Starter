import {useState} from 'react'
import {KTIcon} from '../../../../../_metronic/helpers'
import {RecordsListFilter} from './RecordsListFilter'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// API
import genericCrudAPI from '../../../../api/generic-crud.api'

// Actions
import {openOperationModal} from '../../../../store/actions'

// Types
import {IState} from '../../../../types/reducer.types'

// Utils
import {singularize} from '../../../../utils/functions.util'

// Properties
import properties from '../../../../properties.json'

const RecordListToolbar = () => {
  const dispatch = useDispatch()
  const [isExporting, setIsExporting] = useState(false)
  const {tableName, operationsPermission} = useSelector((state: IState) => state.crudReducer)
  const {user} = useSelector((state: IState) => state.appReducer)

  const handleExport = async () => {
    setIsExporting(true)
    const response = await genericCrudAPI(tableName).export()
    setIsExporting(false)

    if (!response.success) return response.errors.forEach((error: string) => toast.error(error))

    window.open(`${properties.API_URL}${response.data.path}`)
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      <RecordsListFilter />

      {user?.role[operationsPermission as keyof typeof user.role] && (
        <>
          {/* begin::Export */}
          <button
            type='button'
            className='btn btn-light-primary me-3 ms-3'
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <span className='spinner-border spinner-border-sm align-middle me-1' />
            ) : (
              <KTIcon iconName='exit-up' className='fs-2' />
            )}
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
          {/* end::Export */}

          {/* begin::Add Record */}
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => dispatch(openOperationModal())}
          >
            <KTIcon iconName='plus' className='fs-2' />
            Add {singularize(tableName)}
          </button>
          {/* end::Add Record */}
        </>
      )}
    </div>
  )
}

export {RecordListToolbar}
