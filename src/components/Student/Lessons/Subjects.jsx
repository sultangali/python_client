import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetSubjects } from "../../../redux/slices/study.js";
import bookImg from '../../../images/book.png'

const Subjects = () => {
  const dispatch = useDispatch();

  const { subjects } = useSelector((state) => state.study);

  React.useEffect(() => {
    dispatch(fetchGetSubjects());
  }, []);

  const colors = ['#7209B7', '#DC3912', '#FF9900', '#109618']

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "white",
        }}
      >
        <br />
        <Container>
          <h3>Барлық сабақтар</h3>
          
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
                {subjects?.items.map((subject, i) => (
                  <Col md={3} className="d-flex column justify-content-center" style={{margin: '24px 0'}}>
                    <Button
                      className="btn btn-primary subject-btn-card"
                      style={{
                        padding: '12px 24px',
                        width: '400px',
                        height: '400px',
                        backgroundImage: 'url(' + bookImg + ')',
                        border: '2px solid #7209B7',
                        boxShadow: '1px 2px 12px #7209B7',
                        backgroundSize: "cover",
                      }}
                      onClick={() => window.location.assign('http://localhost:3000/all-subjects/' + subject?._id + '/all-chapters') }
                    >
                      <p style={{
                        margin: '0',
                        padding: '12px 0',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        backgroundColor: colors[0],
                        border: '1px solid white',
                        boxShadow: '0px 0px 6px purple'
                      }}>{subject?.name}</p>
                    </Button>
                  </Col>
                ))}
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

export default Subjects;
