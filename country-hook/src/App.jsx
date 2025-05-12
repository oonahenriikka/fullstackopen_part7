import React, { useState } from 'react'
import useField from './hooks/useField'  
import useCountry from './hooks/useCountry'  

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>Capital: {country.data.capital}</div>
      <div>Population: {country.data.population}</div>
      <img src={country.data.flags[0]} height="100" alt={`Flag of ${country.data.name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const { country, loading, error } = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Country country={country} />
    </div>
  )
}

export default App
