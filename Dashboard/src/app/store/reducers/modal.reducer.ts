import {
  // Operation Modal Types
  OPEN_OPERATION_MODAL,
  CLOSE_OPERATION_MODAL,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
  SET_IS_CONFIRMED,
  SET_SELECTED_ID,
} from '../types'

// Types
import {IAction, IModalState} from '../../types/reducer.types'

const initialState: IModalState = {
  id: null,
  isModalOpen: false,
  isConfirmationModalOpen: false,
  isConfirmed: false,
  selectedId: null,
}

const ModalReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case OPEN_OPERATION_MODAL:
      return {
        ...state,
        isModalOpen: true,
      }
    case CLOSE_OPERATION_MODAL:
      return {
        ...state,
        isModalOpen: false,
      }
    case OPEN_CONFIRMATION_MODAL:
      return {
        ...state,
        isConfirmationModalOpen: true,
      }
    case CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        isConfirmationModalOpen: false,
      }
    case SET_IS_CONFIRMED:
      return {
        ...state,
        isConfirmed: action.payload,
      }
    case SET_SELECTED_ID:
      return {
        ...state,
        selectedId: action.payload,
      }
    default:
      return state
  }
}

export default ModalReducer
