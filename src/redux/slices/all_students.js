import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

/////////////////////////////////////////////////////

export const fetchGetAllStudents= createAsyncThunk('auth/fetchGetAllStudents', async () => {
    const { data } = await axios.get('/api/user/all-students')  
    return data
})

export const fetchSetStudentStatus= createAsyncThunk('auth/fetchSetStudentStatus', async (params, {rejectWithValue}) => {
    try {
        const  response = await axios.patch('api/user/student-status', params)
          return response.data

      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

export const fetchSetStudentClassroom = createAsyncThunk('auth/fetchSetStudentClassroom', async (params, {rejectWithValue}) => {
    try {
        const  response = await axios.patch('api/user/student-classroom', params)
          return response.data

      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

export const fetchDeleteStudentFromClassroom = createAsyncThunk('auth/fetchSetStudentClassroom', async (params, {rejectWithValue}) => {
    try {
        const  response = await axios.patch('api/user/delete-student-classroom', params)
          return response.data

      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

const initialState = {
    students: {
        items: [],
        status: 'loading',
        error: ''
    }

}

const all_studentsSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
    },
    extraReducers: {

        [fetchGetAllStudents.pending]: (state) => {
            state.students.items = []
            state.students.status = 'loading'
            state.students.error = ''
        },
        [fetchGetAllStudents.fulfilled]: (state, action) => {
            state.students.status = 'loaded'
            state.students.items = action.payload
            
        },
        [fetchGetAllStudents.rejected]: (state, action) => {
            state.students.status = 'error'
            state.students.items = action.payload
        },

        [fetchSetStudentStatus.pending]: (state, action) => {
            console.log('state.students => ', state.students)
            console.log('action.meta.arg', action.meta.arg)
            state.students.items = state.students.items.filter(
                (obj) => obj._id != action.meta.arg
            );
        },
        
        [fetchSetStudentStatus.rejected]: (state, action) => {
            state.students.status = 'error'
            state.students.error = action.payload
        },

        [fetchSetStudentClassroom.pending]: (state, action) => {
            state.students.items = state.students.items.filter(
                (obj) => obj._id != action.meta.arg
            );
        },
        
        [fetchSetStudentClassroom.rejected]: (state, action) => {
            state.students.status = 'error'
            state.students.error = action.payload
        },


        [fetchDeleteStudentFromClassroom.pending]: (state, action) => {
            state.students.items = state.students.items.filter(
                (obj) => obj._id != action.meta.arg
            );
        },
        
        [fetchDeleteStudentFromClassroom.rejected]: (state, action) => {
            state.students.status = 'error'
            state.students.error = action.payload
        }
    }
})

export const all_studentsReducer = all_studentsSlice.reducer

