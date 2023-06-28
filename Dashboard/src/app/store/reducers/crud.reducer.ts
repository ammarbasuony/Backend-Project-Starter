import {
  SET_TABLE_DATA,
  SET_TOTAL_RECORDS,
  SET_TABLE_COLUMNS,
  SET_TABLE_NAME,
  SET_IS_TABLE_HAS_FILES,
  SET_IS_OPERATION_DONE,
  SET_OPERATIONS_PERMISIIONS,
  SET_SELECT_ROW,
  SET_UNSELECT_ROW,
  SET_SELECT_ALL_ROWS,
  SET_UNSELECT_ALL_ROWS,
} from '../types'

// Functions
import {formatDate} from '../../utils/functions.util'

// Types
import {IAction, ICrudState} from '../../types/reducer.types'

const initialState: ICrudState = {
  tableName: '',
  isTableHasFiles: false,
  tableData: [],
  totalRecords: 0,
  tableColumns: [],
  isOperationDone: false,
  operationsPermission: '',
  selectedRows: [],
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
    case SET_TOTAL_RECORDS:
      return {
        ...state,
        totalRecords: action.payload,
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
    case SET_IS_TABLE_HAS_FILES:
      return {
        ...state,
        isTableHasFiles: action.payload,
      }
    case SET_IS_OPERATION_DONE:
      return {
        ...state,
        isOperationDone: action.payload,
      }
    case SET_OPERATIONS_PERMISIIONS:
      return {
        ...state,
        operationsPermission: action.payload,
      }
    case SET_SELECT_ROW:
      return {
        ...state,
        selectedRows: [...state.selectedRows, action.payload],
      }
    case SET_UNSELECT_ROW:
      return {
        ...state,
        selectedRows: state.selectedRows.filter((row: number) => row !== action.payload),
      }
    case SET_SELECT_ALL_ROWS:
      return {
        ...state,
        selectedRows: state.tableData.map((row: any) => row.id),
      }
    case SET_UNSELECT_ALL_ROWS:
      return {
        ...state,
        selectedRows: [],
      }
    default:
      return state
  }
}

export default crudReducer
