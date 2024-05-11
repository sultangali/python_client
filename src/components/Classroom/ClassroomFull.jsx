import React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllClassroom } from "../../redux/slices/study";
import Stud from "./Stud";
import Students from "./Students";

const ClassroomFull = () => {
    
    const {id} = useParams()

const dispatch = useDispatch()

    const {classrooms} = useSelector((state) => state.study)

    React.useEffect(() => {
        dispatch(fetchAllClassroom())
    }, [])

    const classroom = []

    const [clroom, setClass] = React.useState()

    classrooms && classrooms.items && classrooms.items.forEach((item, i) => {
        if (item._id == id) {
            classroom.push(item)
        }
    })

    console.log('classroom && classroom[0]', classroom && classroom[0])

    React.useEffect(() => {
        setClass(classroom && classroom[0])
    }
    , [])
    const userData = useSelector((state) => state.user.data)
    return(userData == null ? 
        <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
            <Spinner animation="border" role="status" color='primary'>
                <span className="visually-hidden">Күтіңіз...</span>
            </Spinner>
        </div>
        
    :<>
        <Container fluid style={{background: 'white'}}>
            <br />
            <Container>

                <h3 style={{color: '#7209B7 '}}>{classroom && classroom[0] && classroom[0].name}
                {classroom && classroom[0] && classroom[0].abcd} сыныбы</h3> 
                
                    <Card className="static-card profile-access-denied-card">
                        <Row>
                            {
                                classroom && classroom[0] && 
                                classroom[0].students && classroom[0].students.map((stud, i) => (
                                    <Stud
                                        id={stud && stud._id}
                                        lastname={stud && stud.lastname}
                                        firstname={stud && stud.firstname}
                                        patronymic={stud && stud.patronymic}
                                        phone={stud && stud.phone}
                                        email={stud && stud.email}
                                        classroom={stud && stud.classroom && stud.classroom}
                                        classroom_id={ classroom[0]._id}
                                        avatar={stud && stud.avatar}
                                    />
                                ))
                            }
                        </Row>
                        <hr />
                        <div className="d-flex column justify-content-end">
                        <Button
                            style={{
                            marginTop: "12px",
                            }}
                            onClick={() => {
                            window.location.assign(
                                `http://localhost:3000/classrooms`
                            );
                            }}
                            className="btn btn-primary outlined-btn "
                        >
                            Артқа қайту
                        </Button>
                            <Button 
                            className="btn btn-primary signup shadow"
                            style={{
                                marginTop: '12px',
                                borderRadius: '4px'
                            }}
                            
                            onClick={() => {
                                window.location.assign(`http://localhost:3000/classrooms/${id}/insert-students`)
                            }}
                            >Оқушыларды қосу</Button>
                        </div>
                        
                    </Card>
            </Container>
            <br />
            <br />
            <br />
        </Container>
    </>)
}

export default ClassroomFull