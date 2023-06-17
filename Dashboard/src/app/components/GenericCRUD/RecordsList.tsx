import {KTCard} from '../../../_metronic/helpers'

// Components
import {RecordsListHeader} from './components/header/RecordsListHeader'
import {RecordsTable} from './table/RecordsTable'
import {RecordCreateModal} from '../RecordCreateModal/RecordCreateModal'

const RecordsList = () => {
  return (
    <>
      <KTCard>
        <RecordsListHeader />
        <RecordsTable />
      </KTCard>
      <RecordCreateModal />
    </>
  )
}

export default RecordsList
