import {FC} from 'react'

type Props = {
  value: string
}

const RecordDefaultCell: FC<Props> = ({value}) => (
  <div>{value.replace(/(<([^>]+)>)/gi, ' ').substring(0, 500)}</div>
)

export {RecordDefaultCell}
