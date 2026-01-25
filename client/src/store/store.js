import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import formReducer from './formSlice'

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        form: formReducer
    },
})