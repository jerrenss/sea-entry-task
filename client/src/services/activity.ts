import { AxiosError } from 'axios'
import moment from 'moment'
import { getAdminBadge } from '../components/Navbar'
import { apiClient } from '../config'
import { getVCPUserData, isAdmin } from './authentication'

interface Activity {
  _id?: string
  name?: string
  activity?: string
  role?: string
  email?: string
  merchant?: string
  action?: string
  dateTime?: string
}

const getAllActivity = async (): Promise<Activity[]> => {
  try {
    const response = await apiClient.get(`/getAllActivity`)
    const activities = response.data.activities
    return activities
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

const addActivity = async (action: string): Promise<Activity> => {
  try {
    const VCPUserData = getVCPUserData()
    const admin = isAdmin()
    const currentDate = new Date()
    const outputFormat = 'YYYY/MM/DD HH:mm:ss'
    const response = await apiClient.post(`/addActivity`, {
      name: VCPUserData.employee.firstname,
      role: VCPUserData.employee.typeOfUser,
      email: VCPUserData.employee.email,
      merchant: `${admin ? getAdminBadge() : VCPUserData.merchant.companyName}`,
      action: action,
      dateTime: moment(currentDate).format(outputFormat),
    })
    const userData = response.data.activity
    return userData
  } catch (err) {
    if (err & err.response) {
      const axiosError = err as AxiosError
      return axiosError.response.data
    }
  }
}

export default {
  getAllActivity,
  addActivity,
}
