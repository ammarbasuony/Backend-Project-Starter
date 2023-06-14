import {useCallback, useEffect} from 'react'
import RecordsList from '../../components/GenericCRUD/RecordsList'
import {useDispatch} from 'react-redux'

// Actions
import {setTableData, setTableColumns, setTableName, setIsTableHasFiles} from '../../store/actions'

// Data
import {columns} from './data.users'

// API
import genericCrudApi from '../../api/generic-crud.api'

const Users = () => {
  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {
    const response = await genericCrudApi('users').getAll()
    const rolesResponse = await genericCrudApi('roles').getAll()

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
    dispatch(setTableColumns(newColumns))
    dispatch(setTableName('users'))
    dispatch(setIsTableHasFiles(true))
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <RecordsList />
    </div>
  )
}

export default Users
