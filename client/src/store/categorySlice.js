import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState:{
        categoryName: null,
    },
    reducers: {
        setCategory: (state, action) => {
            state.categoryName = action.payload;
        }
    }
})

export const { setCategory } = categorySlice.actions
export default categorySlice.reducer