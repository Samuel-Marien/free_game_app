import { SessionProvider } from 'next-auth/react'
import Layout from '../components/layout/Layout.js'

import { Provider } from '../components/context/appContext.js'

import '../styles/globals.css'

function MyApp({ Component, ...pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
