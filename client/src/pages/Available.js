import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "semantic-ui-react";
import Loader from "../components/Loader";
import Card from "../components/Card";


const Available = (props) => {
  const [properties, setProperties] =  useState(null)
  const [currentPage, setCurrentPage] =  useState(1)
  const [totalPages, setTotalPages] =  useState(null)
  useEffect(()=>{
    getData()
  },[])

  
  const normalizeAgentData = (data) => {
    // console.log(data)
    const allIDS = data.map(d => d.agent_id)
    // console.log(allIDS)
    
    const agentSet = new Set(allIDS) 
    // console.log(agentSet)
    
    const agentIDS = [...agentSet]
    // console.log(agentIDS)
    
    let normalizedData = agentIDS.map( id => {
      let properties = data.filter(d => d.agent_id === id)
      // console.log(properties)
      let name = `{${properties[0].first_name} ${properties[0].last_name}}`
      let email = properties[0].email
      
      let agentProperties = properties.map( p => {
        return{beds: p.beds, baths: p.baths, sq_ft: p.sq_ft, city: p.city, price: p.price}
      })
      return {name, email, properties: agentProperties}
    })
    
    // console.log('----------')
    // console.log(normalizedData)
    return(normalizedData)
  }

  const getData = async (page = 1) => {
    try {
      let res = await axios.get(`/api/properties?page=${page}`)
      setCurrentPage(page)
      console.log(res.data)
      setTotalPages(res.data.total_pages)
      let normalizedAgentData = normalizeAgentData(res.data.properties)
      console.log(normalizedAgentData)
      setProperties(normalizedAgentData)
    } catch (err) {
      console.log(err)
    }
  }

  const renderPageNav = () => {
    let numsJSX = []
    for(let i = 1; i <= totalPages; i++){
      numsJSX.push(<span onClick={()=>getData(i)} textAlign='center' style={{marginRight: '2em', color: currentPage == i ? 'blue' : 'gray'}}>{i}</span>)
    }
    return numsJSX
  }
  // const renderProperties = () => {
  //   const { beds, baths, sq_ft, price, sold, email, agent_id, first_name, last_name, city } = dummyData[9]
  //   // console.log(beds, city)
  // }

  if(!properties) return <Loader type='clock' text='loading please wait...' color='white'/>
  return(
    <div>
       <Header as='h1' textAlign='center' style={{color: 'white', fontSize: '5em'}}>Available</Header>
       {renderPageNav()}
       <pre>{JSON.stringify(properties, null, 2)}</pre>
       {/* {renderProperties()} */}
    </div>
  )
}


export default Available;


// const dummyData = [
//   {
//     "property_id": "1",
//     "beds": 7,
//     "baths": 7,
//     "sq_ft": 4630,
//     "price": 163183,
//     "sold": false,
//     "email": "tyler.hackett@schimmel.biz",
//     "agent_id": "1",
//     "first_name": "Jan",
//     "last_name": "Gusikowski",
//     "city": "Draper"
//   },
//   {
//     "property_id": "2",
//     "beds": 3,
//     "baths": 1,
//     "sq_ft": 4571,
//     "price": 1254737,
//     "sold": false,
//     "email": "tyler.hackett@schimmel.biz",
//     "agent_id": "1",
//     "first_name": "Jan",
//     "last_name": "Gusikowski",
//     "city": "SLC"
//   },
//   {
//     "property_id": "7",
//     "beds": 7,
//     "baths": 8,
//     "sq_ft": 1976,
//     "price": 1430691,
//     "sold": false,
//     "email": "malika@willms.net",
//     "agent_id": "2",
//     "first_name": "Edwardo",
//     "last_name": "Heidenreich",
//     "city": "SLC"
//   },
//   {
//     "property_id": "8",
//     "beds": 4,
//     "baths": 2,
//     "sq_ft": 2626,
//     "price": 260132,
//     "sold": false,
//     "email": "malika@willms.net",
//     "agent_id": "2",
//     "first_name": "Edwardo",
//     "last_name": "Heidenreich",
//     "city": "Draper"
//   },
//   {
//     "property_id": "11",
//     "beds": 7,
//     "baths": 8,
//     "sq_ft": 6663,
//     "price": 547643,
//     "sold": false,
//     "email": "theo_champlin@mcdermott.io",
//     "agent_id": "3",
//     "first_name": "Les",
//     "last_name": "Lueilwitz",
//     "city": "Draper"
//   },
//   {
//     "property_id": "13",
//     "beds": 6,
//     "baths": 8,
//     "sq_ft": 3477,
//     "price": 1016814,
//     "sold": false,
//     "email": "theo_champlin@mcdermott.io",
//     "agent_id": "3",
//     "first_name": "Les",
//     "last_name": "Lueilwitz",
//     "city": "Draper"
//   },
//   {
//     "property_id": "14",
//     "beds": 2,
//     "baths": 8,
//     "sq_ft": 2805,
//     "price": 1154259,
//     "sold": false,
//     "email": "theo_champlin@mcdermott.io",
//     "agent_id": "3",
//     "first_name": "Les",
//     "last_name": "Lueilwitz",
//     "city": "Draper"
//   },
//   {
//     "property_id": "15",
//     "beds": 2,
//     "baths": 3,
//     "sq_ft": 2063,
//     "price": 413886,
//     "sold": false,
//     "email": "theo_champlin@mcdermott.io",
//     "agent_id": "3",
//     "first_name": "Les",
//     "last_name": "Lueilwitz",
//     "city": "SLC"
//   },
//   {
//     "property_id": "21",
//     "beds": 2,
//     "baths": 3,
//     "sq_ft": 1645,
//     "price": 1167376,
//     "sold": false,
//     "email": "cira@renner-becker.name",
//     "agent_id": "5",
//     "first_name": "Delmer",
//     "last_name": "Lynch",
//     "city": "Sandy"
//   },
//   {
//     "property_id": "22",
//     "beds": 2,
//     "baths": 4,
//     "sq_ft": 5050,
//     "price": 1081244,
//     "sold": false,
//     "email": "cira@renner-becker.name",
//     "agent_id": "5",
//     "first_name": "Delmer",
//     "last_name": "Lynch",
//     "city": "SLC"
//   }
// ]

// const allIDS = dummyData.map(d => d.agent_id)
// console.log(allIDS)

// const agentSet = new Set(allIDS) 
// console.log(agentSet)

// const agentIDS = [...agentSet]
// console.log(agentIDS)

// let normalizedData = agentIDS.map( id => {
//   let properties = dummyData.filter(d => d.agent_id === id)
//   let name = `{${properties[0].first_name} ${properties[0].last_name}}`
//   let email = properties[0].email

//   let agentProperties = properties.map( p => {
//     return{beds: p.beds, baths: p.baths, sq_ft: p.sq_ft, city: p.city, price: p.price}
//   })
//   return {name, email, properties: agentProperties}
// })

// console.log('----------')
// console.log(normalizedData)