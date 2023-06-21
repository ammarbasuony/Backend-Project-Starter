import React, {FC} from 'react'

interface IFormInputProps {
  column: any
  formErrors: any
  isDisabled: boolean
  value: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, attr: string) => void
}

const FormInput: FC<IFormInputProps> = ({column, value, formErrors, isDisabled, onInputChange}) => {
  return (
    <div className='fv-row mb-7'>
      <label className={`fw-bold fs-6 mb-2 ${column.required ? 'required' : ''}`}>
        {column.name}
      </label>

      <input
        placeholder={column.name}
        type={column.type}
        name={column.attr}
        value={value}
        className={`form-control form-control-solid mb-3 mb-lg-0 ${
          formErrors[column.attr] ? 'is-invalid' : ''
        }`}
        autoComplete='off'
        disabled={isDisabled}
        onChange={(e) => onInputChange(e, column.attr)}
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

export default FormInput
