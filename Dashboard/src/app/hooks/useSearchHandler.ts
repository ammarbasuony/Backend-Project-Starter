import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

// Types
import {IColumn} from '../models/table.types'

const useSearchHandler = (columns: IColumn[], excludeColumns: string[]) => {
  const [searchParams] = useSearchParams()

  const [params, setParams] = useState<any>({})
  const [isParamsChanged, setIsParamsChanged] = useState<boolean>(false)

  const getSearchParams = () => {
    const filterFields = columns.filter(
      (field) => !excludeColumns.includes(field.attr) && field.type !== 'image'
    )

    // get filters from search params if exist
    const searchParamsObj: any = {}

    if (searchParams.get('page')) {
      searchParamsObj['page'] = searchParams.get('page')
    }

    if (searchParams.get('search')) {
      searchParamsObj['search'] = searchParams.get('search')
    }

    filterFields.forEach((field) => {
      if (searchParams.get(field.attr)) {
        searchParamsObj[field.attr] = searchParams.get(field.attr)
      }
    })
    setParams(searchParamsObj)
    setIsParamsChanged(true)
  }

  useEffect(() => {
    getSearchParams()
  }, [])
  return {params, isParamsChanged}
}

export default useSearchHandler
