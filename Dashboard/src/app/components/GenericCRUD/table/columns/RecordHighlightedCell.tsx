import {FC} from 'react'

type Props = {
  value: string
}

const RecordHighlightedCell: FC<Props> = ({value}) => (
  <div className='badge badge-light-success fw-bolder'>{value}</div>
)

export {RecordHighlightedCell}
