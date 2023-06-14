import {useState} from 'react'
import clsx from 'clsx'

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

interface IPagination {
  page: number
  items_per_page: number
  total_items: number
  total_pages: number
  links?: Array<{label: string; url: string | null; active: boolean}>
}

interface IPaginationOptional {
  page?: number
  items_per_page?: number
  total_items?: number
  total_pages?: number
  links?: Array<{label: string; url: string | null; active: boolean}>
}

const RecordsListPagination = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    items_per_page: 10,
    total_items: 0,
    total_pages: 0,
  })

  const updateState = (newState: IPaginationOptional) => {
    setPagination((prevState) => ({...prevState, ...newState}))
  }

  const updatePage = (page: number | null) => {
    if (!page || isLoading || pagination.page === page) {
      return
    }

    updateState({page, items_per_page: pagination.items_per_page || 10})
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {pagination.links
              ?.map((link) => {
                return {...link, label: mappedLabel(link.label)}
              })
              .map((link) => (
                <li
                  key={link.label}
                  className={clsx('page-item', {
                    active: false,
                    disabled: isLoading,
                    previous: link.label === 'Previous',
                    next: link.label === 'Next',
                  })}
                >
                  <a
                    href='/'
                    className={clsx('page-link', {
                      'page-text': link.label === 'Previous' || link.label === 'Next',
                      'me-5': link.label === 'Previous',
                    })}
                    onClick={() => updatePage(link.url ? Number(link.url) : null)}
                    style={{cursor: 'pointer'}}
                  >
                    {mappedLabel(link.label)}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {RecordsListPagination}
