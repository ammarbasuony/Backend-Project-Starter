import {RecordsListHeader} from './components/header/RecordsListHeader'
import {RecordsTable} from './table/RecordsTable'
import {RecordEditModal} from '../RecordCreateModal/RecordCreateModal'
import {KTCard} from '../../../_metronic/helpers'

const RecordsList = () => {
  return (
    <>
      <KTCard>
        <RecordsListHeader />
        <RecordsTable />
      </KTCard>
      <RecordEditModal />
    </>
  )
}

export default RecordsList
