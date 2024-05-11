import { Container, Row, Col, Card, Button,Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Class = () => {

    const userData = useSelector(state => state.user.data)

    console.log(userData && userData)

    let classNumbers = []

    userData && userData.classrooms.forEach((clss) => {
        classNumbers.push(clss.name)
    })

    const newSet = new Set(classNumbers)

    const uniqueNumbers = Array.from(newSet)

    console.log(uniqueNumbers && uniqueNumbers)

    
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
            <h3>Барлық оқулықтар</h3>
            <br />
            <Card className='static-card profile-access-denied-card'>
                <Card.Body>
                    <Row> { uniqueNumbers && uniqueNumbers.map((numb, i) => (
                        <Col lg={3} className="d-flex column justify-content-center">
                            <button className='btn btn-primary class-subject-btn'
                                
                                onClick={() => {
                                    window.location.assign(
                                        `http://localhost:3000/class/${numb}/all-chapters`)
                                }}
                            >
                                <p>{userData && userData.subject.name}</p>
                                <p>{numb} сынып</p>
                            </button>
                        </Col>
                    ))
                        }
                        <Col lg={12}>
                            <br />
                            <hr />
                        </Col>
                        <Col lg={12} className="d-flex column justify-content-end">
                            <Button 
                                onClick={() => {
                                    window.location.assign('http://localhost:3000/employee-profile')
                                }}
                                className='btn btn-primary outlined-btn'>Артқа қайту</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            </Container>
            <br /><br /><br />
        </Container>
    </>)
}

export default Class