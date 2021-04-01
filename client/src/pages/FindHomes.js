import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown, Header } from "semantic-ui-react";
import Loader from "../components/Loader";



const FindHomes = () => {

  const [agents, setAgents] = useState(null)
  const [buyers, setBuyers] = useState(null)
  const [properties, setProperties] = useState(null)

  useEffect(()=>{
    getAgents()
  },[])

  const agentOptions = (data) => {
    return data.map( agent => {
      return {key: agent.id, value: agent.id, text: `${agent.first_name} ${agent.last_name} (${agent.frequency} buyers)`}
    })
  }


  const buyerOptions = (data) => {
    return data.map( buyer => {
      return {key: buyer.id, value: buyer.id, text: `${buyer.first_name} ${buyer.last_name}`}
    })
  }



  const getAgents = async () => {
    try {
      let res = await axios.get('/api/agents')
      console.log(res.data)
      let getAgentOptions = agentOptions(res.data)
      console.log(getAgentOptions)
      setAgents(getAgentOptions)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAgentChange = async (e, {name, value}) => {
    console.log(name)
    console.log(value)
    try {
      let res = await axios.get(`/api/agents/${value}`)
      console.log(res.data)
      let getBuyerOptions = buyerOptions(res.data)
      console.log(getBuyerOptions)
      setBuyers(getBuyerOptions)
    } catch (err) {
      console.log(err)
    }
  }


  const handleBuyerChange = async (e, {name, value}) => {
    console.log(name)
    console.log(value)
    try {
      let res = await axios.get(`/api/buyers/${value}`)
      console.log(res.data)
      setProperties(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // if(!agents) return <Loader type='clock' text='loading please wait...' color='white'/>
  return(
    <div>
      <Header as='h1' textAlign='center' style={{color: 'white', fontSize: '5em'}}>Find Homes</Header>
      <span>
        <Dropdown
          onChange={handleAgentChange}
          placeholder='Select Agent'
          fluid
          selection
          options={agents}
        />
      </span>
      <br />
      <span>
        <Dropdown
          onChange={handleBuyerChange}
          placeholder='Select Buyer'
          fluid
          selection
          options={buyers}
        />
      </span>
      <br />
      {properties === null ? <Loader type='bounce' text='please select an agent and buyer' color='white'/> : <pre>{JSON.stringify(properties, null, 2)}</pre>}
    </div>
  )
}


export default FindHomes;