import { Container, Row, Col, Card } from "react-bootstrap";
import {
  Person,
  Telephone,
  PinMap,
  Calendar2X,
  Bank2,
  Bank,
  Pin,
} from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {fetchSetStudentStatus } from "../../../redux/slices/all_students.js";

const Request = ({
  id,
  lastmame,
  firstname,
  patronymic,
  phone,
  address,
  status,
  avatar,
}) => {
  const dispatch = useDispatch();

  const setStatus = async  () => {
   const data =  await  dispatch(fetchSetStudentStatus({id: id}))
   if ("token" in data.payload) {
    window.localStorage.setItem("token", data.payload.token);
  }
  window.location.assign('http://localhost:3000/student-requests')
  }

  return (
    <Col
      lg={12}
      xs={12}
      style={{
        margin: "12px 0",
      }}
    >
      <Card className="static-card profile-access-denied-card">
        <Card.Body>
          <h5 style={{ margin: "16px 0" }}>
            <Person size={"22px"} color="#7209B7" /> &nbsp;
            {lastmame} {firstname} {patronymic}
          </h5>
          <h5 style={{ margin: "16px 0" }}>
            <Telephone size={"22px"} color="#7209B7" /> &nbsp;
            {phone}{" "}
          </h5>
          <h5 style={{ margin: "16px 0" }}>
            <PinMap size={"22px"} color="#7209B7" /> &nbsp;
            {address}{" "}
          </h5>
          <hr />
          <div className="text-end">
            <br />
            <button
              className="btn btn-primary signup shadow"
              style={{borderRadius: '4px'}}
              onClick={setStatus}>
              Рұқсат беру
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Request;
