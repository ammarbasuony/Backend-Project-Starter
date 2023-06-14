import {FC, PropsWithChildren} from 'react'
import {HeaderProps} from 'react-table'
type Props = {
  tableProps: PropsWithChildren<HeaderProps<any>>
}

const RecordSelectionHeader: FC<Props> = ({tableProps}) => {
  return (
    <th {...tableProps.column.getHeaderProps()} className='w-10px pe-2'>
      <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
        <input
          className='form-check-input'
          type='checkbox'
          data-kt-check={false} // TODO: implement
          data-kt-check-target='#kt_table_users .form-check-input'
          checked={false} // TODO: implement
          onChange={() => {}} // TODO: implement
        />
      </div>
    </th>
  )
}

export {RecordSelectionHeader}
