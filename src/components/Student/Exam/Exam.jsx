import React from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetChapters,
  fetchGetExamQuestions,
  fetchGetSubjects,
  fetchGetTestQuestions,
} from "../../../redux/slices/study";

import ExamOne from "./ExamOne.jsx";

const Exam = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { subjects, chapters, exam } = useSelector((state) => state.study);

  const [selectSubject, setSelectSubject] = React.useState();
  const [selectChapter, setSelectChapter] = React.useState();
  const [selected, setSelected] = React.useState('A');

  React.useEffect(() => {
    dispatch(fetchGetSubjects());
    dispatch(fetchGetChapters());
    dispatch(fetchGetExamQuestions());
  }, []);

  const subjectOptions = [
    {
      value: "0",
      text: "Пәнді таңдаңыз",
      id: "",
    },
    {
      value: "1",
      text: "Алгоритмдер, деректер құрылымы және программалау",
      id: "663f1fb111badac5265554cc",
    },
  ];

  const chapterOptions = [
    {
      value: "0",
      text: "Бөлімді таңдаңыз",
      id: "",
    },
  ];

  let index = 1;

  if (subjects) {
    subjects?.items.forEach((subject, i) => {
      if (subject?._id == subjectOptions[selectSubject]?.id) {
        subject.chapters?.forEach((chapter, i) => {
          if (chapter?.class == userData.classroom?.name) {
            chapterOptions.push({
              value: index,
              text: chapter?.name,
              id: chapter?._id,
            });
            index++;
          }
        });
      }
    });
  }

  let sortedExam = [];

  let testIndex = 1;

  if (exam) {
    exam.items.forEach((question, i) => {
      if (
        question.chapter &&
        question.chapter ==
          (chapterOptions &&
            chapterOptions[selectChapter] &&
            chapterOptions[selectChapter].id)
      ) {
        sortedExam.push({
          ...question,
          index,
        });
        index++;
      }
    });
  }

  return (
    <>
      <Container
        fluid
        style={{
          background: "white",
        }}
      >
        <Container>
          <br />
          <h3>Экзамен тапсыру</h3>
          <br />
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
                <Col md={6}>
                  <select
                    selected={selectSubject}
                    onChange={(event) => setSelectSubject(event.target.value)}
                    className="form-control"
                  >
                    {subjectOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col md={6}>
                  <select
                    selected={selectChapter}
                    onChange={(event) => setSelectChapter(event.target.value)}
                    className="form-control"
                  >
                    {chapterOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
              <br />
              <hr />

              <h5>
                {subjectOptions[selectSubject]?.text}&nbsp;•&nbsp;"
                {chapterOptions[selectChapter]?.text}" бөлімі бойынша экзамен
                тапсыру
              </h5>

              {sortedExam?.map((question, i) => (
                <Col key={i} md={12}>
                  <p style={{ fontSize: "18px" }}>
                    {i + 1}. {question.question}
                  </p>
                    <ExamOne subject_id={subjectOptions[selectSubject]?.id} question={question}/>
                  <br />
                  <hr />
                </Col>
              ))}
            </Card.Body>
          </Card>
        </Container>
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default Exam;
