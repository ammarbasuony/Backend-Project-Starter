import {useListView} from '../../core/ListViewProvider'

const UsersListGrouping = () => {
  const {selected, clearSelected} = useListView()

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => {}} // TODO: implement delete
      >
        Delete Selected
      </button>
    </div>
  )
}

export {UsersListGrouping}
