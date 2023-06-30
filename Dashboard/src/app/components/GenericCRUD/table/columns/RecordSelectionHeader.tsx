import {FC, PropsWithChildren} from 'react'
import {HeaderProps} from 'react-table'
import {useSelector, useDispatch} from 'react-redux'

// Actions
import {setSelectAllRows, setUnselectAllRows} from '../../../../store/actions'

// Types
import {IState} from '../../../../models/reducer.types'

type Props = {
  tableProps: PropsWithChildren<HeaderProps<any>>
}

const RecordSelectionHeader: FC<Props> = ({tableProps}) => {
  const dispatch = useDispatch()
  const {selectedRows, tableData} = useSelector((state: IState) => state.crudReducer)

  return (
    <th {...tableProps.column.getHeaderProps()} className='w-10px pe-2'>
      <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
        <input
          className='form-check-input'
          type='checkbox'
          data-kt-check-target='#kt_table_users .form-check-input'
          checked={!!tableData.length && selectedRows.length === tableData.length}
          onChange={() => {
            if (selectedRows.length === tableData.length) dispatch(setUnselectAllRows())
            else dispatch(setSelectAllRows())
          }}
        />
      </div>
    </th>
  )
}

export {RecordSelectionHeader}
