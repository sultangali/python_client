import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizAnswers, fetchQuizAnswer } from "../../../redux/slices/study";

const QuizOne = ({ subject_id, question }) => {
  
    const dispatch = useDispatch()

    const [selected, setSelected] = React.useState("");

    const {quiz_answers} = useSelector(state => state.study)

    const userData = useSelector(state => state.user.data)

    let truth = false

    React.useEffect(() => {
        dispatch(fetchAllQuizAnswers())
    }, [])

  const sendAnswer = async () => {
     await dispatch(fetchQuizAnswer({
        subject_id,
        quiz_id: question?._id,
        answer: selected && selected
    }))
    window.location.assign('http://localhost:3000/pass-quiz')
  }

  console.log(quiz_answers && quiz_answers)


 quiz_answers && quiz_answers.items && quiz_answers.items.forEach((quiz_answer) => {
    if (quiz_answer?.student?._id == (userData?._id) && quiz_answer?.quiz == question?._id ) {
        truth = true
    }
  })

  return (
    <>
      <Row>
        <Col
          md={12}
          className="d-flex row align-items-end"
          style={{
            margin: "12px 0",
          }}
        >
          <Button 
        onClick={() => setSelected('A')}
          className="btn btn-primary text-start quiz-question-variant-btn">
            A)&nbsp;{question.A}
          </Button>
        </Col>
        <Col
          md={12}
          className="d-flex row align-items-end"
          style={{
            margin: "12px 0",
          }}
        >
          <Button 
          onClick={() => setSelected('B')}
          className="btn btn-primary text-start quiz-question-variant-btn">
            B)&nbsp;{question.B}
          </Button>
        </Col>
        <Col
          md={12}
          className="d-flex row align-items-end"
          style={{
            margin: "12px 0",
          }}
        >
          <Button 
          onClick={() => setSelected('C')}
          className="btn btn-primary text-start quiz-question-variant-btn">
            C)&nbsp;{question.C}
          </Button>
        </Col>
        <Col
          md={12}
          className="d-flex row align-items-end"
          style={{
            margin: "12px 0",
          }}
        >
          <Button 
          onClick={() => setSelected('D')}
          className="btn btn-primary text-start quiz-question-variant-btn">
            D)&nbsp;{question.D}
          </Button>
        </Col>
        <Col md={12} className="d-flex column justify-content-end">
          <Button 
          onClick={() => {sendAnswer()
            alert(`${question?.question} сұрағына '${selected && selected}' жауабы сәтті жіберілді`)
        }}
          disabled={
            truth
          } className="btn btn-primary signup shadow">{selected ? `${selected})  жауабын жіберу` : 'Бір жауапты таңдаңыз'}</Button>
        </Col>
      </Row>
    </>
  );
};

export default QuizOne;
