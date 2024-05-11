import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "react-phone-number-input/style.css";
import {
  Person,
  Telephone,
  EnvelopePaper,
  Bank,
  Pin,
} from "react-bootstrap-icons";

const profileDetail = ({
  lastname,
  firstname,
  patronymic,
  phone,
  email,
  subject,
  classrooms,
  role,
}) => {
  
  const sortedClassrooms = [];

  classrooms &&
    classrooms.forEach((item) => {
      sortedClassrooms.push(item);
    });

  return (
    <>
      <Card className="static-card profile-access-denied-card">
        <Card.Body>
          <Row>
            <Col lg={6} xs={12}>
              
              <h6 style={{ margin: "16px 0" }}>
                <Person size={"22px"} color="#7209B7" /> &nbsp; {lastname}{" "}
                {firstname} {patronymic}
              </h6>
              <h6 style={{ margin: "16px 0" }}>
                <Telephone size={"22px"} color="#7209B7" /> &nbsp; {phone}
              </h6>
              <h6 style={{ margin: "16px 0" }}>
                <EnvelopePaper size={"22px"} color="#7209B7" /> &nbsp; {email}
              </h6>
              {role == "teacher" && (
                <Row>
                  <Col lg={1} xs={1}>
                    <h6 style={{ margin: "16px 0" }}>
                      <Bank size={"22px"} color="#7209B7" /> &nbsp;
                    </h6>
                  </Col>
                  <Col className="col-11">
                    <Row>
                      {sortedClassrooms &&
                        sortedClassrooms.map((item, i) => (
                          <Col lg={'auto'} style={{ margin: "12px 0" }}>
                            <span
                              style={{
                                fontSize: '18px',
                                margin: "12px 4px",
                                padding: "2px 8px",
                                border: "1px solid #004485",
                                borderRadius: "4px",
                                background: "#7209B7",
                                color: "white",
                              }}>
                              {item.name} {item.abcd}
                            </span>
                          </Col>
                        ))}
                    </Row>
                  </Col>
                </Row>
              )}
              {role == "moderator" ? (
                <h6>
                  <Pin size={"22px"} color="#7209B7" /> &nbsp; Модератор
                </h6>
              ) : (
                ""
              )}
             
            </Col>
            <Col className="col-lg-6 col-xs-12 d-flex row align-items-center">
              <Card className="student-class-abcd">
                <Card.Body className="text-center">
                  {role == "moderator" && (
                    <>
                      <h3 style={{ color: "#7209B7" }}>Модератор</h3>
                    </>
                  )}
                  {role == "teacher" && (
                    <>
                      <h3 style={{ color: "#7209B7" }}>{subject}</h3>
                      
                      {subject && <h4>пәні мұғалімі</h4>}
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default profileDetail;
