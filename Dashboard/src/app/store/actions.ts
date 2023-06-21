import {
  // App Types
  SET_USER,
  REMOVE_USER,

  // CRUD Types
  SET_TABLE_DATA,
  SET_TABLE_COLUMNS,
  SET_TABLE_NAME,
  SET_IS_TABLE_HAS_FILES,
  SET_IS_OPERATION_DONE,

  // Operation Modal Types
  OPEN_OPERATION_MODAL,
  CLOSE_OPERATION_MODAL,
  OPEN_CONFIRMATION_MODAL,
  CLOSE_CONFIRMATION_MODAL,
  SET_IS_CONFIRMED,
  SET_SELECTED_ID,
  SET_SELECT_ROW,
  SET_SELECT_ALL_ROWS,
  SET_UNSELECT_ROW,
  SET_UNSELECT_ALL_ROWS,
  OPEN_UPDATE_MODAL,
  CLOSE_UPDATE_MODAL,
} from './types'

// App Actions
export const setUser = (userData: any) => ({
  type: SET_USER,
  payload: userData,
})

export const removeUser = () => ({
  type: REMOVE_USER,
})

// CRUD Actions
export const setTableData = (tableData: any) => ({
  type: SET_TABLE_DATA,
  payload: tableData,
})

export const setTableColumns = (tableColumns: any) => ({
  type: SET_TABLE_COLUMNS,
  payload: tableColumns,
})

export const setTableName = (tableName: string) => ({
  type: SET_TABLE_NAME,
  payload: tableName,
})

export const setIsTableHasFiles = (isTableHasFiles: boolean) => ({
  type: SET_IS_TABLE_HAS_FILES,
  payload: isTableHasFiles,
})

export const setIsOperationDone = (isOperationDone: boolean) => ({
  type: SET_IS_OPERATION_DONE,
  payload: isOperationDone,
})

export const setSelectRow = (selectedRow: number) => ({
  type: SET_SELECT_ROW,
  payload: selectedRow,
})

export const setSelectAllRows = () => ({
  type: SET_SELECT_ALL_ROWS,
})

export const setUnselectRow = (unselectedRow: number) => ({
  type: SET_UNSELECT_ROW,
  payload: unselectedRow,
})

export const setUnselectAllRows = () => ({
  type: SET_UNSELECT_ALL_ROWS,
})

// Operation Modal Actions
export const openOperationModal = () => ({
  type: OPEN_OPERATION_MODAL,
})

export const closeOperationModal = () => ({
  type: CLOSE_OPERATION_MODAL,
})

export const openConfirmationModal = () => ({
  type: OPEN_CONFIRMATION_MODAL,
})

export const closeConfirmationModal = () => ({
  type: CLOSE_CONFIRMATION_MODAL,
})

export const openUpdateModal = () => ({
  type: OPEN_UPDATE_MODAL,
})

export const closeUpdateModal = () => ({
  type: CLOSE_UPDATE_MODAL,
})

export const setIsConfirmed = (isConfirmed: boolean) => ({
  type: SET_IS_CONFIRMED,
  payload: isConfirmed,
})

export const setSelectedId = (selectedId: number | null) => ({
  type: SET_SELECTED_ID,
  payload: selectedId,
})
