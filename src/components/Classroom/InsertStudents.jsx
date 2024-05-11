import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGetAllStudents } from "../../redux/slices/all_students.js";
import Students from "./Students.jsx";

const InsertStudents = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { students } = useSelector((state) => state.student);

  React.useEffect(() => {
    dispatch(fetchGetAllStudents());
  }, []);

  students &&
    students.items &&
    students.items.forEach((item, i) => {
      console.log(item);
    });

  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <br />
        <Container>
          <h1>Оқушылар қосу</h1>
          <br />
          <Card className="static-card profile-access-denied-card">
            <Row>
              {students &&
                students.items &&
                students.items.map((item, i) => (
                    item.status != 'denied' &&
                    item.classroom == null &&
                  <Students
                    id={item && item._id}
                    classroom_id={id}
                    lastname={item && item.lastname}
                    firstname={item && item.firstname}
                    patronymic={item && item.patronymic}
                    email={item && item.email}
                    phone={item && item.phone}
                    classroom={item && item.classroom}
                    avatar={item && item.avatar}
                  />
                ))}
            </Row>
            <hr />
            <div className="d-flex column justify-content-end">
              <Button
                style={{
                  marginTop: "12px",
                }}
                onClick={() => {
                  window.location.assign(
                    `http://localhost:3000/classrooms/${id}`
                  );
                }}
                className="btn btn-primary outlined-btn"
              >
                Артқа қайту
              </Button>
            </div>
          </Card>
        </Container>
        <br />
        <br />
        <br />
      </Container>
    </>
  );
};

export default InsertStudents;
