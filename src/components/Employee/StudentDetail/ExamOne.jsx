import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllExamAnswers, fetchCheckExamAnswer } from "../../../redux/slices/study";

const ExamOne = ({ subject_id, exam_answer }) => {
  const { student_id } = useParams();

  const dispatch = useDispatch();

  const [grade, setGrade] = React.useState(exam_answer?.grade);

  let truth = false;

  const sendAnswer = async () => {
     await dispatch(fetchCheckExamAnswer({
        exam_answer_id: exam_answer?._id,
        grade: grade && grade
    }))
    alert(`${exam_answer?.answer} жауабына қойған ${grade && grade} балл баға сәтті жіберілді`)
    window.location.assign(
      `http://localhost:3000/student-detail-for-teacher/${student_id}`
    );
  };

  const ex_answers = [];

  //   exam_answers && exam_answers.items && exam_answers.items.forEach((exam_answer) => {
  //     if (exam_answer?.exam == question?._id) {
  //         truth = true
  //         ex_answers.push(exam_answer)
  //     }
  //   })

  return (
    <>
      <Row>
        <Col
          md={8}
          className="d-flex row align-items-end"
          style={{
            margin: "12px 0 24px 0",
          }}
        >
          <hr />
<p>Жазған жауабы: {exam_answer?.answer}</p>
        </Col>
        <Col md={4} className="d-flex column justify-content-end">
          <Row>
            <Col md={6}>
              {" "}
              <input
                type="text"
                className="form-control"
                value={ grade}
                onChange={(event) => setGrade(event.target.value)}
                placeholder={grade?  grade : "Бағаны енгізіңіз"}
              />
            </Col>
            <Col md={6}>
              <Button
                onClick={() => {
                  sendAnswer();
                  
                }}
                disabled={truth}
                className="btn btn-primary signup shadow"
                style={{borderRadius: '4px'}}
              >
                {"Баға қою"}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ExamOne;
