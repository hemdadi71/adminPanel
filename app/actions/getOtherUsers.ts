import axios from 'axios'

export const getOtherUsers = async () => {
  try {
    const { data } = await axios.get('/api/otherUsers')
    return data
  } catch (error) {
    console.log(error)
  }
}
