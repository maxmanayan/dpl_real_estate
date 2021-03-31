import axios from 'axios';
import { useEffect, useState } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';
import Card from '../components/Card';


const Cities = () => {
  const [cities, setCities] = useState(null)

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

  const handleChange = (e, {name, value}) => {
    console.log(name)
    console.log(value)
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
  

  return(
    <Card>
      <Header as='h1' textAlign='center'>Cities</Header>
      <span>
        <Dropdown
           onChange={handleChange}
           placeholder='Select City'
           fluid
           selection
          options={cities}
        />
      </span>
    </Card>

  )
}



export default Cities