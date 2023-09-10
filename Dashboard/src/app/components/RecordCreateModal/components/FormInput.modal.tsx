import React, {FC} from 'react'

interface IFormInputProps {
  column: any
  formErrors: any
  isDisabled: boolean
  type: 'text' | 'textarea'
  value: string
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    attr: string
  ) => void
}

const FormInput: FC<IFormInputProps> = ({
  column,
  formErrors,
  isDisabled,
  onInputChange,
  type = 'text',
  value,
}) => {
  return (
    <div className='fv-row mb-7'>
      <label className={`fw-bold fs-6 mb-2 ${column.required ? 'required' : ''}`}>
        {column.name}
      </label>

      {type !== 'textarea' ? (
        <input
          placeholder={column.name}
          type={column.type}
          name={column.attr}
          className={`form-control form-control-solid mb-3 mb-lg-0 ${
            formErrors[column.attr] ? 'is-invalid' : ''
          }`}
          autoComplete='off'
          disabled={isDisabled}
          value={value || ''}
          onChange={(e) => onInputChange(e, column.attr)}
        />
      ) : (
        <textarea
          placeholder={column.name}
          name={column.attr}
          className={`form-control form-control-solid mb-3 mb-lg-0 ${
            formErrors[column.attr] ? 'is-invalid' : ''
          }`}
          autoComplete='off'
          disabled={isDisabled}
          value={value || ''}
          onChange={(e) => onInputChange(e, column.attr)}
          rows={5}
        />
      )}
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

export default FormInput
