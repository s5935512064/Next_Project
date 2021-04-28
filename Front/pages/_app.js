import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from '../components/Layout'
import {AuthProvider} from "../firebase/context"
import { ChakraProvider } from "@chakra-ui/react"


function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Layout>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Layout>
    </AuthProvider>
  ) 
}

export default MyApp