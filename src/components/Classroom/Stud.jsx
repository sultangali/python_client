import { Container, Row, Col, Card } from "react-bootstrap";
import { Person, Telephone, EnvelopePaper } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import {
  fetchDeleteStudentFromClassroom,
  fetchGetAllStudents,
  fetchSetStudentClassroom,
} from "../../redux/slices/all_students.js";

import alt from "../../images/alt.png";

const Stud = ({
  classroom_id,
  id,
  lastname,
  firstname,
  patronymic,
  phone,
  email,
  avatar,
}) => {
  const dispatch = useDispatch();

  console.log('classroom_id', classroom_id)

  const deleteStudentClassroom = async () => {
    const data = await dispatch(
      fetchDeleteStudentFromClassroom({
        classroomId: classroom_id,
        studentId: id,
      })
    );

    if(data && data.payload.success) {
      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
         window.location.assign(`http://localhost:3000/classrooms/${classroom_id}`)
    } else {
      window.alert('Оқушыны өшіру кезінде қате шықты')
    }

     };

  return (
    <Col
      lg={4}
      xs={12}
      style={{
        margin: "12px 0",
      }}
    >
      <Card
        className="static-card profile-access-denied-card"
      >
        <Card.Body className="d-flex row">
          <div className="d-flex">
            <img
              className="img-fluid cover flex-fill"
              style={{
                border: "1px solid #004485",
                borderRadius: "4px",
                width: "auto",
                height: "auto",
              }}
              src={avatar ? `http://localhost:5000${avatar}` : alt}
              alt=""
            />
          </div>

          <div style={{height: 'auto'}}>
            <h5 style={{ margin: "12px 0" }}>
              <Person size={"22px"} color="#7209B7" /> &nbsp;
              {lastname} {firstname} {patronymic}
            </h5>
            {phone && (
              <h5 style={{ margin: "12px 0" }}>
                <Telephone size={"22px"} color="#7209B7" /> &nbsp;
                {phone}{" "}
              </h5>
            )}
            {email && (
              <h5 style={{ margin: "12px 0" }}>
                <EnvelopePaper size={"22px"} color="#7209B7" /> &nbsp;
                {email}{" "}
              </h5>
            )}
          </div>
          <div className="text-end">
          <button
              className="btn btn-primary outlined-btn"
              style={{margin: '0'}}
              onClick={deleteStudentClassroom}
            >
              Өшіру
            </button>
            <button
              className="btn btn-primary signup shadow"
              style={{borderRadius: '4px'}}
              onClick={() => {
                window.location.assign(`http://localhost:3000/student-detail-for-teacher/${id && id}`)
              }}
            >
              Толығырақ
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Stud;
