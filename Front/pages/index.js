import Head from 'next/head'
import {getFirebaseData} from '../lib/firebase'


const Home = ({data}) => {
  console.log(data);

  return (
    <div className="container">
      <Head>
        <title>PSU Care Covid-19</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}

export async function getStaticProps() {
  getFirebaseData();
  return {
    props : {
      data : "Hello",
    },
  };
}

export default Home;
