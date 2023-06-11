import {
  // App Types
  SET_USER,
  REMOVE_USER,

  // CRUD Types
  SET_TABLE_DATA,
  SET_TABLE_COLUMNS,
  SET_TABLE_NAME,
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
