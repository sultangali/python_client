import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { fetchAllQuestions } from "../../../redux/slices/study";
import { selectIsAuth } from "../../../redux/slices/user";
import Question from "./Question.jsx";

const Questions = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)
  const userData = useSelector((state) => state.user.data)

  const { questions } = useSelector((state) => state.study);

  

  React.useEffect(() => {
    dispatch(fetchAllQuestions());
  }, []);

  console.log(questions && questions)

  console.log('is auth', isAuth)




  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <br />  
        <Container>
          <h3>Менің сұрақтарым</h3>
          <br />
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
                {questions &&
                  questions.items &&
                  questions.items.map((item, i) => (
                    item && item.student 
                        && item.student._id == (userData && userData._id) &&
                    <Question
                    i={i}
                    key={i}
                      id={item && item._id}
                      question={item && item.question}
                      answer={item && item.answer}
                      teacher={item && item.teacher}
                      createdAt={item && item.createdAt}
                      updatedAt={item && item.updatedAt}
                    />
                  ))}
              </Row>
              <Row>
                <Col className="col-12 d-flex column justify-content-end">
                    <Button 
                        onClick={() => window.location
                            .assign('http://localhost:3000/student-profile')}
                        style={{
                            margin: '24px 0px 0px 0px'
                        }}
                        className="btn btn-primary outlined-btn">
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
