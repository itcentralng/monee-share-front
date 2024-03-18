import { configureStore } from '@reduxjs/toolkit'
import authApi from './auth.slice'

export const store = configureStore({
    reducer: {
        auth: authApi
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch