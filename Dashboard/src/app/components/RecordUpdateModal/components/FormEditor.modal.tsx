import {FC} from 'react'
import ReactQuill from 'react-quill'

interface IFormEditorProps {
  column: any
  formErrors: any
  isDisabled: boolean
  value: string
  onInputChange: (value: string, attr: string) => void
}

const FormEditor: FC<IFormEditorProps> = ({
  column,
  formErrors,
  isDisabled,
  value,
  onInputChange,
}) => {
  return (
    <div className='fv-row mb-7'>
      <label className={`fw-bold fs-6 mb-2 ${column.required ? 'required' : ''}`}>
        {column.name}
      </label>
      <ReactQuill
        theme='snow'
        modules={{
          toolbar: [
            [{header: [1, 2, 3, 4, 5, 6, false]}],
            ['code', 'code-block'],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'direction'],
            [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
            ['link', /* 'image', */ 'video'],
            ['clean'],
          ],
        }}
        value={value}
        onChange={(value) => onInputChange(value, column.attr)}
        style={{
          height: '200px',
          marginBottom: '5rem',
        }}
        readOnly={isDisabled}
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

export default FormEditor
