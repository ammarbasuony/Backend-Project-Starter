import {FC, useEffect, useState} from 'react'
import {RecordsListLoading} from '../GenericCRUD/components/loading/RecordsListLoading'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

// API
import genericCrudAPI from '../../api/generic-crud.api'

// Actions
import {closeUpdateModal, setIsOperationDone} from '../../store/actions'

// Types
import {IState} from '../../models/reducer.types'

// Utils
import {capitalize, singularize} from '../../utils/functions.util'

// Components
import FormInput from './components/FormInput.modal'
import FormImageUploader from './components/FormImageUploader.modal'
import FormSelect from './components/FormSelect.modal'

// Filters
const notTextInput = ['image', 'select']
const excludedColumns = ['id', 'createdAt', 'updatedAt']

const RecordUpdateModalForm: FC = () => {
  const dispatch = useDispatch()
  const {tableColumns, isTableHasFiles, tableName} = useSelector(
    (state: IState) => state.crudReducer
  )
  const {selectedId} = useSelector((state: IState) => state.modalReducer)

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [formErrors, setFormErrors] = useState<any>({})
  const [imagesPreview, setImagesPreview] = useState<any>({})

  const getRecordData = async () => {
    if (!selectedId) return

    setIsLoading(true)
    const response = await genericCrudAPI(tableName).getOne(selectedId)
    setIsLoading(false)

    if (!response.success) return response.errors.forEach((error: string) => toast.error(error))

    const filteredResponseData: any = {}
    const actualAttrs = tableColumns.map(
      (column) => !excludedColumns.includes(column.attr) && column.attr
    )
    
    Object.keys(response.data).forEach((key) => {
      if (actualAttrs.includes(key)) filteredResponseData[key] = response.data[key]
    })

    setFormData(filteredResponseData)
  }

  useEffect(() => {
    getRecordData()
  }, [tableName, selectedId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate
    const errors: any = {}
    tableColumns.forEach((column) => {
      if (column.required && !formData[column.attr] && column.attr !== 'password') {
        errors[column.attr] = `${capitalize(column.attr)} is required`
      }
    })
    setFormErrors(errors)
    if (Object.keys(errors).length) return setIsLoading(false)

    // Remove empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) delete formData[key]
    })

    // Submit
    const formDataWithFiles = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataWithFiles.append(key, formData[key])
    })

    let response
    if (isTableHasFiles) {
      response = await genericCrudAPI(tableName).updateOne(selectedId, formDataWithFiles)
    } else {
      response = await genericCrudAPI(tableName).updateOne(selectedId, formData)
    }

    setIsLoading(false)

    if (!response.success) return response.errors.forEach((error: string) => toast.error(error))
    toast.success(`${singularize(tableName)} created successfully`)
    dispatch(setIsOperationDone(true))
    return dispatch(closeUpdateModal())
  }

  const renderDynamicInputs = tableColumns.map((column) => {
    if (!notTextInput.includes(column.type) && !excludedColumns.includes(column.attr))
      return (
        <FormInput
          value={formData[column.attr]}
          column={column}
          formErrors={formErrors}
          isDisabled={isLoading}
          key={column.attr}
          onInputChange={(e, attr) => setFormData({...formData, [attr]: e.target.value})}
        />
      )

    if (column.type === 'image' && !excludedColumns.includes(column.attr))
      return (
        <FormImageUploader
          key={column.attr}
          column={column}
          value={formData[column.attr]}
          imagesPreview={imagesPreview}
          onInputChange={(e, attr) => {
            if (e.target.files?.length) {
              setFormData({...formData, [attr]: e.target.files[0]})
              setImagesPreview({
                ...imagesPreview,
                [attr]: URL.createObjectURL(e.target.files[0]),
              })
            }
          }}
          onReset={() => {
            const newImagesPreview = {...imagesPreview}
            delete newImagesPreview[column.attr]
            setImagesPreview(newImagesPreview)

            const newFormData = {...formData}
            delete newFormData[column.attr]
            setFormData(newFormData)
          }}
        />
      )

    if (column.type === 'select' && !excludedColumns.includes(column.attr))
      return (
        <FormSelect
          key={column.attr}
          value={formData[column.attr]}
          column={column}
          formErrors={formErrors}
          isDisabled={isLoading}
          onInputChange={(e, attr) => setFormData({...formData, [attr]: e.target.value})}
        />
      )
  })

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={handleSubmit}>
        <div
          className='d-flex flex-column scroll-y ps-2 me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          {renderDynamicInputs}
        </div>

        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => dispatch(closeUpdateModal())}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={isLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isLoading}
          >
            <span className='indicator-label'>Submit</span>
            {isLoading && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {isLoading && <RecordsListLoading />}
    </>
  )
}

export {RecordUpdateModalForm}
