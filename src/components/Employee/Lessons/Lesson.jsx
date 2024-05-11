import { Row, Col, Card, Button } from "react-bootstrap";

const Lesson = ({id, classId, chapterId, i,  title, text, img}) => {

    return (<>
            <Col lg={12} style={{margin: '24px 0'}}>
                <Card className="static-card profile-access-denied-card">
                    <Card.Body className="d-flex row">
                        <Row>
                            <Col lg={12} xs={12}>
                                <h4>{i + 1} - сабақ</h4>
                            </Col>
                            <Col lg={12} xs={12}>
                                <h5 style={{color: '#7209B7'}}>Тақырыбы: <span style={{color: 'black'}}>{title}</span> </h5>
                            </Col>
                            <Col lg={12} xs={12} className="d-flex row justify-content-center">
                                <img src={img && `http://localhost:5000${img}`}
                                    style={{
                                        margin: '24px 0',
                                        width: '400px',
                                        height: 'auto',
                                        border: '1px solid #004485',
                                        borderRadius: '12.5px'
                                    }} alt="" />
                            </Col>
                            <Col>
                            <p className="text-truncate">{text}</p>
                            </Col>
                            
                        </Row>
                        <Col lg={12} className="d-flex column justify-content-end">
                                <Button 
                                className="btn btn-primary signup shadow-sm"
                                style={{
                                    borderRadius: '4px'
                                }}
                                onClick={() => {
                                    window.location.assign(
                                        `http://localhost:3000/class/${classId}/chapter/${chapterId}/lesson/${id}`)
                                }}
                                >Толығырақ</Button>
                            </Col>
                    </Card.Body>
                </Card>
            </Col>
    </>)
}

export default Lesson