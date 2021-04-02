import { Header } from "semantic-ui-react"
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from "axios";


const CityCost = () => {
  const [costs, setCosts] = useState(null)

  useEffect(()=>{
    getCosts()
  },[])

  const getCosts = async () => {
    try {
      let res = await axios.get('/api/properties/city_cost')
      let normalizedData = normalizeData(res.data)
      console.log(normalizedData)
      setCosts(normalizedData)
    } catch (error) {
      console.log(error)
    }
  }

  // const getAvgCost = (data) => {
  //   return data.split(', ').reduce((acc, num) => {
  //     acc += parseInt(num)
  //     return acc
  //   }, 0)
  // }

  const normalizeData = (data) => {
    console.log('in normalizeData', data)
    return data.map( d=> {
      let numArr = d.prices.split(', ')
      let total = numArr.reduce((acc, num) => {
        acc += parseInt(num)
        return acc
      }, 0)
      return {
        name: d.city,
        price: total / d.prices.length
      }
    })
  }
  return(
    <>
    <Header as='h1' textAlign='center' style={{color: 'white', fontSize: '5em'}}>City Cost</Header>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <div style={{display: 'flex', justifyContent: 'center',}}>
        <BarChart
          className='barChart'
          width={500}
          height={300}
          data={costs}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="gray" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </div>
      {/* </ResponsiveContainer> */}
      {/* <h1>Below Chart</h1>
      {costs ? <pre>{JSON.stringify(costs, null, 2)}</pre> : 'costs not set'} */}
      </>
  )
}


export default CityCost;


const data = [
  {
    name: 'CITY',
    price: 2400,
  },
  {
    name: 'CITY',
    price: 1398,
  },
  {
    name: 'CITY',
    price: 9800,
  },
  {
    name: 'CITY',
    price: 3908,
  },
  {
    name: 'CITY',
    price: 4800,
  },
  {
    name: 'CITY',
    price: 3800,
  },
  {
    name: 'CITY',
    price: 4300,
  },
];
