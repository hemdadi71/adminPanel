import axios from 'axios'

export const getProfiles = async () => {
  try {
    const { data } = await axios.get('/api/profiles')
    return data
  } catch (error) {
    console.log(error)
  }
}
