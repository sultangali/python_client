import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllExamAnswers, fetchAllQuizAnswers, fetchExamAnswer, fetchQuizAnswer } from "../../../redux/slices/study";

const ExamOne = ({ subject_id, question }) => {
  
    const dispatch = useDispatch()

    const [answer, setAnswer] = React.useState("");

    const {exam_answers} = useSelector(state => state.study)

    const userData = useSelector(state => state.user.data)

    let truth = false

    React.useEffect(() => {
        dispatch(fetchAllExamAnswers())
    }, [])

  const sendAnswer = async () => {
     await dispatch(fetchExamAnswer({
        subject_id,
        exam_id: question?._id,
        answer: answer && answer
    }))
    window.location.assign('http://localhost:3000/pass-exam')
  }

  console.log('exam_answers', exam_answers && exam_answers)


  exam_answers && exam_answers.items && exam_answers.items.forEach((exam_answer) => {
    if (exam_answer?.student?._id == (userData?._id) && exam_answer?.exam == question?._id) {
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
            margin: "12px 0 24px 0",
          }}
        >
          <input type="text" className="form-control" onChange={event => setAnswer(event.target.value)} placeholder="Жауап жазыңыз" />
        </Col>
        <Col md={12} className="d-flex column justify-content-end">
          <Button 
          onClick={() => {sendAnswer()
            alert(`${question?.question} сұрағына '${answer && answer}' жауабы сәтті жіберілді`)
        }}
          disabled={
            truth && truth
          } className="btn btn-primary signup shadow" style={{borderRadius: '4px'}}>{'Жауапты жіберу'}</Button>
        </Col>
      </Row>
    </>
  );
};

export default ExamOne;
