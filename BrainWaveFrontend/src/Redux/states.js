import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:"state",
    initialState:{
        authenticationToken:'',
        avatar: '',
        name:'',
        createdAt:'',
        updatedAt:'', 
        id:''
    },
    reducers:{
        setAuthenticationToken:(state, action)=>{
            state.authenticationToken = action.payload
        },
        setName:(state, action)=>{
            state.name = action.payload
        },
        setAvatar:(state, action)=>{
            state.avatar = action.payload
        },
        setCreatedAt:(state, action)=>{
            state.createdAt = action.payload
        },
        setUpdatedAt:(state, action)=>{
            state.updatedAt = action.payload
        },
        setId:(state, action)=>{
            state.id = action.id
        },
        setStates:(state, action)=>{
            state.authenticationToken = action.payload.token,
            state.name= action.payload.name,
            state.avatar = action.payload.avatar,
            state.createdAt = action.payload.createdAt,
            state.updatedAt =action.payload.updatedAt,
            state.id = action.payload.id
        }
    }
})

export const {setAuthenticationToken, setAvatar, setCreatedAt, setName, setUpdatedAt, setId, setStates} = slice.actions

export default slice.reducer