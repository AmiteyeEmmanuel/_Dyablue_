import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { loadingSlice } from './loading/loadingslice'
import { UserSlice } from './user/userslice'

const rootReducer = combineReducers({
    alerts: loadingSlice.reducer,
    user: UserSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store
