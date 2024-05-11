import React from "react";
import { Container, Tab, Row, Col, Nav, Card, Button ,Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGetChapters, fetchGetLessons } from "../../../redux/slices/study";

import CreateTest from './CreateTest.jsx'
import CreateExam from './CreateExam.jsx'
import GoogleSlidesEmbed from './GoogleSlidesEmbed1';

const LessonFull = () => {
  const dispatch = useDispatch();

  const { class_id, chapter, lesson } = useParams();

  const {  chapters, lessons } = useSelector((state) => state.study);

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
      if (chap._id == chapter) {
        sortedChapter.push({
          name: chap && chap.name,
        });
      }
    });

  lessons &&
    lessons.items &&
    lessons.items.forEach((less, i) => {
      if (less._id == lesson) {
        sortedLesson.push({
          index: i + 1,
          title: less && less.title,
          text: less && less.text,
          img: less && less.img,
          pptx: less && less.pptx
        });
      }
    });

  
    
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
          <Tab.Container>
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
                      {userData && userData.subject.name}&nbsp;•&nbsp;
                      {sortedChapter &&
                        sortedChapter[0] &&
                        sortedChapter[0].name}
                    </h4>
                    <hr />
                    <h5 style={{ color: "#7209B7" }}>
                      Сабақ тақырыбы:
                      <span style={{ color: "black" }}>
                        &nbsp;
                        {sortedLesson &&
                          sortedLesson[0] &&
                          sortedLesson[0].title}
                      </span>
                    </h5>
                  </Col>
                  <Col lg={6} xs={12} className="d-flex row text-center align-items-center">
                    <img
                      className="dflex-fill "
                      src={
                        sortedLesson &&
                        sortedLesson[0] &&
                        `http://localhost:5000${sortedLesson[0].img}`
                      }
                      style={{
                        margin: "24px 0",
                        height: "auto",
                        border: "1px solid #004485",
                        borderRadius: "12.5px",
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
                  <Col lg={12} xs={12} className="d-flex row align-items-center justify-content-center">
                  <GoogleSlidesEmbed  presentation={sortedLesson && sortedLesson[0]?.pptx} />

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
                                <Nav.Link eventKey={'test'} 
                                className="btn btn-primary signup shadow-sm nav-choose-link"
                                href="#create-test"
                                style={{
                                    backgroundColor: 'white',
                                    color: '#7209B7',
                                    borderRadius: '4px'
                                }}>
                                    Тест дайындау
                                </Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey={'exam'} 
                                href="#create-exam"
                                className="btn btn-primary signup shadow-sm nav-choose-link"
                                style={{
                                    backgroundColor: '#7209B7',
                                    color: 'white',
                                    borderRadius: '4px'
                                }}>
                                Экзамен дайындау
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Tab.Content>
                <Tab.Pane eventKey="test">
                    <div id="create-test">
                        <CreateTest class_id={class_id} chapter_id={chapter} lesson_id={lesson} />
                    </div>
                      
                  <br />
                </Tab.Pane>

                <Tab.Pane eventKey="exam">
                    <div  id="create-exam">
                        <CreateExam class_id={class_id} chapter_id={chapter} lesson_id={lesson}/>
                    </div>
                  <br />
                </Tab.Pane>

              </Tab.Content>

          </Tab.Container>
        </Container>

        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default LessonFull;
