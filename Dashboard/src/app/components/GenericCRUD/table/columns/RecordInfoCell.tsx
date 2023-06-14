import {FC} from 'react'

// Properties
import properties from '../../../../properties.json'

const RecordInfoCell: FC<{image: string}> = ({image}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <div className='symbol-label'>
        <img
          src={`${properties.API_URL}${image.replace(/\\/g, '/')}`}
          alt='profile'
          className='w-100'
        />
      </div>
    </div>
  </div>
)

export {RecordInfoCell}
