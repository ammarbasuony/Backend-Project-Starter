import {useCallback, useEffect} from 'react'
import {UsersListWrapper} from '../../components/GenericCRUD/UsersList'
import {useDispatch} from 'react-redux'

// Actions
import {setTableData, setTableColumns, setTableName} from '../../store/actions'

// API
import genericCrudApi from '../../api/generic-crud.api'

const Users = () => {
  const columns = [
    {
      name: 'Name',
      accessor: 'name',
    },
    {
      name: 'Email',
      accessor: 'email',
    },
    {
      name: 'Role',
      accessor: 'role.name',
      type: 'highlighted',
    },
    {
      name: 'Created At',
      accessor: 'createdAt',
    },
    {
      name: 'Last Updated At',
      accessor: 'updatedAt',
      type: 'labeled',
    },
  ]

  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {
    const response = await genericCrudApi('users').getAll()

    dispatch(setTableData(response.data))
    dispatch(setTableColumns(columns))
    dispatch(setTableName('Users'))
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <UsersListWrapper />
    </div>
  )
}

export default Users
