import {Column} from 'react-table'

// Components
import {RecordLabeledCell} from './RecordLabeledCell'
import {RecordHighlightedCell} from './RecordHighlightedCell'
import {RecordBooleanCell} from './RecordBooleanCell'
import {RecordActionsCell} from './RecordActionsCell'
import {RecordSelectionCell} from './RecordSelectionCell'
import {RecordCustomHeader} from './RecordCustomHeader'
import {RecordSelectionHeader} from './RecordSelectionHeader'
import {RecordInfoCell} from './RecordInfoCell'
import {RecordDefaultCell} from './RecordDefaultCell'

const usersColumns = (modelColumns: any): ReadonlyArray<Column<any>> => {
  // Skip password column
  const cols = modelColumns.filter((column: any) => column.accessor !== 'password')

  const dynamicCols = cols.map((column: any) => {
    return {
      Header: (props: any) => {
        return <RecordCustomHeader tableProps={props} attr={column.attr} title={column.name} />
      },
      accessor: column.accessor,

      // handle custom cells

      Cell: ({...props}) => {
        // handle accessors with nested properties (e.g. 'user.name')
        const cellValue = column.accessor.includes('.')
          ? props.data[props.row.index][column.accessor.split('.')[0]][
              column.accessor.split('.')[1]
            ]
          : props.data[props.row.index][column.accessor]

        if (column.mode)
          switch (column.mode) {
            case 'highlighted':
              return <RecordHighlightedCell value={cellValue} />
            case 'image':
              return <RecordInfoCell image={cellValue} />
            case 'boolean':
              return <RecordBooleanCell value={cellValue} />
            default:
              return <RecordLabeledCell value={cellValue} />
          }
        else return <RecordDefaultCell value={cellValue} />
      },
    }
  })

  return [
    {
      Header: (props: any) => <RecordSelectionHeader tableProps={props} />,
      id: 'selection',
      Cell: ({...props}) => <RecordSelectionCell id={props.data[props.row.index].id} />,
    },
    ...dynamicCols,
    {
      Header: (props: any) => (
        <RecordCustomHeader
          tableProps={props}
          attr='actions'
          title='Actions'
          className='text-end min-w-100px'
        />
      ),
      id: 'actions',
      Cell: ({...props}) => <RecordActionsCell id={props.data[props.row.index].id} />,
    },
  ]
}

export {usersColumns}
