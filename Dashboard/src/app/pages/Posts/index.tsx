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
import {columns} from './data.posts'

// API
import genericCrudAPI from '../../api/generic-crud.api'

// Types
import {IState} from '../../models/reducer.types'

// Utils
import {excludeColumns} from '../../utils/constants.util'

// Hooks
import useSearchHandler from '../../hooks/useSearchHandler'

const Posts = () => {
  const dispatch = useDispatch()
  const { params, isParamsChanged } = useSearchHandler(columns, excludeColumns)
  const {isOperationDone} = useSelector((state: IState) => state.crudReducer)

  const fetchData = async () => {
    const response = await genericCrudAPI('posts').getAll(params)
    const categoriesResponse = await genericCrudAPI('categories').getAll()

    const categories = categoriesResponse.data.map((role: any) => ({
      value: role.id,
      label: role.name,
    }))

    const newColumns = columns.map((column) => {
      if (column.attr === 'categoryId') {
        return {
          ...column,
          options: categories,
        }
      }

      return column
    })

    dispatch(setTableData(response.data))
    dispatch(setTotalRecords(response.totalRecords))
    dispatch(setTableColumns(newColumns))
    dispatch(setTableName('posts'))
    dispatch(setIsTableHasFiles(true))
    dispatch(setIsOperationDone(false))
    dispatch(setOperationsPermissions(Roles.ALLOW_POSTS_VIEW))
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

export default Posts
