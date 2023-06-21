import {KTCard} from '../../../_metronic/helpers'

// Components
import {RecordsListHeader} from './components/header/RecordsListHeader'
import {RecordsTable} from './table/RecordsTable'
import {RecordCreateModal} from '../RecordCreateModal/RecordCreateModal'
import { RecordUpdateModal } from '../RecordUpdateModal/RecordUpdateModal'

const RecordsList = () => {
  return (
    <>
      <KTCard>
        <RecordsListHeader />
        <RecordsTable />
      </KTCard>
      <RecordCreateModal />
      <RecordUpdateModal />
    </>
  )
}

export default RecordsList
