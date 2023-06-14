import {FC} from 'react'

type Props = {
  value: string
}

const RecordTwoStepsCell: FC<Props> = ({value}) => (
  <div className='badge badge-light-success fw-bolder'>{value}</div>
)

export {RecordTwoStepsCell}
