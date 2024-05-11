import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuestions } from "../../../redux/slices/study";
import Question from "./Question.jsx";

const Questions = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { questions } = useSelector((state) => state.study);

  React.useEffect(() => {
    dispatch(fetchAllQuestions());
  }, []);

  console.log(questions && questions);

  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <Container>
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <h4>Жауап беру</h4>
              <Row>
                {questions && questions.items ? (
                  questions.items.map(
                    (item, i) =>
                      item &&
                      item.student &&
                      item.teacher._id == (userData && userData._id) &&
                      item &&
                      item.status == "opened" && (
                        <Question
                          i={i}
                          key={i}
                          id={item && item._id}
                          question={item && item.question}
                          answer={item && item.answer}
                          student={item && item.student}
                          createdAt={item && item.createdAt}
                          updatedAt={item && item.updatedAt}
                        />
                      )
                  )
                ) : (
                  <>
                    <br />
                    <h5>Әзірге оқушылардан сұрақтар жоқ</h5>{" "}
                  </>
                )}
              </Row>

              <Row>
                <Col className="col-12 d-flex column justify-content-end">
                  <Button
                    onClick={() =>
                      window.location.assign(
                        "http://localhost:3000/employee-profile"
                      )
                    }
                    style={{
                      margin: "24px 0px 0px 0px",
                    }}
                    className="btn btn-primary outlined-btn"
                  >
                    Артқа қайту
                  </Button>
                </Col>
              </Row>
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

export default Questions;
