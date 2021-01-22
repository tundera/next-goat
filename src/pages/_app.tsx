import type { AppProps /* , AppContext */ } from 'next/app'

import QueryProvider from '@providers/QueryProvider'
import ThemeProvider from '@providers/ThemeProvider'
import DataProvider from '@providers/DataProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const { dehydratedState, children, ...rest } = pageProps
  return (
    <DataProvider {...rest}>
      <QueryProvider state={dehydratedState}>
        <ThemeProvider>
          <Component {...rest}>{children}</Component>
        </ThemeProvider>
      </QueryProvider>
    </DataProvider>
  )
}

export default MyApp
