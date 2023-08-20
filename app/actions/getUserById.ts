import axios from 'axios'

export const getUserById = async (id: any) => {
  try {
    const { data } = await axios.post('/api/userById', id)
    return data
  } catch (error) {
    console.log(error)
  }
}
