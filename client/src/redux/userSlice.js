import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState :{
        users : [],
        isFetching: false,
        error: false,
    },
    reducers:{
        // Get All Users
        userStart: (state)=>{
            state.isFetching=true
            state.error=false
        },
        userSuccess: (state, action)=>{
            state.isFetching=false
            state.users = action.payload
        },
        userFailure: (state)=>{
            state.isFetching=false
            state.error=true
        },

        // Delete user (Delete)

        deleteUser: (state)=>{
            state.isFetching=true
            state.error=false
        },
        deleteUserSuccess: (state, action)=>{
            state.isFetching=false;
            state.users.splice(state.users.findIndex(item => item.id === action.payload))
        },
        deleteUserFailure: (state)=>{
            state.isFetching=false
            state.error=true
        },
        
    }
})

export const {userStart, userSuccess, userFailure, deleteUser,deleteUserSuccess,deleteUserFailure} = userSlice.actions
export default userSlice.reducer 