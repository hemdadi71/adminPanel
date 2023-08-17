import axios from 'axios'

const getCurrentUser = async () => {
  try {
    const { data } = await axios.get('/api/user')
    return data
  } catch (error: any) {
    return null
  }
}

export default getCurrentUser
