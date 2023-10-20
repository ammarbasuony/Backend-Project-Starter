import {FC, useState} from 'react'
import {RecordsListLoading} from '../GenericCRUD/components/loading/RecordsListLoading'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

import genericCrudAPI from '../../api/generic-crud.api'

// Actions
import {closeOperationModal, setIsOperationDone} from '../../store/actions'

// Types
import {IState} from '../../models/reducer.types'

// Utils
import {capitalize, singularize} from '../../utils/functions.util'

// Components
import FormInput from './components/FormInput.modal'
import FormImageUploader from './components/FormImageUploader.modal'
import FormSelect from './components/FormSelect.modal'
import FormEditor from './components/FormEditor.modal'

// Filters
const notTextInput = ['image', 'select']
const excludedColumns = ['id', 'createdAt', 'updatedAt']

const RecordCreateModalForm: FC = () => {
  const dispatch = useDispatch()
  const {tableColumns, isTableHasFiles, tableName} = useSelector(
    (state: IState) => state.crudReducer
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [formErrors, setFormErrors] = useState<any>({})
  const [imagesPreview, setImagesPreview] = useState<any>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate
    const errors: any = {}
    tableColumns.forEach((column) => {
      if (column.required && !formData[column.attr]) {
        errors[column.attr] = `${capitalize(column.attr)} is required`
      }
    })
    setFormErrors(errors)
    if (Object.keys(errors).length) return setIsSubmitting(false)

    // Submit
    const formDataWithFiles = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataWithFiles.append(key, formData[key])
    })

    let response
    if (isTableHasFiles) {
      response = await genericCrudAPI(tableName).createOne(formDataWithFiles)
    } else {
      response = await genericCrudAPI(tableName).createOne(formData)
    }

    setIsSubmitting(false)

    if (!response.success) return response.errors.forEach((error: string) => toast.error(error))
    toast.success(`${singularize(tableName)} created successfully`)
    dispatch(setIsOperationDone(true))
    setFormData({})
    return dispatch(closeOperationModal())
  }

  const renderDynamicInputs = tableColumns.map((column) => {
    if (column.type === 'editor' && !excludedColumns.includes(column.attr))
      return (
        <FormEditor
          column={column}
          formErrors={formErrors}
          isDisabled={isSubmitting}
          key={column.attr}
          value={formData[column.attr]}
          onInputChange={(value, attr) =>
            setFormData({
              ...formData,
              [attr]: value,
            })
          }
        />
      )

    if (!notTextInput.includes(column.type) && !excludedColumns.includes(column.attr))
      return (
        <FormInput
          column={column}
          formErrors={formErrors}
          isDisabled={isSubmitting}
          key={column.attr}
          value={formData[column.attr]}
          onInputChange={(e, attr) =>
            setFormData({
              ...formData,
              [attr]: column.type === 'date' ? new Date(e.target.value) : e.target.value,
            })
          }
          type={column.type}
        />
      )

    if (column.type === 'image' && !excludedColumns.includes(column.attr))
      return (
        <FormImageUploader
          key={column.attr}
          column={column}
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
          column={column}
          formErrors={formErrors}
          value={formData[column.attr]}
          isDisabled={isSubmitting}
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
            onClick={() => dispatch(closeOperationModal())}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={isSubmitting}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isSubmitting}
          >
            <span className='indicator-label'>Submit</span>
            {isSubmitting && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {isSubmitting && <RecordsListLoading />}
    </>
  )
}

export {RecordCreateModalForm}
