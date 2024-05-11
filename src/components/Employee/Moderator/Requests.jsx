import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../../redux/slices/user";
import { fetchGetAllStudents } from '../../../redux/slices/all_students.js'

import Request from "./Request.jsx";

const Requests = () => {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const [sortedStudents, setStudents] = React.useState("");

  const { students } = useSelector((state) => state.student)

  console.log('studd',students && students.items)

  const [requestsMatches, setRequestMatches] = React.useState(true)

  React.useEffect(() => {
    dispatch(fetchGetAllStudents());
  }, []);

  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <br />
        <Container>
          <h3>Сұраныстар</h3>
          <br />
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
                { students && students.items 
                && students.items.map((student, i)  => 
                student.status == 'denied' && (
                  <Request 
                    key={i}
                    id={student._id}
                    lastmame={student.lastname}
                    firstname={student.firstname}
                    patronymic={student.patronymic}
                    phone={student.phone}
                    address={student.address}
                    status={student.status}/>
                ))
                }
                {/* {requestsMatches &&  <h3>Әзірге сұраныстар жоқ</h3>} */}
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

export default Requests;
