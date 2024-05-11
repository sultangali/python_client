import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchAnswerQuestion } from "../../../redux/slices/study";
import { fetchAuthMe } from "../../../redux/slices/user";

const Question = ({
  i,
  id,
  question,
  student,
  createdAt
}) => {

    const dispatch = useDispatch()

    const [answer, setAnswer] = React.useState()

    console.log(answer && answer)

    const answerForQuestion = () => {
        dispatch(fetchAnswerQuestion({
            questionId: id,
            answer: answer && answer
        }))
        dispatch(fetchAuthMe())
        window.location.assign('http://localhost:3000/employee-profile')
    }

  return (
    <>
      <Col lg={12} xs={12} style={{ margin: "12px 0" }}>
        <Card className="static-card profile-access-denied-card">
          <h5 style={{ color: "#7209B7" }}>Сұрақ</h5>
          <p style={{ color: "#7209B7" }}>
            Кімнен: &nbsp;
            <span style={{ color: "black" }}>
              {student && student.lastname} &nbsp;
              {student && student.firstname}&nbsp;
              {student && student.patronymic}&nbsp;
            </span>
          </p>

          <Card.Body style={{ padding: "6px 0px 6px 24px" }}>
            <Row>
              <Col
                lg={12}
                xs={12}
                style={{
                  border: "1px solid #7209B7",
                  borderRadius: "12.5px",
                  padding: "12px 6px",
                }}
                className="d-flex row justify-content-start"
              >
                <p style={{ color: "#7209B7" }}>
                  Сұрақ:&nbsp;
                  <span style={{ color: "black" }}>{question}</span>
                </p>
                <h6 style={{ color: "#7209B7" }}>
                  {new Date(Date(createdAt))
                    .toISOString()
                    .substring(0, 16)
                    .replace("T", " ")}
                </h6>
              </Col>

              <Col
                lg={12}
                xs={12}
                style={{
                  padding: "0",
                  marginTop: "24px",
                }}
                className="d-flex row justify-content-start"
              >
                <hr />

                <br />
                <input
                onChange={(event) => setAnswer(event.target.value)}
                  style={{
                    border: "1px solid #7209B7",
                    borderRadius: "12.5px",
                    margin: "8px 0 24px 0",
                  }}
                  type="text"
                  className="form-control"
                  placeholder="Жауап жазыңыз"
                />
              </Col>
              <Col lg={12} className="d-flex column justify-content-end">
                <Button 
                    disabled={!answer} 
                    onClick={() => answerForQuestion()}
                    className="btn btn-primary signup shadow">
                  Жіберу
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default Question;
