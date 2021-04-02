import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Dropdown, Header, Icon } from 'semantic-ui-react';

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

  const renderProperties = () => {
    return properties.map( property => {
      return(
        <Card
        image='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/o9uzuska-1576700104.jpg?crop=1.00xw:0.753xh;0,0.0513xh&resize=980:*'
        header={property.street}
        meta={property.price}
        description={`Beds: ${property.beds} Baths:${property.baths} sq feet: ${property.sq_ft}`}
        extra={(
            <a>
              <Icon name='bed' />
              {property.beds}
            </a>

          )}
        />
      )
    })
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
      {properties === null ? 
        <Loader type='bounce' text='please select a city' color='white'/> 
        :  
        <Card.Group style={{marginTop:'20px', paddingLeft: '10%', paddingRight: '10%'}}>
          {renderProperties()}
          </Card.Group>
      }
      {/* {properties === null ? <Loader type='bounce' text='please select a city' color='white'/> : <pre>{JSON.stringify(properties, null, 2)}</pre>} */}
    </div>

  )
}



export default Cities