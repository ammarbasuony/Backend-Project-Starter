import {FC, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'

// Actions
import {setSelectRow, setUnselectRow} from '../../../../store/actions'

// Types
import {IState} from '../../../../models/reducer.types'

interface IRecordSelectionCellProps {
  id: number
}

const RecordSelectionCell: FC<IRecordSelectionCellProps> = ({id}) => {
  const dispatch = useDispatch()
  const {selectedRows} = useSelector((state: IState) => state.crudReducer)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRows.includes(id)) dispatch(setUnselectRow(id))
    else dispatch(setSelectRow(id))
  }

  const isSelected = useMemo(() => false, [])
  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        data-kt-check={isSelected}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={selectedRows.includes(id)}
        onChange={handleCheckboxChange}
      />
    </div>
  )
}

export {RecordSelectionCell}
