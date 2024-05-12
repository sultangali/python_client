import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetAllEmployees } from "../../redux/slices/all_employees";
import { fetchSendMessage } from "../../redux/slices/study";

const AskTeacher = () => {

    const dispatch = useDispatch()

    const { employees } = useSelector((state) => state.employee)

    const [teacher, setTeacher] = React.useState("");

    const [textarea, setTextarea] = React.useState()

    React.useEffect(() => {
        dispatch(fetchGetAllEmployees())
    }, [])

    console.log(textarea && textarea)

    const sendMessage = () => {
        dispatch(fetchSendMessage({
            question: textarea && textarea,
            teacher: teacher && teacher
        }))
        window.location.assign('http://localhost:3000/student-questions')
    }

    const teachersOptions = [{
        value: 0,
        text: 'Сұрақ қоятын мұғалімді таңдаңыз'
    }];

    employees && employees.items 
    && employees.items.forEach((item) => {   
        if (item.role == 'teacher' && 
                (item.subject && item.subject.name != undefined)) {
            teachersOptions.push({
                value: item._id,
                text: `${item.lastname} ${item.firstname} ${item.patronymic} - ${item.subject && item.subject.name} пәні мұғалімі`,
            })
        }
        
    })

    console.log(teacher && teacher)

  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <Container>
            <Card className="static-card profile-access-denied-card">
                <Card.Body>
                <h4>Мұғаліммен байланыс формасы</h4>
                <br />
                      <Row>
                        <Col className="col-12 d-flex">
                        <select
                        selected={teacher}
                        onChange={(event) => setTeacher(event.currentTarget.value)}
                        className="form-control-input flex-fill form-select select-input"
                        style={{borderRadius: '6px', border: '1px solid black '}}
                      >
                        {teachersOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                        </Col>
                        <Col>
                        <br />
                        <textarea 
                          onChange={(event) => setTextarea(event.target.value)}
                          placeholder="Сұрақ мәтінін осында жазыңыз"
                          type="text" 
                          className="form-control" rows={'6'} />
                        </Col>
                        
                        <Col style={{marginTop: '24px'}} className="col-12 d-flex column justify-content-end">
                        <Button 
                                onClick={() => window.location.assign('http://localhost:3000/student-questions')}
                                style={{
                                  margin: '0px'
                                }}
                                className="btn btn-primary outlined-btn">Барлық сұрақтар</Button>
                            <Button 
                                onClick={() => sendMessage()}
                                disabled={teacher == 0} 
                                className="btn btn-primary signup shadow"
                                style={{borderRadius: '4px'}}>Сұрақты жіберу</Button>
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

export default AskTeacher