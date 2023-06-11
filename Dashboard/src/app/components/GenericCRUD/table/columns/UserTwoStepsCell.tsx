import {FC} from 'react'

type Props = {
  value: string
}

const UserTwoStepsCell: FC<Props> = ({value}) => (
  <div className='badge badge-light-success fw-bolder'>{value}</div>
)

export {UserTwoStepsCell}
