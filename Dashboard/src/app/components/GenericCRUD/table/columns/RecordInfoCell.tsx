import {FC} from 'react'

// Properties
import properties from '../../../../properties.json'

// Assets
import placeHolderImage from '../../../../assets/media/jpg/blank.jpg'

const RecordInfoCell: FC<{image: string}> = ({image}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-50px overflow-hidden me-3'>
      <div className='symbol-label'>
        <img
          src={image ? `${properties.API_URL}${image?.replace(/\\/g, '/')}` : placeHolderImage}
          onError={(e: any) => {
            e.target.src = placeHolderImage
          }}
          alt='preview'
          className='w-100'
        />
      </div>
    </div>
  </div>
)

export {RecordInfoCell}
