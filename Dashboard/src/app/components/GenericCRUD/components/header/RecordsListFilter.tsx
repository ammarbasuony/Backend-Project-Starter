import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'

// API
import genericCrudAPI from '../../../../api/generic-crud.api'

// Metronic Components
import {MenuComponent} from '../../../../../_metronic/assets/ts/components'
import {KTIcon} from '../../../../../_metronic/helpers'

// Types
import {IState} from '../../../../types/reducer.types'

// Actions
import {setTableData} from '../../../../store/actions'

// Utils
import {excludeColumns} from '../../../../utils/constants.util'

const RecordsListFilter = () => {
  const dispatch = useDispatch()
  const {tableColumns, tableName} = useSelector((state: IState) => state.crudReducer)

  const [searchParams, setSearchParams] = useSearchParams()

  const [fields, setFields] = useState<any[]>([])
  const [filters, setFilters] = useState<any>({})

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  useEffect(() => {
    console.log(searchParams.get('search'))

    const filterFields = tableColumns.filter(
      (field) => !excludeColumns.includes(field.attr) && field.type !== 'image'
    )

    setFields(filterFields)

    // get filters from search params if exist
    const searchParamsObj: any = {}
    filterFields.forEach((field) => {
      if (searchParams.get(field.attr)) {
        searchParamsObj[field.attr] = searchParams.get(field.attr)
      }
    })
    setFilters(searchParamsObj)
  }, [tableColumns])

  const resetData = async () => {
    Object.keys(filters).forEach((key) => {
      searchParams.delete(key)
    })
    setSearchParams(searchParams)
    setFilters({})

    dispatch(setTableData([]))
    const response = await genericCrudAPI(tableName).getAll({
      ...(searchParams.get('page') && {page: Number(searchParams.get('page'))}),
    })
    dispatch(setTableData(response.data))
  }

  const filterData = async () => {
    // delete empty fields
    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key]
      }
    })

    dispatch(setTableData([]))
    const response = await genericCrudAPI(tableName).getAll({
      ...(searchParams.get('page') && {page: Number(searchParams.get('page'))}),
      ...(searchParams.get('search') && {search: searchParams.get('search')}),
      ...filters,
    })
    dispatch(setTableData(response.data))

    // Append filters to search params
    Object.keys(filters).forEach((key) => {
      searchParams.set(key, filters[key])
    })
    setSearchParams(searchParams)
  }

  const renderedFields = fields.map((field) => {
    if (field.type === 'select') {
      return (
        <div className='mb-10' key={field.attr}>
          <label className='form-label fs-6 fw-bold'>{field.name}:</label>
          <select
            className='form-select form-select-solid fw-bolder'
            data-kt-select2='true'
            data-placeholder='Select option'
            data-allow-clear='true'
            data-kt-user-table-filter={field.attr}
            data-hide-search='true'
            onChange={(e) => {
              setFilters({...filters, [field.attr]: e.target.value})
            }}
          >
            <option value='' selected={!filters[field.attr]}>
              Select Option
            </option>
            {field.options.map((option: any) => (
              <option
                value={option.value}
                key={option.value}
                selected={String(option.value) === String(filters[field.attr])}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )
    }

    if (field.type === 'date') {
      return (
        <div className='mb-10' key={field.attr}>
          <label className='form-label fs-6 fw-bold'>{field.name}:</label>
          <input
            type='date'
            className='form-control form-control-solid fw-bolder'
            placeholder='Select date'
            data-kt-user-table-filter={field.attr}
            value={filters[field.attr] || ''}
            onChange={(e) => {
              setFilters({...filters, [field.attr]: e.target.value})
            }}
          />
        </div>
      )
    }

    if (field.type === 'text') {
      return (
        <div className='mb-10' key={field.attr}>
          <label className='form-label fs-6 fw-bold'>{field.name}:</label>
          <input
            type='text'
            className='form-control form-control-solid fw-bolder'
            data-kt-user-table-filter={field.attr}
            value={filters[field.attr] || ''}
            onChange={(e) => {
              setFilters({...filters, [field.attr]: e.target.value})
            }}
          />
        </div>
      )
    }

    if (field.type === 'email') {
      return (
        <div className='mb-10' key={field.attr}>
          <label className='form-label fs-6 fw-bold'>{field.name}:</label>
          <input
            value={filters[field.attr] || ''}
            type='email'
            className='form-control form-control-solid fw-bolder'
            placeholder='Enter email'
            data-kt-user-table-filter={field.attr}
            onChange={(e) => {
              setFilters({...filters, [field.attr]: e.target.value})
            }}
          />
        </div>
      )
    }

    return null
  })

  return (
    <>
      {/* begin::Filter Button */}
      <button
        type='button'
        className='btn btn-light-primary'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='filter' className='fs-2' />
        Filter
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>Filter Options</div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {renderedFields}

          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              onClick={resetData}
              className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              Reset
            </button>
            <button
              type='button'
              onClick={filterData}
              className='btn btn-primary fw-bold px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              Apply
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {RecordsListFilter}
