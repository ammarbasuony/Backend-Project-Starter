import {FC, useRef} from 'react'

// Utils
import {limitText} from '../../../utils/functions.util'

// Properties
import properties from '../../../properties.json'

interface IFormMultiImageUploader {
  column: any
  formErrors: any
  value: any
  isDisabled: boolean
  handleUpload: (e: any, attr: string) => void
  onRemove: (index: number) => void
}

const FormMultiImageUploader: FC<IFormMultiImageUploader> = ({
  column,
  formErrors,
  handleUpload,
  onRemove,
  isDisabled,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const images = JSON.parse(value || '[]')
  console.log(images)

  return (
    <div className='fv-row mb-7'>
      <label className={`fw-bold fs-6 mb-2 ${column.required ? 'required' : ''}`}>
        {column.name}
      </label>

      <div className='w-full p-3 bg-gray-100 rounded-xl'>
        {images?.length ? (
          <div className='d-flex flex-wrap gap-4 mb-4'>
            {images.map((image: any, index: number) => (
              <div
                key={index}
                className='position-relative w-full bg-gray-200 rounded-xl flex items-center justify-between'
              >
                <div className='flex items-center gap-3'>
                  <img
                    src={`${properties.API_URL}${image.path}`}
                    alt={image.filename}
                    className='w-20 h-20 rounded-xl object-cover'
                  />

                  <div className='text-lg font-medium text-gray-600'>
                    {limitText(image.filename, 120)}
                  </div>
                </div>

                <button
                  type='button'
                  className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary btn-active-light mr-4'
                  onClick={() => onRemove(index)}
                >
                  <i className='bi bi-x fs-2'></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
        <div
          className='border-2 border-gray-400 rounded-xl cursor-pointer font-semibold text-gray-600 text-2xl border-dashed px-5 text-center h-32 font-default flex items-center justify-center'
          onClick={() => !isDisabled && inputRef.current?.click()}
        >
          Click Here To Upload Images
        </div>
      </div>

      <input
        type='file'
        multiple
        ref={inputRef}
        className='hidden'
        name={column.attr}
        accept='.jpg, .png , .gif'
        onChange={(e) => handleUpload(e, column.attr)}
        disabled={isDisabled}
      />

      {formErrors[column.attr] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formErrors[column.attr]}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormMultiImageUploader
