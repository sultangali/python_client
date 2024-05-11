import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGetChapters,
  fetchGetLessons,
  fetchGetSubjects,
} from "../../../redux/slices/study.js";
import Chapter from "./Chapter.jsx";
import Lesson from "./Lesson.jsx";

const Lessons = () => {
  const { subject_id, chapter_id } = useParams();

console.log('subject_id', subject_id)
console.log('chapter_id', chapter_id)

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { subjects } = useSelector(state => state.study);

  const { chapters } = useSelector((state) => state.study);

  const { lessons } = useSelector((state) => state.study);

  React.useEffect(() => {
    dispatch(fetchGetSubjects())
    dispatch(fetchGetChapters());
    dispatch(fetchGetLessons());
  }, []);

  console.log(lessons && lessons.items);
  return (
    <>
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
                    {" "} {
                        subjects?.items.map((subject, i) => (
                            subject._id == subject_id && subject.name
                        ))
                    }
                    &nbsp;•&nbsp;
                    {chapters &&
                      chapters.items &&
                      chapters.items.map(
                        (chap, i) => chap._id === chapter_id && chap.name
                      )}
                  </h4>
                  <hr />
                </Col>
                {lessons &&
                  lessons.items &&
                  lessons.items.map((item, i) => (
                    item && item.chapter._id == chapter_id &&
                    <Lesson 
                    key={i}
                    i={i}
                      id={item && item._id}
                      subjectId={subject_id}
                      classId={userData?.classroom}
                      chapterId={chapter_id}
                      title={item && item.title}
                      text={item && item.text}
                      img={item && item.img}
                    />
                  ))}

                <Col lg={12}>
                  <hr />
                  <br />
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
