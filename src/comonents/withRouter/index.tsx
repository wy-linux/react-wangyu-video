import React from 'react'  
import { useAppDispatch,  useAppSelector} from "../../store/hook";
import { selectUser, getUserAsync } from '../../store/slicers/userSlice' 

interface IProps {
    children: React.ReactElement
}

const WithRouter: React.FC<IProps> = function ({children}) {
    const { token, email} = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    if(!token) { //没有token直接渲染路由
        return children
    }  else if(!email) { //没有email，请求获取email
        dispatch(getUserAsync())
        return null
    } else { //已经获取用户信息，渲染路由
        return children
    }
}
export default WithRouter