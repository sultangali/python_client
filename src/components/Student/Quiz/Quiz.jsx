import React from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetChapters,
  fetchGetSubjects,
  fetchGetTestQuestions,
} from "../../../redux/slices/study";

import QuizOne from "./QuizOne.jsx";

const Quiz = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { subjects, chapters, test } = useSelector((state) => state.study);

  const [selectSubject, setSelectSubject] = React.useState();
  const [selectChapter, setSelectChapter] = React.useState();
  const [selected, setSelected] = React.useState('A');

  React.useEffect(() => {
    dispatch(fetchGetSubjects());
    dispatch(fetchGetChapters());
    dispatch(fetchGetTestQuestions());
  }, []);

  const subjectOptions = [
    {
      value: "0",
      text: "Пәнді таңдаңыз",
      id: "",
    },
    {
      value: "1",
      text: "Қазақ тілі",
      id: "640644875665304b307c91af",
    },
    {
      value: "2",
      text: "Математика",
      id: "640644b15665304b307c91b1",
    },
    {
      value: "3",
      text: "Қазақстан тарихы",
      id: "640644c85665304b307c91b3",
    },
    {
      value: "4",
      text: "Ағылшын",
      id: "640644de5665304b307c91b5",
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

  let sortedTests = [];

  let testIndex = 1;

  if (test) {
    test.items.forEach((question, i) => {
      if (
        question.chapter &&
        question.chapter ==
          (chapterOptions &&
            chapterOptions[selectChapter] &&
            chapterOptions[selectChapter].id)
      ) {
        sortedTests.push({
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
          <h3>Тест тапсыру</h3>
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
                {chapterOptions[selectChapter]?.text}" бөлімі бойынша тест
                тапсыру
              </h5>

              {sortedTests?.map((question, i) => (
                <Col key={i} md={12}>
                  <p style={{ fontSize: "18px" }}>
                    {i + 1}. {question.question}
                  </p>
                    <QuizOne subject_id={subjectOptions[selectSubject]?.id} question={question}/>
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

export default Quiz;
