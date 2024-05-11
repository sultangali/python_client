import React from "react";
import { Container, Row, Col, Card, Button, Form} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { fetchCreateClassroom } from "../../redux/slices/study.js";

const CreateClassroom = () => {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = React.useState("");

  const [title, setTitle] = React.useState("");

  const [abcd, setAbcd] = React.useState("");

  const titleOptions = [
    { value: "0", text: "Сыныпты таңдаңыз" },
    { value: "1", text: "1" },
    { value: "2", text: "2" },
    { value: "3", text: "3" },
    { value: "4", text: "4" },
    { value: "5", text: "5" },
    { value: "6", text: "6" },
    { value: "7", text: "7" },
    { value: "8", text: "8" },
    { value: "9", text: "9" },
    { value: "10", text: "10" },
    { value: "11", text: "11" },
  ];

  const abcdOptions = [
    { value: "0", text: "Әріпті таңдаңыз" },
    { value: "1", text: "A" },
    { value: "2", text: "B" },
    { value: "3", text: "C" },
    { value: "4", text: "D" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch (fetchCreateClassroom({
      title: title && title,
      abcd: abcd && abcd,
    }));

    setErrorMessage(data.payload.message);

    window.location.assign('http://localhost:3000/classrooms')

  };
console.log(title, abcd)
  return (
    <>
      <Container fluid style={{ backgroundColor: "white" }}>
        <br />
        <Container>
          <h3>Жаңа сынып құру</h3>
          <br />
          <Row>
            <Card className="static-card profile-access-denied-card">
              <Card.Body>
              <h4>Байланыс ақпараты</h4>
              <br />
                <Form onSubmit={handleSubmit(onSubmit)} method="post">
                
                    <Row>
                      <Col lg={6} xs={12}>
                        <Form.Group className="mb-3">
                          <Form.Select
                            selected={title}
                            onChange={(event) => setTitle(event.currentTarget.value)}
                            className="form-control-input select-input"
                          >
                            {titleOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.text}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col lg={6} xs={12} className="d-flex">
                        <Form.Group className="mb-3 flex-fill">
                          <Form.Select
                            selected={abcd}
                            onChange={(event) => setAbcd(abcdOptions[event.currentTarget.value].text)}
                            className="form-control-input select-input"
                          >
                            {abcdOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.text}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                 
                  <Row>
                    <Col className="col-12">
                      <hr />
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col className="col-12 d-flex column justify-content-end">
                      <Button
                        variant="primary"
                        className="btn btn-primary signup shadow"
                        type="submit"
                      >
                        Сақтау
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Row>
          <br />
          <br />
          <br />
        
        </Container>
      </Container>
    </>
  );
};

export default CreateClassroom;
