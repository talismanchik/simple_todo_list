import {instance, ResponseType} from "./todoListsApi.ts";



export const AuthApi = {
    login() {
        return instance.post<ResponseType<{ userId: number }>>('/login')
    }
};

// TYPES
type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: boolean
}

