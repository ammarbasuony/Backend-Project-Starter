import {FC} from 'react'

type Props = {
  value: string
}

const RecordBooleanCell: FC<Props> = ({value}) => (
  <div className={`badge badge-light-${value ? 'info' : 'warning'} fw-bolder`}>
    {value ? 'True' : 'False'}
  </div>
)

export {RecordBooleanCell}
