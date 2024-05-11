import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGetChapters, fetchGetSubjects } from "../../../redux/slices/study.js";
import Chapter from "./Chapter.jsx";

const Chapters = () => {

  const { id } = useParams()

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { chapters, subjects } = useSelector((state) => state.study);

  React.useEffect(() => {
    dispatch(fetchGetSubjects());
    dispatch(fetchGetChapters());
  }, []);




  console.log('userdata', userData )


  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <br />
        <Container>
        <h3>Бөлімдер</h3>
            <br />
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
                <Col lg={12}>
                  <h4>{
                    subjects?.items?.map((subject, i) => (
                        subject._id == id && subject?.name
                    ))
                    }&nbsp;•&nbsp;{userData?.classroom?.name} - сынып</h4>
                  <hr />
                </Col>
                {
                  chapters?.items?.map((chap, i) => (
                    chap?.class == userData?.classroom?.name && chap?.subject == id &&
                    <Chapter
                      key={i}
                      id={chap && chap._id}
                      name={chap && chap.name}
                      clss={chap && chap.class}
                      subject={id}
                      img={chap && chap.img}
                    />
                  ))}

                <Col lg={12}>
                  <br />
                </Col>

                {/* {  <Col lg={12} className="d-flex column justify-content-end">
                  <Button
                    href={`http://localhost:3000/class/${id}/create-chapter`}
                    style={{borderRadius: '4px'}}
                    className="btn btn-primary signup shadow">
                    Жаңа бөлім құру
                  </Button>
                </Col>} */}
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

export default Chapters;
