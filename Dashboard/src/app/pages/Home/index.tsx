import {FC, useEffect, useState} from 'react'
import {toast} from 'react-toastify'

// API
import {dashboardData} from '../../api/dashboard.api'

// Components
import {ChartsWidget3, StatisticsWidget5} from '../../../_metronic/partials/widgets'

const Home: FC = () => {
  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchData = async () => {
    setLoading(true)
    const response = await dashboardData()
    setLoading(false)

    if (!response.success) response.error.forEach((error: string) => toast.error(error))

    setData(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
            title={loading ? null : data.numberOfPosts}
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
            title={loading ? null : data.numberOfUsers}
            titleColor='white'
            description='Users'
            descriptionColor='white'
          />
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-12'>
          <ChartsWidget3
            className='card-xl-stretch mb-xl-8'
            title='Recent Posts'
            subtitle='Average Posts per day'
            xAxis={loading ? undefined : data.xAxis}
            data={
              loading
                ? undefined
                : [
                    {
                      name: 'Posts',
                      data: data.yAxis,
                    },
                  ]
            }
          />
        </div>
      </div>
      {/* end::Row */}
    </div>
  )
}

export default Home
