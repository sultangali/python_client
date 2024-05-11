import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './slices/user.js'
import { studyReducer } from './slices/study.js'
import { all_studentsReducer } from './slices/all_students.js'
import { all_employeesReducer } from './slices/all_employees.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        study: studyReducer,
        student: all_studentsReducer,
        employee: all_employeesReducer
    }
})

export default store