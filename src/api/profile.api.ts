import { User, UserProfile } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GET_PROFILE = 'api/v1/channels/me'
const URL_UPDATE_PROFILE = 'api/v1/channels/updateMe'
export const URL_CHANGE_PASSWORD = 'api/v1/channels/updateMyPassword'
const profileApi = {
  getProfile: () => {
    return http.get<SuccessResponse<User>>(`${URL_GET_PROFILE}`)
  },
  updateProfle: (data: Omit<User, '_id' | ' subscribers'>) => {
    return http.patch<SuccessResponse<UserProfile<User>>>(`${URL_UPDATE_PROFILE}`, data)
  },
  changePassword: (data: { passwordCurrent: string; password: string; passwordConfirm: string }) => {
    return http.patch(`${URL_CHANGE_PASSWORD}`, data)
  }
}
export default profileApi
