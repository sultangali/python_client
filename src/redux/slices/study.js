import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios.js";

export const fetchCreateClassroom = createAsyncThunk(
  "auth/fetchCreateClassroom",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/study/classroom", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRemoveClassroom = createAsyncThunk(
  "auth/fetchRemoveClassroom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/study/classroom/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllClassroom = createAsyncThunk(
  "auth/fetchAllClassroom",
  async () => {
    const { data } = await axios.get(`/api/study/classroom/all`);
    return data;
  }
);

/////////////////////////////////////////////////////

export const fetchSendMessage = createAsyncThunk(
  "auth/fetchSendMessage",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/study/send-message", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllQuestions = createAsyncThunk(
  "auth/fetchAllQuestions",
  async () => {
    const { data } = await axios.get(`/api/study/all-questions`);
    return data;
  }
);

export const fetchAnswerQuestion = createAsyncThunk(
  "auth/fetchAnswerQuestion",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/study/answer-for-question`,
        params
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

///////////////////////////////////////////////////////////

export const fetchCreateChapter = createAsyncThunk(
  "auth/fetchCreateChapter",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/study/create-chapter", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetChapters = createAsyncThunk(
  "auth/fetchGetChapters",
  async () => {
    const { data } = await axios.get("/api/study/all-chapters");
    return data;
  }
);

export const fetchCreateLesson = createAsyncThunk(
  "auth/fetchCreateLesson",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/study/create-lesson", params);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetLessons = createAsyncThunk(
  "auth/fetchGetLessons",
  async () => {
    const { data } = await axios.get("/api/study/all-lessons");
    return data;
  }
);

////////////////////////////////////////////////

export const fetchCreateTestQuestion = createAsyncThunk(
  "auth/fetchCreateTestQuestion",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/study/create-test-question",
        params
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetTestQuestions = createAsyncThunk(
  "auth/fetchGetTestQuestions",
  async () => {
    const { data } = await axios.get("/api/study/all-test-questions");
    return data;
  }
);

///////////////////////////////////////////////

export const fetchCreateExamQuestion = createAsyncThunk(
  "auth/fetchCreateExamQuestion",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/study/create-exam-question",
        params
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetExamQuestions = createAsyncThunk(
  "auth/fetchGetExamQuestions",
  async () => {
    const { data } = await axios.get("/api/study/all-exam-questions");
    return data;
  }
);

/////////////////////////////////////////////////

export const fetchGetSubjects = createAsyncThunk(
  "auth/fetchGetSubjects",
  async () => {
    const { data } = await axios.get("/api/study/all-subjects");
    return data;
  }
);

//////////////////////////////////////////////////

export const fetchQuizAnswer = createAsyncThunk(
  "auth/fetchQuizAnswer",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/study/quiz-answer",
        params
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllQuizAnswers = createAsyncThunk(
  "auth/fetchAllQuizAnswers",
  async () => {
    const { data } = await axios.get("/api/study/all-quiz-answers");
    return data;
  }
);

/////////////////////////////////////////////////////

export const fetchExamAnswer = createAsyncThunk(
"auth/fetchExamAnswer",
async (params, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      "/api/study/exam-answer",
      params
    );
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
}
);

export const fetchCheckExamAnswer = createAsyncThunk(
  "auth/fetchCheckExamAnswer",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "/api/study/exam-answer-grade",
        params
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
  );

export const fetchAllExamAnswers = createAsyncThunk(
"auth/fetchAllExamAnswers",
async () => {
  const { data } = await axios.get("/api/study/all-exam-answers");
  return data;
}
);

const initialState = {
  classrooms: {
    items: [],
    status: "loading",
    error: "",
  },
  questions: {
    items: [],
    status: "loading",
    error: "",
  },
  subjects: {
    items: [],
    status: "loading",
    error: "",
  },
  chapters: {
    items: [],
    status: "loading",
    error: "",
  },
  lessons: {
    items: [],
    status: "loading",
    error: "",
  },
  test: {
    items: [],
    status: "loading",
    error: "",
  },
  exam: {
    items: [],
    status: "loading",
    error: "",
  },
  quiz_answers: {
    items: [],
    status: "loading",
    error: "",
  },
  exam_answers: {
    items: [],
    status: "loading",
    error: "",
  },
};

const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllClassroom.pending]: (state) => {
      state.classrooms.status = "loading";
      state.classrooms.items = [];
    },
    [fetchAllClassroom.fulfilled]: (state, action) => {
      state.classrooms.status = "loaded";
      state.classrooms.items = action.payload;
    },
    [fetchAllClassroom.rejected]: (state) => {
      state.classrooms.status = "error";
      state.classrooms.items = [];
    },

    [fetchCreateClassroom.pending]: (state) => {
      state.classrooms.status = "loading";
      state.classrooms.items = [];
    },
    [fetchCreateClassroom.fulfilled]: (state, action) => {
      state.classrooms.status = "loaded";
      state.classrooms.items = action.payload;
    },
    [fetchCreateClassroom.rejected]: (state) => {
      state.classrooms.status = "error";
      state.classrooms.items = [];
    },

    ///////////////////////////////////////////////

    [fetchQuizAnswer.pending]: (state) => {
      state.quiz_answers.status = "loading";
      state.quiz_answers.items = [];
    },
    [fetchQuizAnswer.fulfilled]: (state, action) => {
      state.quiz_answers.status = "loaded";
      state.quiz_answers.items = action.payload;
    },
    [fetchQuizAnswer.rejected]: (state) => {
      state.quiz_answers.status = "error";
      state.quiz_answers.items = [];
    },


    [fetchAllQuizAnswers.pending]: (state) => {
      state.quiz_answers.status = "loading";
      state.quiz_answers.items = [];
    },
    [fetchAllQuizAnswers.fulfilled]: (state, action) => {
      state.quiz_answers.status = "loaded";
      state.quiz_answers.items = action.payload;
    },
    [fetchAllQuizAnswers.rejected]: (state) => {
      state.quiz_answers.status = "error";
      state.quiz_answers.items = [];
    },



    [fetchExamAnswer.pending]: (state) => {
      state.exam_answers.status = "loading";
      state.exam_answers.items = [];
    },
    [fetchExamAnswer.fulfilled]: (state, action) => {
      state.exam_answers.status = "loaded";
      state.exam_answers.items = action.payload;
    },
    [fetchExamAnswer.rejected]: (state) => {
      state.exam_answers.status = "error";
      state.exam_answers.items = [];
    },

    [fetchCheckExamAnswer.pending]: (state) => {
      state.exam_answers.status = "loading";
      state.exam_answers.items = [];
    },
    [fetchCheckExamAnswer.fulfilled]: (state, action) => {
      state.exam_answers.status = "loaded";
      state.exam_answers.items = action.payload;
    },
    [fetchCheckExamAnswer.rejected]: (state) => {
      state.exam_answers.status = "error";
      state.exam_answers.items = [];
    },


    [fetchAllExamAnswers.pending]: (state) => {
      state.exam_answers.status = "loading";
      state.exam_answers.items = [];
    },
    [fetchAllExamAnswers.fulfilled]: (state, action) => {
      state.exam_answers.status = "loaded";
      state.exam_answers.items = action.payload;
    },
    [fetchAllExamAnswers.rejected]: (state) => {
      state.exam_answers.status = "error";
      state.exam_answers.items = [];
    },



////////////////////////////////////////////////////////

    [fetchRemoveClassroom.pending]: (state, action) => {
      state.classrooms.status = "loading";
      state.classrooms.items = state.classrooms.items.filter(
        (obj) => obj._id != action.meta.arg
      );
    },

    [fetchRemoveClassroom.rejected]: (state, action) => {
      state.classrooms.status = "error";
      state.classrooms.items = action.payload;
    },

    //////////////////////////////////////////////

    [fetchAllQuestions.pending]: (state) => {
      state.questions.status = "loading";
      state.questions.items = [];
    },
    [fetchAllQuestions.fulfilled]: (state, action) => {
      state.questions.status = "loaded";
      state.questions.items = action.payload;
    },
    [fetchAllQuestions.rejected]: (state) => {
      state.questions.status = "error";
      state.questions.items = [];
    },

    [fetchSendMessage.pending]: (state) => {
      state.questions.status = "loading";
      state.questions.items = [];
    },
    [fetchSendMessage.fulfilled]: (state, action) => {
      state.questions.status = "loaded";
      state.questions.items = action.payload;
    },
    [fetchSendMessage.rejected]: (state) => {
      state.questions.status = "error";
      state.questions.items = [];
    },

    [fetchAnswerQuestion.pending]: (state) => {
      state.questions.status = "loading";
      state.questions.items = [];
    },
    [fetchAnswerQuestion.fulfilled]: (state, action) => {
      state.questions.status = "loaded";
      state.questions.items = action.payload;
    },
    [fetchAnswerQuestion.rejected]: (state) => {
      state.questions.status = "error";
      state.questions.items = [];
    },
    /////////////////////////////////////////////


    [fetchGetSubjects.pending]: (state) => {
      state.subjects.status = "loading";
      state.subjects.items = [];
    },
    [fetchGetSubjects.fulfilled]: (state, action) => {
      state.subjects.status = "loaded";
      state.subjects.items = action.payload;
    },
    [fetchGetSubjects.rejected]: (state) => {
      state.subjects.status = "error";
      state.subjects.items = [];
    },

    ///////////////////////////////////////////////
    [fetchCreateChapter.pending]: (state) => {
      state.chapters.status = "loading";
      state.chapters.items = [];
    },
    [fetchCreateChapter.fulfilled]: (state, action) => {
      state.chapters.status = "loaded";
      state.chapters.items = action.payload;
    },
    [fetchCreateChapter.rejected]: (state) => {
      state.chapters.status = "error";
      state.chapters.items = [];
    },

    [fetchGetChapters.pending]: (state) => {
      state.chapters.status = "loading";
      state.chapters.items = [];
    },
    [fetchGetChapters.fulfilled]: (state, action) => {
      state.chapters.status = "loaded";
      state.chapters.items = action.payload;
    },
    [fetchGetChapters.rejected]: (state) => {
      state.chapters.status = "error";
      state.chapters.items = [];
    },
    //////////////////////////////////////////////////

    [fetchCreateLesson.pending]: (state) => {
      state.lessons.status = "loading";
      state.lessons.items = [];
    },
    [fetchCreateLesson.fulfilled]: (state, action) => {
      state.lessons.status = "loaded";
      state.lessons.items = action.payload;
    },
    [fetchCreateLesson.rejected]: (state) => {
      state.lessons.status = "error";
      state.lessons.items = [];
    },

    [fetchGetLessons.pending]: (state) => {
      state.lessons.status = "loading";
      state.lessons.items = [];
    },
    [fetchGetLessons.fulfilled]: (state, action) => {
      state.lessons.status = "loaded";
      state.lessons.items = action.payload;
    },
    [fetchGetLessons.rejected]: (state) => {
      state.lessons.status = "error";
      state.lessons.items = [];
    },

    //////////////////////////////////////////////////

    [fetchCreateTestQuestion.pending]: (state) => {
      state.test.status = "loading";
      state.test.items = [];
    },
    [fetchCreateTestQuestion.fulfilled]: (state, action) => {
      state.test.status = "loaded";
      state.test.items = action.payload;
    },
    [fetchCreateTestQuestion.rejected]: (state) => {
      state.test.status = "error";
      state.test.items = [];
    },

    [fetchGetTestQuestions.pending]: (state) => {
      state.test.status = "loading";
      state.test.items = [];
    },
    [fetchGetTestQuestions.fulfilled]: (state, action) => {
      state.test.status = "loaded";
      state.test.items = action.payload;
    },
    [fetchGetTestQuestions.rejected]: (state) => {
      state.test.status = "error";
      state.test.items = [];
    },

    ///////////////////////////////////////////////////

    [fetchCreateExamQuestion.pending]: (state) => {
      state.exam.status = "loading";
      state.exam.items = [];
    },
    [fetchCreateExamQuestion.fulfilled]: (state, action) => {
      state.exam.status = "loaded";
      state.exam.items = action.payload;
    },
    [fetchCreateExamQuestion.rejected]: (state) => {
      state.exam.status = "error";
      state.exam.items = [];
    },

    [fetchGetExamQuestions.pending]: (state) => {
      state.exam.status = "loading";
      state.exam.items = [];
    },
    [fetchGetExamQuestions.fulfilled]: (state, action) => {
      state.exam.status = "loaded";
      state.exam.items = action.payload;
    },
    [fetchGetExamQuestions.rejected]: (state) => {
      state.exam.status = "error";
      state.exam.items = [];
    },
  },
});

export const studyReducer = studySlice.reducer;
