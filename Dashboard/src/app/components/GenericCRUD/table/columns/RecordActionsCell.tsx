import {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// Actions
import {
  openOperationModal,
  setIsOperationDone,
  openConfirmationModal,
  setIsConfirmed,
  setSelectedId,
} from '../../../../store/actions'

// API
import genericCrudAPI from '../../../../api/generic-crud.api'

// Types
import {IState} from '../../../../types/reducer.types'

// Utils
import {singularize} from '../../../../utils/functions.util'

// Components
import {ConfirmationModal} from '../../../ConfimationModal/ConfirmationModal'

type Props = {
  id: number
}

const RecordActionsCell: FC<Props> = ({id}) => {
  const dispatch = useDispatch()
  const {tableName} = useSelector((state: IState) => state.crudReducer)
  const {selectedId} = useSelector((state: IState) => state.modalReducer)

  const openEditModal = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(openOperationModal())
  }

  const handleDelete = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(openConfirmationModal())
    dispatch(setSelectedId(id))
  }

  const deleteRecord = async () => {
    const response = await genericCrudAPI(tableName).deleteOne(Number(selectedId))

    if (!response.success) return response.errors.forEach((error: string) => toast.error(error))

    dispatch(setIsOperationDone(true))
    dispatch(setIsConfirmed(false))
    dispatch(setSelectedId(null))
    toast.success(`${singularize(tableName)} deleted successfully`)
  }

  return (
    <>
      <a
        href='/'
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        onClick={openEditModal}
      >
        <i className='ki-duotone ki-pencil fs-3'>
          <span className='path1'></span>
          <span className='path2'></span>
        </i>
      </a>

      <a
        href='/'
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        onClick={handleDelete}
      >
        <i className='ki-duotone ki-trash fs-3'>
          <span className='path1'></span>
          <span className='path2'></span>
          <span className='path3'></span>
          <span className='path4'></span>
          <span className='path5'></span>
        </i>
      </a>
      <ConfirmationModal onConfirm={() => deleteRecord()} />
    </>
  )
}

export {RecordActionsCell}
