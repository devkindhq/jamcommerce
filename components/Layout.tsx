import { Box, useBreakpointValue } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useContext, useEffect } from 'react'
import AppContext from '../context/app-context'

import Footer from './Footer'
import Head from './Head'
import Header from './Header'

type Props = {
  children: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'Regional Sindh Emergency Flood Relief 2022',
}: Props) => {
  const { query } = useRouter();
  const {currency, status} = query;
  debugger;
  const app = useContext(AppContext);
  // This will read the currency from the params.
  const changedCurrency  = useCallback(() => app.changeCurrency(currency as string), [query]);
  useEffect(() => {
    if(currency && app?.state?.currency_rates && app.state.currency_rates.length > 1){
      changedCurrency()
    }
  }, [currency, app?.state?.currency_rates])

  return(<>
    <Head title={title} />
    <Header status={status as string} />
    <Box pt={useBreakpointValue({base: '0px', md: '100px'})}>
      {children}
    </Box>
    <Footer />
</>)
}


export default Layout
