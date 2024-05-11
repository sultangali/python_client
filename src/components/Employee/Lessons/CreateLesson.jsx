import React, { useRef } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchCreateLesson, fetchGetChapters } from "../../../redux/slices/study.js";
import axios from "../../../axios.js";
import { fetchAuthMe } from "../../../redux/slices/user.js";
import GoogleSlidesEmbed from './GoogleSlidesEmbed';

const CreateLesson = () => {

  const dispatch = useDispatch();

  const { i, id } = useParams()

  const userData = useSelector((state) => state.user.data);

  const {chapters} = useSelector((state) => state.study)

  const [chapter, setChapter] = React.useState()

  const [lessonImg, setLessonImg] = React.useState()

  const [lessonPPTX, setLessonPPTX] = React.useState()

  const [title, setTitle] = React.useState()

  const [text, setText] = React.useState()

  const inputFileRef = useRef(null);
 
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/api/upload/lesson-img", formData);
      console.log(data.url);

      setLessonImg(data.url);
    } catch (error) {
      console.warn(error);
      alert("Бейнені көшіру кезінде қате шықты");
    }
    dispatch(fetchAuthMe());
  };

  React.useEffect(() => {
    dispatch(fetchGetChapters());
  }, []);

  const createLesson = async () => {
   await dispatch(fetchCreateLesson({
        chapter: id,
        title: title && title,
        text: text && text,
        img: lessonImg && lessonImg,
        pptx: lessonPPTX && lessonPPTX,
        subject: userData && userData.subject && userData.subject._id,
        clss: i,
        teacher: userData && userData._id
    }))
    window.location.assign(`http://localhost:3000/class/${i}/chapter/${id}/all-lessons`)
  }

  return (
    <>
      <Container fluid style={{ background: "white" }}>
        <br />
        <Container>
          <h3>Жаңа сабақты құру</h3>
          <br />
          <Card className="static-card profile-access-denied-card">
            <Card.Body>
              <Row>
              <Col lg={12}>
                  <h4> {
                    userData && userData.subject.name}&nbsp;•&nbsp;
                     {chapters && chapters.items 
                    && chapters.items.map((chap, i) => (
                        chap._id === id && chap.name
                    ))}</h4>
                  <hr />
                </Col>
                <Col lg={12} className="">
                    <input 
                        placeholder="Сабақ тақырыбын жазыңыз"
                        onChange={event => setTitle(event.target.value)}
                        style={{margin: '24px 0'}} type="text" className="form-control w-100" />
                </Col>
                <Col lg={12} className="">
                    <textarea 
                    rows={8}
                        placeholder="Сабақ мәтінін толтырыңыз"
                        onChange={event => setText(event.target.value)}
                        style={{margin: '24px 0'}} type="text" className="form-control w-100" />
                </Col>
                <Col lg={12} className="d-flex  justify-content-center">
                <img
                    className="flex-fill img-fluid cover d-flex column justify-content-center align-items-center"
                    src={lessonImg && lessonImg && `http://localhost:5000${lessonImg && lessonImg}`}
                    style={{
                      border: "1px solid #7209B7",
                      borderRadius: "4px",
                      height: "374px",
                      margin: '24px 0'
                    }}
                    onClick={() => inputFileRef.current.click()}
                    alt="Сүретті таңдау үшін үстін басыңыз"
                  />
                  <input
                    hidden
                    className="form-control"
                    onChange={handleChangeFile}
                    ref={inputFileRef}
                    type="file"
                  />
                </Col>
                <Col lg={12} style={{margin: '24px 0'}} className="d-flex row align-items-center justify-content-center">
                
                <input type="text" 
                onChange={(event) => {setLessonPPTX(event.target.value)}} 
                style={{
                  borderBottomLeftRadius: '0px',
                  borderBottomRightRadius: '0px'
                }}
                placeholder="Google Docs сілтемені осында қойыңыз" 
                className="form-control" />
                
                <GoogleSlidesEmbed  presentation={lessonPPTX ? lessonPPTX : ""} />
                </Col>

                <Col lg={12} className="d-flex column justify-content-end">
                <Button className="btn btn-primary outlined-btn" 
                    style={{
                      margin: '0'
                    }}
                    onClick={() => window.location.assign(`http://localhost:3000/class/${i}/chapter/${id}/all-lessons`)}>
                        Барлық сабақтар
                    </Button>
                    <Button className="btn btn-primary signup shadow" style={{borderRadius: '4px'}} onClick={() => createLesson()}>
                        Орындау
                    </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <br />
      </Container>
    </>
  );
};

export default CreateLesson;
