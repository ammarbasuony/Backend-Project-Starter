import {
  // Operation Modal Types
  OPEN_OPERATION_MODAL,
  CLOSE_OPERATION_MODAL,
} from '../types'

// Types
import {IAction, IOperationModalState} from '../../types/reducer.types'

const initialState: IOperationModalState = {
  id: null,
  isModalOpen: false,
}

const operationModalReducer = (state = initialState, action: IAction) => {
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

    default:
      return state
  }
}

export default operationModalReducer
