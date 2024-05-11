import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Trash, BoxSeam } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRemoveClassroom } from "../../redux/slices/study";
import { fetchAuthMe } from "../../redux/slices/user";

const Classroom = ({ id, name, abcd }) => {


  const dispatch = useDispatch()

  const deleteClassroom = () => {
    if (window.confirm(`${name}${abcd} сыныбын өшіресіз бе?`))
      dispatch(fetchRemoveClassroom(id))
  }

  return (
    <Col  >
      <Card className="static-card profile-access-denied-card" style={{ padding: '4px', margin: '12px 0' }}>
        <Card.Body className="text-start d-flex row align-items-center justify-content-center">
          <Row>
            <Col lg={9} xs={12}>
              <h4>
                {name} {abcd} сыныбы
              </h4>

            </Col>
            <Col lg={3} xs={12} className="d-flex row align-items-center justify-content-center">
              <Row>
                <Col className="col-6 text-center">
                  <BoxSeam size={'24px'} style={{cursor: 'pointer'}}
                    onClick={() => { window.location.assign(`http://localhost:3000/classrooms/${id}`) }} color="#7209B7" />
                  <br /> Кіру
                </Col>
                <Col className="col-6 text-center"><Trash size={'24px'} style={{cursor: 'pointer'}}
                  onClick={deleteClassroom}
                  color="#7209B7" />
                  <br />
                  Өшіру
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Classroom;
