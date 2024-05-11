import React from "react";
import { Container, Tab, Row, Col, Nav, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGetChapters, fetchGetLessons } from "../../../redux/slices/study";
import { fetchAttending } from "../../../redux/slices/user";
import GoogleSlidesEmbed1 from "../../Employee/Lessons/GoogleSlidesEmbed1";

const LessonFull = () => {
  const dispatch = useDispatch();

  const { subject_id, chapter_id, lesson_id } = useParams();

  const { subjects, chapters, lessons } = useSelector((state) => state.study);

  const userData = useSelector((state) => state.user.data);

  let sortedChapter = [];
  let sortedLesson = [];

  React.useEffect(() => {
    dispatch(fetchGetChapters());
    dispatch(fetchGetLessons());
  }, []);

  chapters &&
    chapters.items &&
    chapters.items.forEach((chap) => {
      if (chap._id == chapter_id) {
        sortedChapter.push({
          name: chap && chap.name,
        });
      }
    });

  lessons &&
    lessons.items &&
    lessons.items.forEach((less, i) => {
      if (less._id == lesson_id) {
        sortedLesson.push({
          index: i + 1,
          title: less && less.title,
          text: less && less.text,
          img: less && less.img,
          pptx: less && less.pptx
        });
      }
    });

    const attending = async () => {
       await  dispatch(fetchAttending({
            subject_id,
            lesson_id
        }))
        window.location
        .assign(`http://localhost:3000/all-subjects/${subject_id}/all-chapters/${chapter_id}/all-lessons`)
    }

  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <br />
        <Container>
            <h3>
              Сабақ - {sortedLesson && sortedLesson[0] && sortedLesson[0].index}
            </h3>
            <br />
            <Card className="static-card profile-access-denied-card">
              <Card.Body>
                <Row className="d-flex row align-items-center justify-content-center">
                  <Col lg={12}>
                    <h4>
                      {" "}
                      {subjects?.items.map((subject, i) => (
                        subject._id == subject_id && subject.name
                      ))}&nbsp;•&nbsp;
                      {sortedChapter &&
                        sortedChapter[0] &&
                        sortedChapter[0].name}
                    </h4>
                    <hr />
                    <h5 style={{ color: "#7209B7" }}>
                      Тақырыбы:
                      <span style={{ color: "black" }}>
                        &nbsp;
                        {sortedLesson &&
                          sortedLesson[0] &&
                          sortedLesson[0].title}
                      </span>
                    </h5>
                  </Col>
                  <Col lg={6} xs={12} className="d-flex row">
                    <img
                      className="dflex-fill"
                      src={
                        sortedLesson &&
                        sortedLesson[0] &&
                        `http://localhost:5000${sortedLesson[0].img}`
                      }
                      style={{
                        margin: "24px 0",
                        height: "auto",
                        border: "1px solid #7209B7",
                        borderRadius: "4px",
                      }}
                      alt=""
                    />
                  </Col>
                  <Col lg={12} xs={12} className="d-flex row align-items-start">
                    <p
                      style={{
                        margin: "24px 12px",
                      }}
                    >
                      {" "}
                      &emsp;&emsp;
                      {sortedLesson && sortedLesson[0] && sortedLesson[0].text}
                    </p>
                  </Col>

                  <Col lg={12} xs={12} className="d-flex row align-items-start">
                    <p
                      style={{
                        margin: "24px 12px",
                      }}
                    >
                     <GoogleSlidesEmbed1 presentation={sortedLesson && sortedLesson[0] && sortedLesson[0].pptx}/>  
                    </p>
                  </Col>
                  <Col lg={12}>
                    <hr />
                  </Col>
                  <Col lg={12}>
                    <Row>
                      <Col
                        lg={12}
                        xs={12}
                        className=" col d-flex column justify-content-end"
                      >
                        <h5
                          className="text-end"
                          style={{ margin: "12px 0 24px 0" }}
                        >
                          Осы сабақ бойынша тест немесе экзамен сұрағын дайындау
                        </h5>
                      </Col>
                      <Col >

                        <Nav variant="pills" className=" d-flex column justify-content-end">
                            <Nav.Item>
                                <Nav.Link
                                onClick={() => attending()}
                                className="btn btn-primary signup shadow-sm nav-choose-link"

                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '4px',
                                    color: '#7209B7'
                                }}>
                                Сабақты түсіндім
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                      </Col>
                    </Row>
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

export default LessonFull;
