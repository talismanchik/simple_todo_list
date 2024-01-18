import {instance} from "@/common/api/baseApi";
import {ResponseType} from '@/common/types/commonTypes'


export const authAPI = {
    login(date: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', date)
    },
    logout(){
      return instance.delete<ResponseType>('auth/login')
    },
    me(){
        return instance.get<ResponseType<MeParamsType>>('auth/me')
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

