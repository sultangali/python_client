import React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGetChapters,
  fetchGetLessons,
} from "../../../redux/slices/study.js";
import Chapter from "./Chapter.jsx";
import Lesson from "./Lesson.jsx";

const Lessons = () => {
  const { class_id, id } = useParams();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { chapters } = useSelector((state) => state.study);

  const { lessons } = useSelector((state) => state.study);

  React.useEffect(() => {
    dispatch(fetchGetChapters());
    dispatch(fetchGetLessons());
  }, []);

  console.log(lessons && lessons.items);
 
    return(userData == null ? 
        <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
            <Spinner animation="border" role="status" color='primary'>
                <span className="visually-hidden">Күтіңіз...</span>
            </Spinner>
        </div>
        
    :<>
      <Container fluid style={{ background: "white" }}>
        <br />
        <Container>
          <h3>Барлық сабақтар</h3>
          <br />
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
                <Col lg={12}>
                  <h4>
                    {" "}
                    {userData && userData.subject.name}&nbsp;•&nbsp;
                    {chapters &&
                      chapters.items &&
                      chapters.items.map(
                        (chap, i) => chap._id === id && chap.name
                      )}
                  </h4>
                  <hr />
                </Col>
                {lessons &&
                  lessons.items &&
                  lessons.items.map((item, i) => (
                    item && item.chapter._id == id &&
                    <Lesson
                    key={i}
                    i={i}
                      id={item && item._id}
                      classId={class_id}
                      chapterId={id}
                      title={item && item.title}
                      text={item && item.text}
                      img={item && item.img}
                    />
                  ))}

                <Col lg={12}>
                  <hr />
                  <br />
                </Col>
                <Col lg={12} className="d-flex column justify-content-end">
                  <hr />
                  <Button
                    style={{
                      margin: "0",
                    }}
                    onClick={() => {
                      window.location.assign(
                        `http://localhost:3000/class/${class_id}/all-chapters`
                      );
                    }}
                    className="btn btn-primary outlined-btn"
                  >
                    Артқа қайту
                  </Button>
                  <Button
                    onClick={() => {
                      window.location.assign(
                        `http://localhost:3000/class/${class_id}/chapter/${id}/create-lesson`
                      );
                    }}
                    className="btn btn-primary signup shadow"
                    style={{
                      borderRadius: '4px'
                    }}
                  >
                    Жаңа сабақ құру
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

export default Lessons;
