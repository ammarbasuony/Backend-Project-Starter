import {useMemo, useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useTable, ColumnInstance, Row} from 'react-table'
import {CustomHeaderColumn} from './columns/CustomHeaderColumn'
import {CustomRow} from './columns/CustomRow'
import {usersColumns} from './columns/_columns'
import {RecordsListLoading} from '../components/loading/RecordsListLoading'
import {RecordsListPagination} from '../components/pagination/RecordsListPagination'
import {KTCardBody} from '../../../../_metronic/helpers'

// Types
import {IState} from '../../../types/reducer.types'

const RecordsTable = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<any[]>([])
  const [modelColumns, setModelColumns] = useState<any[]>([])
  const {tableData, tableColumns} = useSelector((state: IState) => state.crudReducer)

  const columns = useMemo(() => usersColumns(modelColumns), [modelColumns])

  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns: columns,
    data: items,
  })

  useEffect(() => {
    setIsLoading(true)
    setItems(tableData)
    setModelColumns(tableColumns)
    setIsLoading(false)
  }, [tableData, tableColumns])

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
              {headers.map((column: ColumnInstance<any>) => (
                <CustomHeaderColumn key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row<any>, i) => {
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
      <RecordsListPagination />
      {isLoading && <RecordsListLoading />}
    </KTCardBody>
  )
}

export {RecordsTable}
