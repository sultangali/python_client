import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const Question = ({ i, id, question, teacher, answer, createdAt, updatedAt }) => {

    return (<>
        <Col lg={12} xs={12} style={{ margin: '12px 0' }}>
            <Card className='static-card profile-access-denied-card'>
                <h5 style={{ color: '#7209B7' }}>Сұрақ-{i + 1}. Мұғалім: &nbsp;
                    <span style={{ color: 'black' }}>
                        {teacher && teacher.lastname} &nbsp;
                        {teacher && teacher.firstname}&nbsp;
                        {teacher && teacher.patronymic}&nbsp;
                    </span></h5>

                <Card.Body>
                    <Row>
                        <Col lg={12} xs={12}
                            className="d-flex row align-items-center justify-content-center">
                            <Col lg={12}>
                                <p style={{ color: '#7209B7' }}>Сұрақ:&nbsp;
                                    <span style={{ color: 'black' }}>
                                        {question}
                                    </span>
                                </p>
                            </Col>
                            <Col lg={12} className='text-end'>
                                <h6 style={{ color: '#7209B7' }}>{((createdAt)).substring(0, 16).replace('T', ' ')}</h6>
                            </Col>
                        </Col>
                        <hr />
                        <Col lg={12} xs={12}
                            className="d-flex row">
                            <Col lg={12}>
                                <p style={{ color: '#7209B7' }}>Жауап:&nbsp;
                                    <span style={{ color: 'black' }}>
                                        {answer ? answer : <span style={{ color: '#7209B7' }}>Әзірге жауап жоқ</span>}
                                    </span>
                                </p>
                            </Col>
                            <Col lg={12} className='text-end'>
                                <h6 style={{ color: '#7209B7' }}>{((updatedAt)).substring(0, 16).replace('T', ' ')}</h6>
                            </Col>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>

    </>)
}

export default Question