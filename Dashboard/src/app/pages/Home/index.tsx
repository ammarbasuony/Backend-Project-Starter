import {FC} from 'react'
import {StatisticsWidget5} from '../../../_metronic/partials/widgets'

const Home: FC = () => {
  return (
    <div>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <StatisticsWidget5
            className='card-xl-stretch mb-xl-8'
            svgIcon='clipboard'
            color='#216EBC'
            iconColor='white'
            title='10'
            titleColor='white'
            description='Posts'
            descriptionColor='white'
          />
        </div>

        <div className='col-xl-6'>
          <StatisticsWidget5
            className='card-xl-stretch mb-xl-8'
            svgIcon='user'
            color='#334A52'
            iconColor='white'
            title='20'
            titleColor='white'
            description='Users'
            descriptionColor='white'
          />
        </div>
      </div>
      {/* end::Row */}
    </div>
  )
}

export default Home
