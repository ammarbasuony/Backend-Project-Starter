import {Column} from 'react-table'

// Components
import {UserLastLoginCell} from './UserLastLoginCell'
import {UserTwoStepsCell} from './UserTwoStepsCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'

// Models
import {User} from '../../core/_models'

const usersColumns = (modelColumns: any): ReadonlyArray<Column<User>> => {
  const dynamicCols = modelColumns.map((column: any) => {
    return {
      Header: (props: any) => {
        return <UserCustomHeader tableProps={props} title={column.name} />
      },
      accessor: column.accessor,
      ...(column.type
        ? {
            Cell: ({...props}) => {
              // handle accessors with nested properties (e.g. 'user.name')
              const cellValue = column.accessor.includes('.')
                ? props.data[props.row.index][column.accessor.split('.')[0]][
                    column.accessor.split('.')[1]
                  ]
                : props.data[props.row.index][column.accessor]

              return column.type === 'highlighted' ? (
                <UserTwoStepsCell value={cellValue} />
              ) : (
                <UserLastLoginCell last_login={cellValue} />
              )
            },
          }
        : {}),
    }
  })

  return [
    {
      Header: (props) => <UserSelectionHeader tableProps={props} />,
      id: 'selection',
      Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
    },
    ...dynamicCols,
    {
      Header: (props) => (
        <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
      ),
      id: 'actions',
      Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
    },
  ]
}

export {usersColumns}
