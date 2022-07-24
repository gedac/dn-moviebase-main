import { ChakraProvider } from '@chakra-ui/react';
import theme from '../utils/theme';
import { SWRConfig } from 'swr';
import { swrOptions } from '../utils/api';
import './styles.css';
import 'semantic-ui-css/semantic.min.css'
import dbConnect from '../utils/dbConnect';
import axios from 'axios';


function MyApp({ Component, pageProps }) {
  axios.get("/api/history/1366");
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={swrOptions}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
