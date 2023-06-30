import clsx from 'clsx'
import {FC, PropsWithChildren, useState} from 'react'
import {HeaderProps} from 'react-table'
import {useSelector, useDispatch} from 'react-redux'

// Types
import {IState} from '../../../../models/reducer.types'

// Actions
import {setTableData} from '../../../../store/actions'

type Props = {
  className?: string
  title?: string
  attr: string
  tableProps: PropsWithChildren<HeaderProps<any>>
}
const RecordCustomHeader: FC<Props> = ({className, title, attr, tableProps}) => {
  const dispatch = useDispatch()
  const {tableData} = useSelector((state: IState) => state.crudReducer)
  const id = attr

  const [isSelectedForSorting, setIsSelectedForSorting] = useState<string | undefined>(undefined)
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>(undefined)

  const sortColumn = () => {
    // avoid sorting for these columns
    if (id === 'actions' || id === 'selection') {
      return
    }

    if (!isSelectedForSorting) {
      // enable sort asc
      setOrder('asc')
      setIsSelectedForSorting(id)
      // sort data asc
      const sortedData = tableData.sort((a: any, b: any) => {
        if (a[id] < b[id]) return -1
        if (a[id] > b[id]) return 1
        return 0
      })
      dispatch(setTableData(sortedData))
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        setOrder('desc')
        setIsSelectedForSorting(id)
        // sort data desc
        const sortedData = tableData.sort((a: any, b: any) => {
          if (a[id] > b[id]) return -1
          if (a[id] < b[id]) return 1
          return 0
        })
        dispatch(setTableData(sortedData))
        return
      }

      // disable sort
      setOrder(undefined)
      setIsSelectedForSorting(undefined)
    }
  }

  return (
    <th
      {...tableProps.column.getHeaderProps()}
      className={clsx(
        className,
        isSelectedForSorting && order !== undefined && `table-sort-${order}`
      )}
      style={{cursor: 'pointer'}}
      onClick={sortColumn}
      title={title}
    >
      <div className='cell-content'>{title}</div>
    </th>
  )
}

export {RecordCustomHeader}
