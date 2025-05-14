// src/services/comments.js
import axios from 'axios'
const baseUrl = '/api/notes'

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
};

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data;
}

export default { getComments, addComment }
