import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'

// Types
import {IState} from '../../../../types/reducer.types'

// Actions
import {openConfirmationModal, setIsOperationDone, setUnselectAllRows} from '../../../../store/actions'

// Functions
import {singularize} from '../../../../utils/functions.util'

// API
import genericCrudAPI from '../../../../api/generic-crud.api'

// Components
import {ConfirmationModal} from '../../../ConfimationModal/ConfirmationModal'

const RecordsListGrouping = () => {
  const dispatch = useDispatch()
  const {tableName, selectedRows} = useSelector((state: IState) => state.crudReducer)

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(openConfirmationModal())
  }

  const deleteRecords = async () => {
    const response = await genericCrudAPI(tableName).delete(selectedRows)

    if (!response.success) return response.errors.forEach((error: string) => toast.error(error))
    toast.success(`${singularize(tableName)} deleted successfully`)

    dispatch(setIsOperationDone(true))
    dispatch(setUnselectAllRows())
  }

  return (
    <>
      <div className='d-flex justify-content-end align-items-center'>
        <div className='fw-bolder me-5'>
          <span className='me-2'>{selectedRows.length}</span> Selected
        </div>

        <button type='button' className='btn btn-danger' onClick={handleDelete}>
          Delete Selected
        </button>
      </div>
      {selectedRows.length && <ConfirmationModal onConfirm={() => deleteRecords()} />}
    </>
  )
}

export {RecordsListGrouping}
