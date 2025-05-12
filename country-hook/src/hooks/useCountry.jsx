import { useState, useEffect } from 'react'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)  
  const [loading, setLoading] = useState(false)  
  const [error, setError] = useState(null)  

  useEffect(() => {
    if (name === '') return 

    const fetchCountry = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
        setCountry({ found: true, data: response.data[0] })
      } catch (err) {
        setCountry({ found: false })   
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()
  }, [name]) 

  return { country, loading, error }
}

export default useCountry