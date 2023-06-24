import React, {FC} from 'react'

// Properties
import properties from '../../../properties.json'

interface IFormImageUploaderProps {
  column: any
  value: string
  imagesPreview: any
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, attr: string) => void
  onReset: () => void
}

const FormImageUploader: FC<IFormImageUploaderProps> = ({
  column,
  value,
  imagesPreview,
  onInputChange,
  onReset,
}) => {
  const placeHolderImage = './media/avatars/blank.png'

  return (
    <div
      className='fv-row mb-7'
      style={{display: 'flex', flexDirection: 'column'}}
      key={column.attr}
    >
      <label className={`fw-bold fs-6 mb-2 ${column.required ? 'required' : ''}`}>
        {column.name}
      </label>

      <div
        className='image-input image-input-outline image-input-empty image-input-outline symbol symbol-circle'
        data-kt-image-input='true'
      >
        <div className='image-input-wrapper symbol'>
          <img
            src={
              imagesPreview[column.attr]
                ? imagesPreview[column.attr]
                : value
                ? `${properties.API_URL}${value}`
                : placeHolderImage
            }
            className='image-uploader'
            alt={column.attr}
          />
          <label
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow'
            data-kt-image-input-action='change'
          >
            <i className='bi bi-pencil-fill fs-7'></i>
            <input
              type='file'
              name={column.attr}
              accept='.jpg, .png , .gif'
              onChange={(e) => onInputChange(e, column.attr)}
            />
          </label>

          <span
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='cancel'
            title='Cancel avatar'
            onClick={() => onReset()}
          >
            <i className='bi bi-x fs-2'></i>
          </span>
        </div>
        <div className='form-text'>Allowed file types: png, jpg, gif.</div>
      </div>
    </div>
  )
}

export default FormImageUploader
