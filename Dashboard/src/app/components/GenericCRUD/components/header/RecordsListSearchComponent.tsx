import {useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {KTIcon} from '../../../../../_metronic/helpers'
import {useSelector, useDispatch} from 'react-redux'

// API
import genericCrudAPI from '../../../../api/generic-crud.api'

// Types
import {IState} from '../../../../types/reducer.types'

// Utils
import {singularize} from '../../../../utils/functions.util'

// Actions
import {setTableData} from '../../../../store/actions'

const RecordsListSearchComponent = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search') || '')
  const {tableName} = useSelector((state: IState) => state.crudReducer)

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(setTableData([]))
    const response = await genericCrudAPI(tableName).getAll({
      ...(searchParams.get('page') && {page: Number(searchParams.get('page'))}),
      search: searchTerm,
    })
    dispatch(setTableData(response.data))

    searchParams.set('search', searchTerm)
    setSearchParams(searchParams)
  }

  const handleClearSearch = async () => {
    setSearchTerm('')
    searchParams.delete('search')
    setSearchParams(searchParams)

    dispatch(setTableData([]))
    const response = await genericCrudAPI(tableName).getAll({
      ...(searchParams.get('page') && {page: Number(searchParams.get('page'))}),
    })
    dispatch(setTableData(response.data))
  }

  return (
    <div className='card-title'>
      {/* begin::Search */}
      <form className='d-flex align-items-center position-relative my-1' onSubmit={handleSearch}>
        <button className='position-absolute ms-4 mt-1 search-button'>
          <KTIcon iconName='magnifier' className='fs-1' />
        </button>

        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-250px ps-14'
          placeholder={`Search ${singularize(tableName)}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {searchTerm && (
        <div className='clear-search' onClick={handleClearSearch}>
          Clear
        </div>
      )}
      {/* end::Search */}
    </div>
  )
}

export {RecordsListSearchComponent}
