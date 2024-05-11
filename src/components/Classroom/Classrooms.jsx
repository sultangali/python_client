import React from 'react'
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClassroom } from '../../redux/slices/study.js';
import Classroom from "./Classroom.jsx";

const Classrooms = () => {


    const dispatch = useDispatch()

    const userData = useSelector((state) => state.user.data)

    const sortedClassrooms = []


    React.useEffect(() => {
        dispatch(fetchAllClassroom())
    }, [])

    const { classrooms } = useSelector((state) => state.study)


    classrooms?.items?.forEach((item, i) => {
        if (item?.teacher?._id == (userData && userData._id)) {
            sortedClassrooms.push(item)
        }

    })

    console.log('userData', userData == null)

    return ( userData == null ? 
        <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
            <Spinner animation="border" role="status" color='primary'>
                <span className="visually-hidden">Күтіңіз...</span>
            </Spinner>
        </div>
        
    :<>
        <Container fluid style={{ backgroundColor: 'white' }}>
            <br />
            <Container>
                <h3>Барлық сыныптар</h3>
                <br />
                <Row>
               <Col lg={12} md={12} sm={12} xs={12}>
                <Card className="static-card w-100 profile-access-denied-card">
                    <Card.Body>
                        
                                <Row>
                                    {
                                        sortedClassrooms && sortedClassrooms.map((item, i) => (
                                            <Col lg={12} xs={12} md={12} >
                                            <Classroom
                                                key={i}
                                                id={item._id}
                                                name={item.name}
                                                abcd={item.abcd}
                                            />
                                            </Col>
                                            
                                        ))
                                    }
                                </Row>
                                <br />
                                <hr />
                                <br />
                                <Row>
                                    <Col className="col-12 d-flex column justify-content-end">
                                        <Button
                                            style={{
                                                margin: '0'
                                            }}
                                            onClick={() => {
                                                window.location.assign(
                                                    `http://localhost:3000/employee-profile`
                                                );
                                            }}
                                            className="btn btn-primary outlined-btn"
                                        >
                                            Артқа қайту
                                        </Button>
                                        <Button className="btn btn-primary signup shadow" style={{borderRadius: '4px'}} href="/create-classroom">Жаңа сынып қосу</Button>
                                    </Col>
                                </Row>

                            
                    </Card.Body>
                </Card>
                </Col>

</Row>
                <br />
                <br />
            </Container>
        </Container>
    </>)
}

export default Classrooms