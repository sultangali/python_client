import React from "react";
import {
  Tab,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Alert,
  Tabs, Spinner
} from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { fetchAuthMe } from "../redux/slices/user.js";

import ProfileDetail from "../components/Student/profileDetail.jsx";
import Rating from "../components/Student/rating.jsx";
import Calendar from "../components/Student/calendar.jsx";
import AskTeacher from "../components/Student/askTeacher.jsx";

import girl_adenied from "../images/girl_adenied.png";
import alt from "../images/altimg.png";
import axios from "../axios.js";


const Profile = () => {
  const inputFileRef = React.useRef(null);

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  console.log("userData", userData && userData);

  const isStatus = userData && userData.status == "access";

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/student-avatar", formData);
      console.log(data.url);
      console.log("asdasd");
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };



  const options = {
    legend: "none",

    pieStartAngle: 0,
    slices: {},
  };
  const optionsB = {
    legend: "none",
  };
  const optionsC = {
    legend: { position: "bottom" },
  };

  const optionsD = {
    legend: { position: "bottom" },

    bars: "horizontal",
  };

  console.log(userData && userData);

  if (userData != null && !isStatus) {
    return (
      <>
        <Container fluid className="profile-page-container">
          <br />
          <Container>
            <h3>Жеке профиль</h3>
            <br />
            <Row>
              <Col lg={12} xs={12}>
                <Card className="static-card profile-access-denied-card">
                  <Card.Body>
                    <Row>
                      
                      <Col className="d-flex row align-items-center justify-content-center">
                        <img
                          src={girl_adenied}
                          className="img-fluid cover flex-fill"
                          alt=""
                        />
                      </Col>
                      <Col className="d-flex row align-items-center">
                        <h5>
                        Сіздің тіркеуіңіз қазір тексерілуде. Сіз енгізген жеке деректер модерацияға жатады. Бұл әдетте шамамен 15 минутты алады. Сәл күте тұрыңыз. Тексеру аяқталғаннан кейін сіз өзіңіздің жеке профиліңізге кіре аласыз. Біз сіздің шыдамдылығыңызды бағалаймыз және сіздің барлық ақпаратыңыздың қауіпсіздігі мен құпиялылығын қамтамасыз етуге міндеттенеміз.
                        </h5>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <br />
          </Container>
        </Container>
      </>
    );
  }


    return(userData == null ? 
        <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
            <Spinner animation="border" role="status" color='primary'>
                <span className="visually-hidden">Күтіңіз...</span>
            </Spinner>
        </div>
        
    :
    <Container fluid className="profile-page-container">
      <br />
      <Container>
        <Tab.Container defaultActiveKey={"rating"}>
          
          <h4>Студенттің жеке профилі</h4>
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
                      style={{ height: "auto", padding: "8px" }}
                      onClick={() => inputFileRef.current.click()}
                      src={
                        userData && userData.avatar
                          ? `http://localhost:5000${
                              userData && userData.avatar
                            }`
                          : alt
                      }
                      className=" profile-avatar-img"
                      alt=""
                    />
                    <input
                      type="file"
                      onChange={handleChangeFile}
                      hidden
                      ref={inputFileRef}
                    />
                    <h5 className="text-center" style={{ marginTop: "24px" }}>
                      {userData && userData.lastname}&nbsp;
                      {userData && userData.firstname}
                      &nbsp; {userData && userData.patronymic}
                    </h5>
                    <Button
                      className="btn btn-primary edit-profile-btn"
                      href="/edit-student-profile"
                    >
                      Профильді өңдеу
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
                        <hr style={{ margin: "0px" }} />
                        <Nav.Item>
                          <Nav.Link
                            className="btn btn-primary outlined-btn p-link-btn"
                            eventKey="rating"
                            style={{
                              padding: "6px",
                              margin: "0",
                              color: "#7209B7",
                              background: "transparent",
                            }}
                          >
                            Рейтинг
                          </Nav.Link>
                        </Nav.Item>
                        <hr style={{ margin: "0px" }} />
                        <Nav.Item>
                          <Nav.Link
                            className="btn btn-primary outlined-btn p-link-btn"
                            eventKey="calendar"
                            style={{
                              padding: "6px",
                              margin: "0",
                              color: "#7209B7",
                              background: "transparent",
                            }}
                          >
                            Күнтізбе
                          </Nav.Link>
                        </Nav.Item>

                        <hr style={{ margin: "0px" }} />
                        <Nav.Item>
                          <Nav.Link
                            className="btn btn-primary outlined-btn p-link-btn"
                            href="/all-subjects"
                            style={{
                              padding: "6px",
                              margin: "0",
                              color: "#7209B7",
                              background: "transparent",
                            }}
                          >
                            Барлық сабақтар
                          </Nav.Link>
                        </Nav.Item>

                        <hr style={{ margin: "0px" }} />
                        <Nav.Item>
                          <Nav.Link
                            className="btn btn-primary outlined-btn p-link-btn"
                            href="/pass-quiz"
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
                           href="/pass-exam"
                            className="btn btn-primary outlined-btn p-link-btn"
                            style={{
                              padding: "6px",
                              margin: "0",
                              color: "#7209B7",
                              background: "transparent",
                            }}
                          >
                            Емтихан
                          </Nav.Link>
                        </Nav.Item>

                        {/* <hr style={{ margin: "0px" }} />
                        <Nav.Item>
                          <Nav.Link
                            className="btn btn-primary outlined-btn p-link-btn"
                            eventKey="ask"
                            style={{
                              padding: "6px",
                              margin: "0",
                              color: "#7209B7",
                              background: "transparent",
                            }}
                          >
                            Мұғалімге сұрақ
                          </Nav.Link>
                        </Nav.Item> */}
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
                    address={userData && userData.address}
                    birthday={userData && userData.birthday}
                    father_lname={userData && userData.father_lname}
                    father_fname={userData && userData.father_fname}
                    father_patron={userData && userData.father_patron}
                    father_phone={userData && userData.father_phone}
                    mother_lname={userData && userData.mother_lname}
                    mother_fname={userData && userData.mother_fname}
                    mother_patron={userData && userData.mother_patron}
                    mother_phone={userData && userData.mother_phone}
                    classroom={userData && userData.classroom}
                  />
                  <br />
                </Tab.Pane>
                <Tab.Pane eventKey="rating">
                  <Rating />
                  <br />
                </Tab.Pane>
                <Tab.Pane eventKey="calendar">
                  <Calendar />
                  <br />
                </Tab.Pane>
                <Tab.Pane eventKey="subjects">
                  <Calendar />
                  <br />
                </Tab.Pane>
                <Tab.Pane eventKey="subjects">
                  <Calendar />
                  <br />
                </Tab.Pane>
                <Tab.Pane eventKey="subjects">
                  <Calendar />
                  <br />
                </Tab.Pane>
                <Tab.Pane eventKey="ask">
                  < AskTeacher/>
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
