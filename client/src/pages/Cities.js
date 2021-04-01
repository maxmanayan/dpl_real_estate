import axios from 'axios';
import { useEffect, useState } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import Card from '../components/Card';
import Loader from '../components/Loader';


const Cities = () => {
  const [cities, setCities] = useState(null)
  const [properties, setProperties] = useState(null)

  useEffect(()=>{
    getCities()
  }, [])

  const normalizeCityData = (citiesArr) => {
    return citiesArr.map(city => {
      return {key: city.city, text: city.city, value: city.city}
    })
  }

  const getCities = async () => {
    try {
      let res = await axios.get('/api/cities/list')
      let normalizedCityData = normalizeCityData(res.data)
      setCities(normalizedCityData)
    } catch (err) {
      console.log(err)
    }
  }

  const getProperties = async (city) => {
    try {
      let res = await axios.get(`/api/cities/${city}`)
      setProperties(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e, {name, value}) => {
    console.log(name)
    console.log(value)
    getProperties(value)

  }

  // const DropdownExampleInline = () => (
  //   <span>
  //     Show me posts by{' '}
  //     <Dropdown
  //       inline
  //       options={friendOptions}
  //       defaultValue={friendOptions[0].value}
  //     />
  //   </span>
  // )
  
  if(!cities) return <Loader type='clock' text='loading please wait...' color='white'/>
  // if(properties === null) return <Loader type='clock' text='loading please wait...' color='slateblue'/>
  return(
    <div>
      <Header as='h1' textAlign='center' style={{color: 'white', fontSize: '5em'}}>Cities</Header>
      <span>
        <Dropdown
           onChange={handleChange}
           placeholder='Select City'
           fluid
           selection
          options={cities}
        />
      </span>
      <br />
      {properties === null ? <Loader type='bounce' text='please select a city' color='white'/> : <pre>{JSON.stringify(properties, null, 2)}</pre>}
    </div>

  )
}



export default Cities