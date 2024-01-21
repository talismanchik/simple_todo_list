import {instance} from "@/common/api/baseApi";
import {BaseResponseType} from '@/common/types/commonTypes'


export const authAPI = {
    login(date: LoginParamsType) {
        return instance.post<BaseResponseType<{ userId: number }>>('auth/login', date)
    },
    logout(){
      return instance.delete<BaseResponseType>('auth/login')
    },
    me(){
        return instance.get<BaseResponseType<MeParamsType>>('auth/me')
    }
};

// TYPES
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
export type MeParamsType = {
    email: string,
    id: number,
    login: string
}

