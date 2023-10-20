import {createRoot} from 'react-dom/client'
// Redux
import {Provider} from 'react-redux'
import store from './app/store'
// Charts
import {Chart, registerables} from 'chart.js'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
import './_metronic/assets/fonticon/fonticon.css'
import './_metronic/assets/keenicons/duotone/style.css'
import './_metronic/assets/keenicons/outline/style.css'
import './_metronic/assets/keenicons/solid/style.css'
import 'react-quill/dist/quill.snow.css'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'

// React Toastify
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// App layout
import {AppRoutes} from './app/routing/AppRoutes'

Chart.register(...registerables)

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <>
      <MetronicI18nProvider>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </MetronicI18nProvider>
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}
