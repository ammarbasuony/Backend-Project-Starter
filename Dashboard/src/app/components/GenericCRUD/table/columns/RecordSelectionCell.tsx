import {FC, useMemo} from 'react'

const RecordSelectionCell: FC = () => {
  const isSelected = useMemo(() => false, [])
  return (
    <div className='form-check form-check-custom form-check-solid'>
      <input
        className='form-check-input'
        type='checkbox'
        data-kt-check={isSelected}
        data-kt-check-target='#kt_table_users .form-check-input'
        checked={isSelected}
        onChange={() => {}} // TODO: implement
      />
    </div>
  )
}

export {RecordSelectionCell}
