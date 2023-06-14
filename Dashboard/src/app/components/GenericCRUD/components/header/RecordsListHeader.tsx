import {useState} from 'react'
import {RecordListToolbar} from './RecordListToolbar'
import {RecordsListGrouping} from './RecordsListGrouping'
import {RecordsListSearchComponent} from './RecordsListSearchComponent'

const RecordsListHeader = () => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <div className='card-header border-0 pt-6'>
      <RecordsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <RecordsListGrouping /> : <RecordListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {RecordsListHeader}
