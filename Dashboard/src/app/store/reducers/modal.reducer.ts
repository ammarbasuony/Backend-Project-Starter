import {
  // Operation Modal Types
  OPEN_OPERATION_MODAL,
  CLOSE_OPERATION_MODAL,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
  SET_IS_CONFIRMED,
  SET_SELECTED_ID,
  OPEN_UPDATE_MODAL,
  CLOSE_UPDATE_MODAL,
} from '../types'

// Types
import {IAction, IModalState} from '../../types/reducer.types'

const initialState: IModalState = {
  id: null,
  isModalOpen: false,
  isUpdateModalOpen: false,
  isConfirmationModalOpen: false,
  isConfirmed: false,
  selectedId: 0,
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
    case OPEN_UPDATE_MODAL:
      return {
        ...state,
        isUpdateModalOpen: true,
      }
    case CLOSE_UPDATE_MODAL:
      return {
        ...state,
        isUpdateModalOpen: false,
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
