import axios from '../utils/axios'

export function getVideoList() {
    return axios.get('/video/list') as Promise<Array<string>>
}

export function videoCreate(url: string, name: string) {
    return axios.post('/video/spider', { url, name })
}