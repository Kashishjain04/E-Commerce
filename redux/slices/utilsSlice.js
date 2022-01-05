import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginModal: false,
}

const utilsSlice = createSlice({
    name: 'utilsSlice',
    initialState,
    reducers: {
        openLoginModal: (state) => {
            state.loginModal = true
        },
        closeLoginModal: (state) => {
            state.loginModal = false
        },
    }
});

export const { openLoginModal, closeLoginModal } = utilsSlice.actions;
export const selectLoginModal = (state) => state.utils.loginModal;
export default utilsSlice.reducer;