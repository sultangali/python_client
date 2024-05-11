import React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetChapters, fetchGetExamQuestions, fetchGetTestQuestions } from "../../../redux/slices/study";

const Exam = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.data);

  const { chapters, exam } = useSelector((state) => state.study);

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
    dispatch(fetchGetExamQuestions());
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

let sortedExam = []
let index = 1

  if (exam) {
    console.log(exam)
    exam.items.forEach((question, i) => {
        if (question.chapter && question.chapter == (
            chapterOption && chapterOption[chooseChapter] && 
            chapterOption[chooseChapter].id
        )) {

            sortedExam.push({
                ...question,
                index
            })
            index++
        }
    })
  }

  console.log(sortedExam && sortedExam)

  
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
              <h5>"{chapterOption && chapterOption[chooseChapter]?.text}" тақырыбы бойынша экзамен сұрағы - Сұрақ саны: {sortedExam?.length}</h5>
                
                <Card.Body>
                   {
                    sortedExam?.map((question, i) => (
                        <Col key={i} md={12}>
                            <p style={{fontSize: '18px'}}>{i + 1}. {question.question}</p>

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

export default Exam;
