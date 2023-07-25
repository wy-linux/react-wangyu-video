import { 
    loginReq,
    getUserReq, 
    logoutReq,
} from "../../api/user";
import type { LoginParams } from "../../api/user"
import { RootState } from "..";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  isVip: boolean;
  coinCount: number;
  token: string;
}

const initialState: UserState = {
  email: '',
  isVip: false,
  coinCount: 0,
  token: localStorage.getItem('token') || ''
}


export const loginAsync = createAsyncThunk(
  'user/loginAsync',
  ({email, password}: LoginParams) => loginReq({email, password})
)

export const getUserAsync = createAsyncThunk(
    'user/getUserAsync',
    () => getUserReq()
)
  
export const logoutAsync = createAsyncThunk(
  'user/LogoutAsync',
  () => logoutReq()
)

const userSlice = createSlice({
  name: 'user', 
  initialState, 
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.token = token
      localStorage.setItem('token',token)
    },
    removeToken(state) {
      state.token = ''
      state.email = ''
      localStorage.removeItem('token')
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {  
        const { token } = action.payload
        localStorage.setItem('token',token)
        state.token = token
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        const {email, isVip , coinCount} = action.payload
        console.log('用户信息:', action.payload)
        state.email = email
        state.isVip = isVip
        state.coinCount = coinCount
      })
      .addCase(logoutAsync.fulfilled, (state, action) => {
        localStorage.removeItem('token')
        state.token = ''
        state.email = ''
        state.isVip = false
        state.coinCount = 0
      })
  },
})

export const userReducer = userSlice.reducer

export const { setToken, removeToken } = userSlice.actions

export const selectUser = (state: RootState) => state.user
