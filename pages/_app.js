import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/layout/Layout.js'

import { Provider } from '../components/context/appContext.js'

function MyApp({ Component, ...pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
