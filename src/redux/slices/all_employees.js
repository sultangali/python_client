import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

/////////////////////////////////////////////////////

export const fetchGetAllEmployees= createAsyncThunk('auth/fetchGetAllEmployees', async () => {
    const { data } = await axios.get('/api/user/all-employees')
    return data
})

const initialState = {
    employees: {
        items: [],
        status: 'loading',
        error: ''
    }

}

const all_employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
    },
    extraReducers: {

        [fetchGetAllEmployees.pending]: (state) => {
            state.employees.items = []
            state.employees.status = 'loading'
            state.employees.error = ''
        },
        [fetchGetAllEmployees.fulfilled]: (state, action) => {
            state.employees.status = 'loaded'
            state.employees.items = action.payload
            
        },
        [fetchGetAllEmployees.rejected]: (state, action) => {
            state.employees.status = 'error'
            state.employees.items = action.payload
        },


    }
})

export const all_employeesReducer = all_employeesSlice.reducer

