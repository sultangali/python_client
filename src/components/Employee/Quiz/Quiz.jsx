import React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetChapters, fetchGetTestQuestions } from "../../../redux/slices/study";

const Quiz = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { chapters, test } = useSelector((state) => state.study);

  const [chooseClass, setChooseClass] = React.useState();

  const [chooseChapter, setChooseChapter] = React.useState();

  const classroomOption = [
    {
      value: "0",
      text: "Сыныпты таңдаңыз",
    },
  ];

  const chapterOption = [
    {
      value: "0",
      text: "Тарауды таңдаңыз",
      id: ''
    },
  ];

  if (userData) {
    let classNumbers = [];

    userData.classrooms.forEach((clss) => {
      classNumbers.push(clss.name);
    });

    const newSet = new Set(classNumbers);

    const uniqueNumbers = Array.from(newSet);

    uniqueNumbers.forEach((item, i) => {
      classroomOption.push({
        value: i + 1,
        text: item,
      });
    });
  }

  React.useEffect(() => {
    dispatch(fetchGetChapters())
    dispatch(fetchGetTestQuestions());
  }, []);

if (chapters) {
   chapters.items.forEach((item, i) => {
        
        if (item.class == (classroomOption && 
            classroomOption[chooseClass] && 
            classroomOption[chooseClass].text)) {
            chapterOption.push({
                value: i + 1,
                text: item.name,
                id: item._id
            })
        }
    })
}

let sortedTests = []
let index = 1

  if (test) {
    test.items.forEach((question, i) => {
        if (question.chapter && question.chapter == (
            chapterOption && chapterOption[chooseChapter] && 
            chapterOption[chooseChapter].id
        )) {

            sortedTests.push({
                ...question,
                index
            })
            index++
        }
    })
  }

  console.log(sortedTests && sortedTests)

  
    return(userData == null ? 
        <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
            <Spinner animation="border" role="status" color='primary'>
                <span className="visually-hidden">Күтіңіз...</span>
            </Spinner>
        </div>
        
    :<>
      <Container
        fluid
        style={{
          backgroundColor: "white",
        }}
      >
        <br />
        <Container>
          <h3>Тест сұрақтары</h3>
          <br />
          <Row>
            <Col md={6}>
              <select
                selected={chooseClass}
                onChange={(event) => setChooseClass(event.target.value)}
                className="form-control"
              >
                {classroomOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={6}>
              <select
                selected={chooseChapter}
                onChange={(event) => setChooseChapter(event.target.value)}
                className="form-control"
              >
                {chapterOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={12}>
              <Card className="static-card profile-access-denied-card">
              <h5>"{chapterOption && chapterOption[chooseChapter]?.text}" тақырыбы бойынша тест сұрағы - Сұрақ саны: {sortedTests?.length}</h5>
                
                <Card.Body>
                   {
                    sortedTests?.map((question, i) => (
                        <Col key={i} md={12}>
                            <p style={{fontSize: '18px'}}>{i + 1}. {question.question}</p>
                            <h6>A) {question.A}</h6>
                            <h6>B) {question.B}</h6>
                            <h6>C) {question.C}</h6>
                            <h6>D) {question.D}</h6>
                            <br />
                            <h6>Дұрыс жауабы: {question.correct}</h6>
                            <hr />
                        </Col>
                    ))
                   }
                </Card.Body>

              </Card>
            </Col>
          </Row>
        </Container>
        <br />
        <br /> <br />
      </Container>
    </>
  );
};

export default Quiz;
