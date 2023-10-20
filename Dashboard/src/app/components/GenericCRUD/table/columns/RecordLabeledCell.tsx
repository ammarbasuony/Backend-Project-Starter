import {FC} from 'react'

type Props = {
  value: string
}

const RecordLabeledCell: FC<Props> = ({value}) => (
  <div className='badge badge-light fw-bolder'>{value}</div>
)

export {RecordLabeledCell}
