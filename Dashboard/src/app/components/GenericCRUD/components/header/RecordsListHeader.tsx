import {useSelector} from 'react-redux'
import {RecordListToolbar} from './RecordListToolbar'
import {RecordsListGrouping} from './RecordsListGrouping'
import {RecordsListSearchComponent} from './RecordsListSearchComponent'

// Types
import {IState} from '../../../../types/reducer.types'

const RecordsListHeader = () => {
  const {selectedRows} = useSelector((state: IState) => state.crudReducer)

  return (
    <div className='card-header border-0 pt-6'>
      <RecordsListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selectedRows.length > 0 ? <RecordsListGrouping /> : <RecordListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {RecordsListHeader}
