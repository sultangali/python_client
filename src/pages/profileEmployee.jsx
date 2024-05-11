import React from "react";
import { Tab, Nav, Container, Row, Col, Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import { fetchAuthMe } from "../redux/slices/user.js";

import ProfileDetail from "../components/Employee/profileDetail.jsx";
import girl_adenied from "../images/girl_adenied.png";
import axios from "../axios.js";
import alt from '../images/altimg.png'
import Questions from "../components/Employee/Questions/Questions.jsx";
import CreateChapter from "../components/Employee/Lessons/CreateChapter.jsx";

const Profile = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/employee-avatar", formData);
      console.log(data.url);
      console.log("asdasd");
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  const userData = useSelector((state) => state.user.data);

  const isStatus = userData && userData.status == "accepted";

  console.log(userData && userData);


    return(userData == null ? 
        <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
            <Spinner animation="border" role="status" color='primary'>
                <span className="visually-hidden">Күтіңіз...</span>
            </Spinner>
        </div>
        
    :<Container fluid className="profile-page-container">
      <br />
      <Container>
        <Tab.Container defaultActiveKey={"profile"}>
          <h3>Қызметкердің жеке профилі</h3>
          <Row>
            <Col lg={4} xs={12} style={{ marginTop: "20px" }}>
              <Card
                className="static-card profile-access-denied-card"
                style={{
                  paddingTop: "20px",
                }}
              >
                <Card.Body>
                  <Row className="d-flex row align-items-start justify-content-center">
                    <img
                      onClick={() => inputFileRef.current.click()}
                      onChange={handleChangeFile}
                      style={{height: 'auto', padding: '8px'}}
                      src={userData && userData.avatar ? 
                        `http://localhost:5000${userData && userData.avatar}`: alt}
                      className="flex-fill img-fluid profile-avatar-img"
                      alt=""
                    />
                    <input type="file" hidden onChange={handleChangeFile} ref={inputFileRef}  />
                    <h5 className="text-start" style={{ marginTop: "24px" }}>
                      {userData && userData.lastname}&nbsp;
                      {userData && userData.firstname}
                      &nbsp; {userData && userData.patronymic}
                    </h5>
                    <Button
                      className="btn btn-primary edit-profile-btn"
                      href="/edit-employee-profile"
                    >
                      Мәлімет жаңарту
                    </Button>
                    <div className="text-center">
                      <Nav variant="pills" className="flex-column">
                        <hr style={{ margin: "0px" }} />
                        <Nav.Item>
                          <Nav.Link
                            className="btn btn-primary outlined-btn p-link-btn"
                            eventKey="profile"
                            style={{
                              padding: "6px",
                              margin: "0",
                              color: "#7209B7",
                              background: "transparent",
                            }}
                          >
                            Жеке ақпарат
                          </Nav.Link>
                        </Nav.Item>

                        {userData &&
                        userData.role &&
                        userData.role == "moderator" ? (
                          <>
                            <hr style={{ margin: "0px" }} />
                            <Nav.Item>
                              <Nav.Link
                                className="btn btn-primary outlined-btn p-link-btn"
                                href="/student-requests"
                                style={{
                                  padding: "6px",
                                  margin: "0",
                                  color: "#7209B7",
                                  background: "transparent",
                                }}
                              >
                                Сұраныстар
                              </Nav.Link>
                            </Nav.Item>
                          </>
                        ) : (
                          <>
                            <hr style={{ margin: "0px" }} />
                            <Nav.Item>
                              <Nav.Link
                                className="btn btn-primary outlined-btn p-link-btn"
                                href="/classrooms"
                                style={{
                                  padding: "6px",
                                  margin: "0",
                                  color: "#7209B7",
                                  background: "transparent",
                                }}
                              >
                                Сыныптар
                              </Nav.Link>
                            </Nav.Item>

                            <hr style={{ margin: "0px" }} />
                            <Nav.Item>
                              <Nav.Link
                                className="btn btn-primary outlined-btn p-link-btn"
                                href="/class"
                                style={{
                                  padding: "6px",
                                  margin: "0",
                                  color: "#7209B7",
                                  background: "transparent",
                                }}
                              >
                                Сабақтар
                              </Nav.Link>
                            </Nav.Item>

                            <hr style={{ margin: "0px" }} />
                            <Nav.Item>
                              <Nav.Link
                                className="btn btn-primary outlined-btn p-link-btn"
                                href="/quiz"
                                style={{
                                  padding: "6px",
                                  margin: "0",
                                  color: "#7209B7",
                                  background: "transparent",
                                }}
                              >
                                Тесттер
                              </Nav.Link>
                            </Nav.Item>

                            <hr style={{ margin: "0px" }} />
                            <Nav.Item>
                              <Nav.Link
                                className="btn btn-primary outlined-btn p-link-btn"
                                href="/exam"
                                style={{
                                  padding: "6px",
                                  margin: "0",
                                  color: "#7209B7",
                                  background: "transparent",
                                }}>
                                Емтихан
                              </Nav.Link>
                            </Nav.Item>

                            {/* <hr style={{ margin: "0px" }} /> */}
                            {/* <Nav.Item>
                              <Nav.Link
                                eventKey="contact"
                                className="btn btn-primary outlined-btn p-link-btn"
                                style={{
                                  padding: "6px",
                                  margin: "0",
                                  color: "#7209B7",
                                  background: "transparent",
                                }}>
                                Оқушымен байланыс
                              </Nav.Link>
                            </Nav.Item> */}
                          </>
                        )}

                        <hr style={{ margin: "0px" }} />
                      </Nav>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
              <br />
            </Col>
            <Col style={{ marginTop: "20px" }}>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <ProfileDetail
                    lastname={userData && userData.lastname}
                    firstname={userData && userData.firstname}
                    patronymic={userData && userData.patronymic}
                    email={userData && userData.email}
                    phone={userData && userData.phone}
                    classrooms={userData && userData.classrooms}
                    subject={userData && userData?.subject && userData.subject.name}
                    role={userData && userData.role}
                  />
                  <br />
                </Tab.Pane>
                {/* <Tab.Pane eventKey="classrooms">
                  <Classrooms/>
                  <br />
                </Tab.Pane> */}
                <Tab.Pane eventKey="calendar">
                  <br />
                </Tab.Pane>
                <Tab.Pane eventKey="contact">
                  <Questions/>
                  <br />
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </Container>
  );
};

export default Profile;
