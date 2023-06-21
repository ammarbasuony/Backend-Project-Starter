import React, {FC} from 'react'

interface IFormSelectProps {
  column: any
  value: string | number
  formErrors: any
  onInputChange: (e: React.ChangeEvent<HTMLSelectElement>, attr: string) => void
  isDisabled: boolean
}

const FormSelect: FC<IFormSelectProps> = ({
  column,
  value,
  formErrors,
  onInputChange,
  isDisabled,
}) => {
  return (
    <div className='fv-row mb-7'>
      <label className={`fw-bold fs-6 mb-2 ${column.required ? 'required' : ''}`}>
        {column.name}
      </label>

      <select
        name={column.attr}
        id={column.attr}
        className={`form-control form-control-solid mb-3 mb-lg-0 ${
          formErrors[column.attr] ? 'is-invalid' : ''
        }`}
        disabled={isDisabled}
        onChange={(e) => onInputChange(e, column.attr)}
      >
        <option value=''>Select Option</option>
        {column.options.map((option: any) => (
          <option key={option.value} value={option.value} selected={option.value === value}>
            {option.label}
          </option>
        ))}
      </select>

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

export default FormSelect
