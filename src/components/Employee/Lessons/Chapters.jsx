import React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchGetChapters } from "../../../redux/slices/study.js";
import Chapter from "./Chapter.jsx";

const Chapters = () => {

  const { id } = useParams()

 console.log(id)

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

console.log(userData && userData)

  const { chapters } = useSelector((state) => state.study);

  console.log("chapters", chapters && chapters)

  React.useEffect(() => {
    dispatch(fetchGetChapters());
  }, []);


  return(userData == null ? 
      <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
          <Spinner animation="border" role="status" color='primary'>
              <span className="visually-hidden">Күтіңіз...</span>
          </Spinner>
      </div>
      
  :<>
      <Container fluid style={{ background: "white" }}>
        <br />
        <Container>
        <h4 style={{color: '#7209B7'}}>{userData && userData.subject.name}&nbsp;•&nbsp;{id} - сынып&nbsp;•&nbsp;Бөлімдер</h4>
            <br />
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
                
                {chapters &&
                  chapters.items &&
                  chapters.items.map((chap, i) => (
                    chap.class == id && chap.subject == (userData?.subject &&
                       userData?.subject?._id) &&
                    <Chapter
                      key={i}
                      id={chap && chap._id}
                      name={chap && chap.name}
                      clss={chap && chap.class}
                      img={chap && chap.img}
                    />
                  ))}
                <Col lg={12}>
                  <hr />
                  <br />
                </Col>
                <Col lg={12} className="d-flex column justify-content-end">
                  <hr />
                  <Button
                    href={`http://localhost:3000/class/${id}/create-chapter`}
                    className="btn btn-primary signup shadow" style={{borderRadius: '4px'}}>
                    Жаңа бөлім
                  </Button>
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

export default Chapters;
