import {SET_TABLE_DATA, SET_TABLE_COLUMNS, SET_TABLE_NAME} from '../types'

// Functions
import {formatDate} from '../../utils/functions.util'

// Types
import {IAction, ICrudState} from '../../types/reducer.types'

const initialState: ICrudState = {
  tableName: '',
  tableData: [],
  tableColumns: [],
}

const crudReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload.map((item: any) => {
          const newItem = {...item}
          newItem.createdAt = formatDate(item.createdAt)
          newItem.updatedAt = formatDate(item.updatedAt)
          return newItem
        }),
      }
    case SET_TABLE_COLUMNS:
      return {
        ...state,
        tableColumns: action.payload,
      }
    case SET_TABLE_NAME:
      return {
        ...state,
        tableName: action.payload,
      }
    default:
      return state
  }
}

export default crudReducer
