import React from "react";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Row, Col, Card } from "react-bootstrap";
import background from '../images/background2.jpeg'

const PythonAcademy = () => {
    return (
        <>
            <Container  fluid style={{ background: `url(${background}) no-repeat center center fixed`, backgroundSize: 'cover' }}>
                <Container className="d-flex column justify-content-center align-items-center" style={{ height: '760px' }}>
                    <Row className="text-center">
                        <Col md={12}><h1 className="text-center h2-main">Python Academy - интерактивті оқыту платформасы</h1></Col>
                        <Col md={12}><hr /></Col>
                        <Col md={12}>
                            <h5 className="main-p">Python бағдарламалауын меңгеру үшін интерактивті сабақтар мен практикалық жобаларды ұсынатын студенттерге арналған жан-жақты онлайн платформамызды зерттеңіз.</h5>
                        </Col>
                        <Col md={12}><br />
                            <button onClick={() => {
                                window.location.assign('http://localhost:3000/for-student');
                            }} className="btn btn-primary signup shadow">Python тілін үйренуді бастаңыз</button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    );
}

export default PythonAcademy;
