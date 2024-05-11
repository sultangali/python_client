import { Container, Row, Col, Card } from "react-bootstrap";

const Contact = () => {

    return (<>
        <Container fluid style={{background: 'white'}}>
            <Container>
                <br />
                <h3>Байланыс</h3>
                <br />
                <Card className="static-card profile-access-denied-card">
                    <Card.Body className="d-flex row align-items-center">
                        <h4>Пошта: study_online_school@gmail.com</h4>
                        <h4>Телефон: +7 702 123 32 23</h4>
                        <h4>Мекенжай: Қарағанды қаласы, Қазыбек би ауданы</h4>
                    </Card.Body>
                </Card>
            </Container>
            <br /><br /><br />
        </Container>
    </>)
}

export default Contact