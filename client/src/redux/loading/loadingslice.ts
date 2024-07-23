import { createSlice } from '@reduxjs/toolkit'

interface LoadingState {
  loading: boolean
}

const initialState: LoadingState = {
    loading: false
}

export const loadingSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        showLoading: (state: { loading: boolean }) => {
            state.loading = true
        },
        hideLoading: (state: { loading: boolean }) => {
            state.loading = false
        }
    }
})

export const { showLoading, hideLoading } = loadingSlice.actions
