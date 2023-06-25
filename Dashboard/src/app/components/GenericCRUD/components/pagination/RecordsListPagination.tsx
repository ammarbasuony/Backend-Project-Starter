import {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import clsx from 'clsx'

// Types
import {IState} from '../../../../types/reducer.types'

// Actions
import {setTableData} from '../../../../store/actions'
import genericCrudAPI from '../../../../api/generic-crud.api'

const RecordsListPagination = () => {
  const dispatch = useDispatch()
  const {totalRecords} = useSelector((state: IState) => state.crudReducer)

  const [searchParams, setSearchParams] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)
  const [pageNumbers, setPageNumbers] = useState<number[]>([])
  const [itemsPerPage] = useState(30)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const pageNumbers: number[] = []

    for (let i = 1; i <= Math.ceil(totalRecords / itemsPerPage); i++) {
      pageNumbers.push(i)
    }

    setPageNumbers(pageNumbers)
    setTotalPages(Math.ceil(totalRecords / itemsPerPage))
  }, [totalRecords])

  const onPageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber)

    dispatch(setTableData([]))
    const response = await genericCrudAPI('users').getAll({
      page: pageNumber,
      itemsPerPage,
    })
    dispatch(setTableData(response.data))

    searchParams.set('page', String(pageNumber))
    setSearchParams(searchParams)
  }

  const renderPageNumbers = () =>
    pageNumbers.map((number) => {
      if (totalPages <= 7) {
        return (
          <li
            key={number}
            className={clsx('page-item', {
              active: currentPage === number,
            })}
          >
            <a
              href='/'
              className='page-link'
              onClick={(e) => {
                e.preventDefault()
                onPageChange(number)
              }}
            >
              {number}
            </a>
          </li>
        )
      }

      if (currentPage <= 4) {
        if (number <= 5 || number === totalPages) {
          return (
            <li
              key={number}
              className={clsx('page-item', {
                active: currentPage === number,
              })}
            >
              <a
                href='/'
                className='page-link'
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(number)
                }}
              >
                {number}
              </a>
            </li>
          )
        }

        if (number === 6) {
          return (
            <li key='ellipsis1' className='page-item'>
              <span className='page-link'>...</span>
            </li>
          )
        }
      }

      if (currentPage > 4 && currentPage <= totalPages - 4) {
        if (
          number === 1 ||
          number === currentPage - 2 ||
          number === currentPage - 1 ||
          number === currentPage ||
          number === currentPage + 1 ||
          number === currentPage + 2 ||
          number === totalPages
        ) {
          return (
            <li
              key={number}
              className={clsx('page-item', {
                active: currentPage === number,
              })}
            >
              <a
                href='/'
                className='page-link'
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(number)
                }}
              >
                {number}
              </a>
            </li>
          )
        }

        if (number === currentPage - 3 || number === currentPage + 3) {
          return (
            <li key={`ellipsis${number}`} className='page-item'>
              <span className='page-link'>...</span>
            </li>
          )
        }
      }

      if (currentPage > totalPages - 4) {
        if (
          number === 1 ||
          number === totalPages - 5 ||
          number === totalPages - 4 ||
          number === totalPages - 3 ||
          number === totalPages - 2 ||
          number === totalPages - 1 ||
          number === totalPages
        ) {
          return (
            <li
              key={number}
              className={clsx('page-item', {
                active: currentPage === number,
              })}
            >
              <a
                href='/'
                className='page-link'
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(number)
                }}
              >
                {number}
              </a>
            </li>
          )
        }

        if (number === totalPages - 6) {
          return (
            <li key='ellipsis2' className='page-item'>
              <span className='page-link'>...</span>
            </li>
          )
        }
      }

      return null
    })

  return (
    <nav>
      <ul className='pagination'>
        <li
          className={clsx('page-item', {
            disabled: currentPage === 1,
          })}
        >
          <a
            href='/'
            className='page-link'
            onClick={(e) => {
              e.preventDefault()
              onPageChange(currentPage - 1)
            }}
          >
            Previous
          </a>
        </li>
        {renderPageNumbers()}
        <li
          className={clsx('page-item', {
            disabled: currentPage === totalPages,
          })}
        >
          <a
            href='/'
            className='page-link'
            onClick={(e) => {
              e.preventDefault()
              onPageChange(currentPage + 1)
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  )
}

export {RecordsListPagination}
