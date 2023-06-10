import {useMemo, useState} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {usersColumns} from './columns/_columns'
import {User} from '../core/_models'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {UsersListPagination} from '../components/pagination/UsersListPagination'
import {KTCardBody} from '../../../../_metronic/helpers'

const data = [
  {
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
  },
  {
    id: 2,
    name: 'Melody Macy',
    initials: {
      label: 'M',
      state: 'danger',
    },
    email: 'melody@altbox.com',
    position: 'Marketing Analytic',
    role: 'Analyst',
    last_login: '20 mins ago',
    two_steps: true,
    joined_day: '10 Nov 2022, 8:43 pm',
    online: false,
  },
  {
    id: 3,
    name: 'Max Smith',
    avatar: 'avatars/300-1.jpg',
    email: 'max@kt.com',
    position: 'Software Enginer',
    role: 'Developer',
    last_login: '3 days ago',
    two_steps: false,
    joined_day: '22 Sep 2022, 8:43 pm',
    online: false,
  },
  {
    id: 4,
    name: 'Sean Bean',
    avatar: 'avatars/300-5.jpg',
    email: 'sean@dellito.com',
    position: 'Web Developer',
    role: 'Support',
    last_login: '5 hours ago',
    two_steps: true,
    joined_day: '21 Feb 2022, 6:43 am',
    online: false,
  },
  {
    id: 5,
    name: 'Brian Cox',
    avatar: 'avatars/300-25.jpg',
    email: 'brian@exchange.com',
    position: 'UI/UX Designer',
    role: 'Developer',
    last_login: '2 days ago',
    two_steps: true,
    joined_day: '10 Mar 2022, 9:23 pm',
    online: false,
  },
  {
    id: 6,
    name: 'Mikaela Collins',
    initials: {
      label: 'M',
      state: 'warning',
    },
    email: 'mik@pex.com',
    position: 'Head Of Marketing',
    role: 'Administrator',
    last_login: '5 days ago',
    two_steps: false,
    joined_day: '20 Dec 2022, 10:10 pm',
    online: false,
  },
  {
    id: 7,
    name: 'Francis Mitcham',
    avatar: 'avatars/300-9.jpg',
    email: 'f.mit@kpmg.com',
    position: 'Software Arcitect',
    role: 'Trial',
    last_login: '3 weeks ago',
    two_steps: false,
    joined_day: '10 Nov 2022, 6:43 am',
    online: false,
  },
  {
    id: 8,
    name: 'Olivia Wild',
    initials: {
      label: 'O',
      state: 'danger',
    },
    email: 'olivia@corpmail.com',
    position: 'System Admin',
    role: 'Administrator',
    last_login: 'Yesterday',
    two_steps: false,
    joined_day: '19 Aug 2022, 11:05 am',
    online: false,
  },
  {
    id: 9,
    name: 'Neil Owen',
    initials: {
      label: 'N',
      state: 'primary',
    },
    email: 'owen.neil@gmail.com',
    position: 'Account Manager',
    role: 'Analyst',
    last_login: '20 mins ago',
    two_steps: true,
    joined_day: '25 Oct 2022, 10:30 am',
    online: false,
  },
  {
    id: 10,
    name: 'Dan Wilson',
    avatar: 'avatars/300-23.jpg',
    email: 'dam@consilting.com',
    position: 'Web Desinger',
    role: 'Developer',
    last_login: '3 days ago',
    two_steps: false,
    joined_day: '19 Aug 2022, 10:10 pm',
    online: false,
  },
]

const UsersTable = () => {
  const [isLoading, setIsLoading] = useState(false)
  const columns = useMemo(() => usersColumns, [])

  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>
      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance<User>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<User>, i) => {
                prepareRow(row)
                return <CustomRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UsersListPagination />
      {isLoading && <UsersListLoading />}
    </KTCardBody>
  )
}

export {UsersTable}
