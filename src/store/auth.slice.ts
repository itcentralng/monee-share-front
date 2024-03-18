import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserOnClient } from '../types/user'

const initialState: { user: UserOnClient } = {
    user: null,
}

export const auth = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserOnClient>) => {
            state.user = action.payload
        },
    },
})

export const { login } = auth.actions

export default auth.reducer