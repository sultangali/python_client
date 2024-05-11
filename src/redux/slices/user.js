import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchLoginStudent = createAsyncThunk('auth/fetchLoginStudent', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/user/student/auth/login', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchRegisterStudent = createAsyncThunk('auth/fetchRegisterStudent', async (params, {rejectWithValue}) => {
    try {
      const  response  = await axios.post('/api/user/student/auth/registration', params)
        return response.data  
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }    
})

export const fetchUpdateStudent= createAsyncThunk('auth/fetchUpdateStudent', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/user/student/me/update', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

/////////////////////////////////////////////////////

export const fetchLoginEmployee = createAsyncThunk('auth/fetchLoginEmployee', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/user/employee/auth/login', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchRegisterEmployee = createAsyncThunk('auth/fetchRegisterEmployee', async (params, {rejectWithValue}) => {
    try {
      const  response  = await axios.post('/api/user/employee/auth/registration', params)
        return response.data  
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }    
})

export const fetchUpdateEmployee= createAsyncThunk('auth/fetchUpdateEmployee', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/user/employee/me/update', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})
//////////////////////////////////////////////////////////

export const fetchAttending= createAsyncThunk('auth/fetchAttending', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('api/user/student/me/attending', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

export const fetchAuthMe= createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/api/user/me')    
    return data
})





const initialState = {
    all_students: {
        items: [],
        status: 'loading',
        error: '' 
    } ,
    data: null,
    status: 'loading',
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
        }
    },
    extraReducers: {

        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },


        [fetchLoginStudent.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchLoginStudent.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchLoginStudent.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

        [fetchLoginEmployee.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchLoginEmployee.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchLoginEmployee.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

        [fetchRegisterStudent.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchRegisterStudent.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            
        },
        [fetchRegisterStudent.rejected]: (state, action) => {
            
            state.status = 'error'
            state.error = action.payload
        },

        [fetchRegisterEmployee.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchRegisterEmployee.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
            
        },
        [fetchRegisterEmployee.rejected]: (state, action) => {
            
            state.status = 'error'
            state.error = action.payload
        },


        [fetchUpdateStudent.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdateStudent.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateStudent.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },


        [fetchAttending.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchAttending.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAttending.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },


        [fetchUpdateEmployee.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdateEmployee.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdateEmployee.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

    }
})

export const selectIsAuth = (state) => Boolean(state.user.data)

export const userReducer = userSlice.reducer

export const { logout } = userSlice.actions