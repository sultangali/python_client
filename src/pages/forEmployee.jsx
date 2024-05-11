import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import authimg from '../images/auth.jpg'

const ForEmployee = () => {

    return (<>
            <Container fluid style={{ backgroundColor: '#f9f9f9', height: '100vh' }}>
            <Container>
                <div className="text-center ">
                    <br />
                    <h3 className="text-primary heading-margin">Қызметкерді оқыту жүйесіне қол жеткізу</h3>
                    <p>Біздің интерактивті онлайн платформамыз арқылы сізге қажет барлық Python білімін алыңыз.</p>
                </div>
                <Row className='d-flex justify-content-center'>
                    <Card className='shadow-lg p-4 mb-5 bg-white rounded static-card profile-access-denied-card' style={{ width: '600px' }}>
                        <Card.Body className='text-center'>
                            <Card.Img src={authimg} style={{height: '400px'}}/>
                            <Card.Text className="mb-4">
                            Жаттығуды бастамас бұрын платформаға тіркеліңіз. Мәліметтеріңіз расталғаннан кейін сіз өзіңіздің жеке профиліңізге кіріп, Python тілін үйренуді бастай аласыз. Егер сіз әлдеқашан тіркелген болсаңыз, кіру үшін төмендегі түймені басыңыз.
                            </Card.Text>
                            <Button className="btn btn-primary signup shadow mx-2" style={{borderRadius: '4px'}} href='/for-employee/login'>Кіру</Button>
                            <Button className="btn btn-secondary signup shadow mx-2" style={{borderRadius: '4px'}} href='/for-employee/registration'>Тіркелу</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </Container>
    </>)
}

export default ForEmployee