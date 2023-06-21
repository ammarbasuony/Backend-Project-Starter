import {useEffect} from 'react'
import RecordsList from '../../components/GenericCRUD/RecordsList'
import {useDispatch, useSelector} from 'react-redux'

// Actions
import {
  setTableData,
  setTableColumns,
  setTableName,
  setIsTableHasFiles,
  setIsOperationDone,
  setTotalRecords,
} from '../../store/actions'

// Data
import {columns} from './data.users'

// API
import genericCrudAPI from '../../api/generic-crud.api'

// Types
import {IState} from '../../types/reducer.types'

const Users = () => {
  const dispatch = useDispatch()
  const {isOperationDone} = useSelector((state: IState) => state.crudReducer)

  const fetchData = async () => {
    const response = await genericCrudAPI('users').getAll()
    const rolesResponse = await genericCrudAPI('roles').getAll()

    const roles = rolesResponse.data.map((role: any) => ({
      value: role.id,
      label: role.name,
    }))

    const newColumns = columns.map((column) => {
      if (column.attr === 'roleId') {
        return {
          ...column,
          options: roles,
        }
      }

      return column
    })

    dispatch(setTableData(response.data))
    dispatch(setTotalRecords(response.totalRecords))
    dispatch(setTableColumns(newColumns))
    dispatch(setTableName('users'))
    dispatch(setIsTableHasFiles(true))
    dispatch(setIsOperationDone(false))
  }

  useEffect(() => {
    fetchData()
  }, [isOperationDone])

  return (
    <div>
      <RecordsList />
    </div>
  )
}

export default Users
