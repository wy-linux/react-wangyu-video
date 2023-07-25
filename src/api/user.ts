import axios from '../utils/axios'

export interface LoginParams {
    email: string;
    password: string
}
export interface RegisterParams extends LoginParams{
    code: string
}
interface LoginRes {
    token: string,
    message: string
}
interface UserRes {
    email: string,
    isVip: boolean,
    coinCount: number,
}

// redux 
export function loginReq({ email, password }: LoginParams) {
    return axios.post('/user/login', { email, password}) as Promise<LoginRes>
}

export function getUserReq() {
    return axios.get('/user/info') as Promise<UserRes>
}

// not redux
export function registerReq({ email, password, code }: RegisterParams) {
    return axios.post('/user/register', { email, password, code })
}

export function resetPasswordReq({ email, password, code }: RegisterParams) {
    return axios.post('/user/reset', { email, password, code }) 
}

export function VerificationCodeReq(email: string) {
    return axios.post('/user/code', { email })
}

export function logoutReq() {
    return axios.get('/user/logout')
}
