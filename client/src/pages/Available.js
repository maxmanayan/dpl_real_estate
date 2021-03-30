import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "semantic-ui-react";
import Loader from "../components/Loader";
import Card from "../components/Card";


const Available = (props) => {
  const [properties, setProperties] =  useState(null)
  useEffect(()=>{
    getData()
  },[])

  const getData = async () => {
    try {
      let res = await axios.get('/api/properties')
      setProperties(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderProperties = () => {
    
  }

  if(!properties) return <Loader type='clock' text='loading please wait...' color='slateblue'/>
  return(
    <Card>
       <Header as='h1' textAlign='center'>Available</Header>
       <pre>{JSON.stringify(properties, null, 2)}</pre>
    </Card>
  )
}


export default Available;