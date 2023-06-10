import {useState} from 'react'
import {UserEditModalForm} from './UserEditModalForm'
import {useListView} from '../core/ListViewProvider'

const UserEditModalFormWrapper = () => {
  const user = {
    id: 1,
    name: 'Emma Smith',
    avatar: 'avatars/300-6.jpg',
    email: 'smith@kpmg.com',
    position: 'Art Director',
    role: 'Administrator',
    last_login: 'Yesterday',
    two_steps: false,
    joined_day: '10 Nov 2022, 9:23 pm',
    online: false,
  } // TODO: replace with real user
  const error = false // TODO: replace with real error
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (!itemIdForUpdate) {
    return <UserEditModalForm isUserLoading={isLoading} user={{id: undefined}} />
  }

  if (!isLoading && !error && user) {
    return <UserEditModalForm isUserLoading={isLoading} user={user} />
  }

  return null
}

export {UserEditModalFormWrapper}
