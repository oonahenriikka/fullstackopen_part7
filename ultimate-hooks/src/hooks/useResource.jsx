import { useState, useEffect } from 'react'
import axios from 'axios'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    fetchData()
  }, [baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    setResources(prev => [...prev, response.data])
  }

  const service = {
    create
  }

  return [resources, service]
}

export default useResource
