import clsx from 'clsx'
import {FC, PropsWithChildren, useState} from 'react'
import {HeaderProps} from 'react-table'

type Props = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<any>>
}
const RecordCustomHeader: FC<Props> = ({className, title, tableProps}) => {
  const id = tableProps.column.id

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
      return
    }

    if (isSelectedForSorting && order !== undefined) {
      if (order === 'asc') {
        // enable sort desc
        setOrder('desc')
        setIsSelectedForSorting(id)
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
    >
      {title}
    </th>
  )
}

export {RecordCustomHeader}
