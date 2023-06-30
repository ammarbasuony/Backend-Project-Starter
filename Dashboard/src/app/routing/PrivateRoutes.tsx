import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'

// Pages
import Home from '../pages/Home'

import Users from '../pages/Users'
import Roles from '../pages/Roles'

import Posts from '../pages/Posts'
import Categories from '../pages/Categories'

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Pages */}
        <Route path='home' element={<Home />} />

        <Route path='users' element={<Users />} />
        <Route path='roles' element={<Roles />} />

        <Route path='posts' element={<Posts />} />
        <Route path='categories' element={<Categories />} />

        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export {PrivateRoutes}
