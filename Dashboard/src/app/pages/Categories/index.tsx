import {useEffect} from 'react'
import RecordsList from '../../components/GenericCRUD/RecordsList'
import {useDispatch, useSelector} from 'react-redux'

// Utils
import {Roles} from '../../utils/constants.util'

// Actions
import {
  setTableData,
  setTableColumns,
  setTableName,
  setIsTableHasFiles,
  setIsOperationDone,
  setOperationsPermissions,
  setTotalRecords,
} from '../../store/actions'

// Data
import {columns} from './data.categories'

// API
import genericCrudAPI from '../../api/generic-crud.api'

// Types
import {IState} from '../../models/reducer.types'

// Utils
import {excludeColumns} from '../../utils/constants.util'

// Hooks
import useSearchHandler from '../../hooks/useSearchHandler'

const Categories = () => {
  const dispatch = useDispatch()
  const { params, isParamsChanged } = useSearchHandler(columns, excludeColumns)
  const {isOperationDone} = useSelector((state: IState) => state.crudReducer)

  const fetchData = async () => {
    const response = await genericCrudAPI('categories').getAll(params)

    dispatch(setTableData(response.data))
    dispatch(setTotalRecords(response.totalRecords))
    dispatch(setTableColumns(columns))
    dispatch(setTableName('categories'))
    dispatch(setIsTableHasFiles(false))
    dispatch(setIsOperationDone(false))
    dispatch(setOperationsPermissions(Roles.ALLOW_CATEGORIES_VIEW))
  }

  useEffect(() => {
    if (!isParamsChanged) return

    fetchData()
  }, [isOperationDone, isParamsChanged])

  return (
    <div>
      <RecordsList />
    </div>
  )
}

export default Categories
