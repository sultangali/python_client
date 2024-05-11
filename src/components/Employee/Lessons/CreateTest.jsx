import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateTestQuestion } from "../../../redux/slices/study";

const CreateTest = ({ class_id, chapter_id, lesson_id }) => {

  console.log(chapter_id)

    const dispatch = useDispatch()

    const [testQuestion, setTestQuestion] = React.useState()
    const [examQuestion, setExamQuestion] = React.useState()
    const [A, setA] = React.useState()
    const [B, setB] = React.useState()
    const [C, setC] = React.useState()
    const [D, setD] = React.useState()
    const [correct, setCorrect] = React.useState()
    
    console.table('testQuestion', testQuestion, {
        A: A,
        B: B,
        C: C,
        D: D
    }, 'correct', correct)

    const createTestQuestion = () => {
        dispatch(fetchCreateTestQuestion({
            question: testQuestion,
            A, B, C, D,
            correct,
            lesson: lesson_id,
            chapter: chapter_id,
            class_id: class_id
        }))
        alert('Tест сұрағы сәтті құрылды')
    }


  const testOptions = [
    {
      value: "0",
      text: "Дұрыс жауабын таңдаңыз",
    },
    {
      value: "A",
      text: "A",
    },
    {
      value: "B",
      text: "B",
    },
    {
      value: "C",
      text: "C",
    },
    {
      value: "D",
      text: "D",
    },
  ];

  return (
    <>
      <br />
      <Card className="static-card profile-access-denied-card">
        <Card.Body>
          <Row>
            <h5 style={{ color: "#7209B7" }}>
              Ағымдағы сабақ бойынша төмендегі форма арқылы тест сұрағын құра аласыздар
            </h5>
            
            <Col
              lg={12}
              xs={12}
              className="d-flex column"
              style={{ margin: "12px 0" }}
            >
              <textarea
                onChange={event => setTestQuestion(event.target.value)}
                rows="4"
                className="flex-fill form-control"
                placeholder="Сұрақ мәтінін жазыңыз"
              ></textarea>
            </Col>
            <Col className="col-12">
              <br />
            </Col>
            <Col
              lg={3}
              className="d-flex column justify-content-start align-items-center"
            >
              <h5>A)</h5>&nbsp;
              <input 
                onChange={event => setA(event.target.value)}
                type="text" className="variant-choose-input" />
            </Col>
            <Col
              lg={3}
              className="d-flex column justify-content-start align-items-center"
            >
              <h5>B)</h5>&nbsp;
              <input
              onChange={event => setB(event.target.value)}
              type="text" className="variant-choose-input" />
            </Col>
            <Col
              lg={3}
              className="d-flex column justify-content-start align-items-center"
            >
              <h5>C)</h5>&nbsp;
              <input 
                onChange={event => setC(event.target.value)}
              type="text" className="variant-choose-input" />
            </Col>
            <Col
              lg={3}
              className="d-flex column justify-content-start align-items-center"
            >
              <h5>D)</h5>&nbsp;
              <input 
                onChange={event => setD(event.target.value)}
            type="text" className="variant-choose-input" />
            </Col>
            <Col className="col-12">
              <br />
            </Col>
            <Col lg={6} xs={12}>
              <Row className="d-flex column align-items-center">
                <Col className="col-auto">
                  <span
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Дұрыс жауабы:&nbsp;
                  </span>
                </Col>
                <Col lg={6}>
                  <select className="form-control" onChange={event => setCorrect(event.target.value)}>
                    {testOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Col>
            <Col lg={12} xs={12}>
              <br />
            </Col>
            <Col lg={12} xs={12} className="d-flex column justify-content-end">
              <Button className="btn btn-primary signup shadow-sm" 
              style={{
                borderRadius: '4px'
              }}
              onClick={() => createTestQuestion()}
              disabled={
                !(testQuestion && A && B && C && D && correct)
              }>
                Тест сұрағын құру
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateTest;
