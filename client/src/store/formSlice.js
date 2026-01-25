import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
    name: 'category',
    initialState:{
        formName: false,
    },
    reducers: {
        setForm: (state, action) => {
            state.formName = action.payload;
        }
    }
})

export const { setForm } = formSlice.actions
export default formSlice.reducer