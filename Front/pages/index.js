import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import {useAuth} from '../firebase/context'
import { db } from "../config/firebaseClient";
import useSWR from 'swr';
import fetch from 'unfetch';
import DataTable from 'react-data-table-component';
import columns from '../components/DataTableColumns/index';
import { Spinner, Box, Center, Grid, GridItem, Text, Stack } from "@chakra-ui/react"
import NumberFormat from 'react-number-format';


const URL = `https://api.covid19api.com/summary`
const URL2 = `https://covid19.th-stat.com/api/open/today`
const fetcher = URL => fetch(URL).then(r => r.json());
const fetcher2 = URL2 => fetch(URL2).then(r => r.json());

const customStyle = {
  tableWrapper: {
    style: {
      display: 'block'
    }
  }
};

export default function Home() {
  
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false })
  const { data: thailand} = useSWR(URL2, fetcher2, { revalidateOnFocus: false })
  const auth = useAuth();

    
  if (error) return <div>failed to load</div>
  if (!data) return <div><Spinner /></div>

  const sortedData = data.Countries.sort((a, b) =>
    a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
  );

  return (
    <div className="container">
      <Head>
        <title>PSU Care Covid-19</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx>
        {`
          .container {
            width: 820px;
            margin: 0 auto;
          }
          .title {
            text-align: center;
          }
          footer {
            text-align: center;
            padding: 2rem 0;
          }
        `}
      </style>
      <main>
      
      <Grid
        h="250px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={2} >
          <Box boxShadow="base" w="100%" h="100%" color="white" p="4" rounded="md" bg="#FEB2B2">
            <Center h="100%" >
            <Stack spacing={1}>
                <Text fontSize="xl">ติดเชื้อสะสมในประเทศ</Text>
                <Text fontSize="6xl" fontWeight="bold"><NumberFormat value={thailand.Confirmed} displayType={'text'} thousandSeparator={true} /></Text>
                <Text fontSize="xl">ผู้ป่วยใหม่วันนี้ <NumberFormat value={thailand.NewConfirmed} displayType={'text'} thousandSeparator={true} prefix={'+'} /></Text>
              </Stack>
            </Center>     
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
            <Box boxShadow="base" w="100%" h="100%" color="white" p="3" rounded="md" bg="#9AE6B4">
            <Text >หายป่วยแล้ว</Text>
            <Center h="50%" >
            <Stack spacing={0.1}>
                <Text fontSize="3xl" fontWeight="bold"><NumberFormat value={thailand.Recovered} displayType={'text'} thousandSeparator={true} /></Text>
              </Stack>
            </Center>
            <Text >หายป่วยเพิ่ม <NumberFormat value={thailand.NewRecovered} displayType={'text'} thousandSeparator={true} prefix={'+'} /> ราย</Text>
              </Box>
        </GridItem>
        <GridItem colSpan={2}>
            <Box boxShadow="base" w="100%" h="100%" color="white" p="3" rounded="md" bg="#90cdf4">
            <Text >ผู้ป่วยรักษาอยู่ รพ.</Text>
            <Center h="50%">
            <Stack spacing={0.1}>
                <Text fontSize="3xl" fontWeight="bold"><NumberFormat value={thailand.Hospitalized} displayType={'text'} thousandSeparator={true} /></Text>
              </Stack>
            </Center> 
            <Text >เข้ารับการรักษาเพิ่ม <NumberFormat value={thailand.NewHospitalized} displayType={'text'} thousandSeparator={true} prefix={'+'} /> ราย</Text> 
              </Box>
        </GridItem>
        <GridItem colSpan={4}>
          <Box boxShadow="base" w="100%" h="100%" color="white" p="3" rounded="md" bg="#A0AEC0">
          เสียชีวิต
          <Center h="50%">
            <Stack spacing={0.1}>
                <Text fontSize="3xl" fontWeight="bold"><NumberFormat value={thailand.Deaths} displayType={'text'} thousandSeparator={true} /></Text>
              </Stack>
          </Center>
          <Text >New Cases เพิ่มขึ้น <NumberFormat value={thailand.NewDeaths} displayType={'text'} thousandSeparator={true} prefix={'+'} /> ราย</Text> 
          </Box>
        </GridItem>
      </Grid>
      <DataTable
        title="COVID-19 Summary"
        customStyles={customStyle}
        columns={columns}
        data={sortedData}
        pagination={true}
      />
      </main>
    </div>
  )
}
