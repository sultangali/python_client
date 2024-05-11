import React from "react";
import {
  Tab,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Alert, Spinner
} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {  selectIsAuth, fetchAuthMe, fetchUpdateEmployee } from "../../redux/slices/user.js";


const EditProfile = () => {

    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);
  
    const navigate = useNavigate()

    const [subjectId, setSubjectId] = React.useState('')

    const userData = useSelector((state) => state.user.data);

    React.useEffect(() => {
      dispatch(fetchAuthMe())
    }, [])

    console.log(userData && userData.phone)

    const [phone, setPhone] = React.useState(userData && userData.phone && userData.phone);
    const [father_phone, setFPhone] = React.useState("+7");
    const [mother_phone, setMPhone] = React.useState("+7");
  
    const [errorMessage, setErrorMessage] = React.useState("");
  
    const [matchedPass, setMatchedPass] = React.useState(true);
  
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm({
      defaultValues: {
        lastname: userData && userData.lastname,
        firstname: userData && userData.firstname,
        patronymic: userData && userData.patronymic,

      },
      mode: "onChange",
    });
  
    const onSubmit = async (values) => {
        const data = await dispatch(
            fetchUpdateEmployee({
            lastname: values.lastname,
            firstname: values.firstname,
            patronymic: values.patronymic,
            phone: phone && phone,
            subject: userData && userData.role
              && userData.role == 'teacher' ? subjectId && subjectId
              : ''
          })
        );
  
        setErrorMessage(data.payload.message);
  
        if ("token" in data.payload) {
          window.localStorage.setItem("token", data.payload.token);
        }

        navigate('/employee-profile')
      }

     
    return(userData == null ? 
        <div className=' d-flex row align-items-center justify-content-center' style={{backgroundColor: 'white', height: '70vh'}}>
            <Spinner animation="border" role="status" color='primary'>
                <span className="visually-hidden">Күтіңіз...</span>
            </Spinner>
        </div>
        
    :<>
        <Container fluid style={{backgroundColor: 'white'}}>
        <br />
          <Container>
          <h3>Профилді өңдеу</h3>
          <br />
            <Row>
            <Card className="static-card">
              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Row>
                  <h4>Жеке ақпарат</h4>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.lastname ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.lastname?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Фамилияңыз</Form.Label>
                      )}
                      <Form.Control
                        style={
                          Boolean(errors.lastname?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("lastname", {
                          required: "Фамилияңызды енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Атыңыз 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Атыңыз 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.lastname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.firstname ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.firstname?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Атыңыз</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.firstname?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("firstname", {
                          required: "Атыңызды енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Атыңыз 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Атыңыз 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.firstname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.patronymic ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.patronymic?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Әкеңіздің аты</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.patronymic?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("patronymic", {
                          required: "Әкеңіздің атын енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Атыңыз 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Атыңыз 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.patronymic}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {/* {!phone ? (
                        <Form.Label style={{ color: "red" }}>
                          Телефон
                        </Form.Label>
                      ) : (
                        <Form.Label>Телефон</Form.Label>
                      )} */}
                        <Form.Label>Телефон</Form.Label>  
                      <PhoneInput
                        // style={
                        //   !phone
                        //     ? {
                        //         borderColor: "red",
                        //       }
                        //     : { borderColor: "#80a8ce" }
                        // }
                        className="form-control phone"
                        defaultCountry="KZ"
                        value={phone}
                        onChange={setPhone}
                        placeholder={userData && userData.phone && userData.phone}
                        
                      />
                    </Form.Group>
                  </Col>
                 
                </Row>
                {userData && userData.role && userData.role == 'teacher' && 
                <Row>
                <Col className="col-12">
                  <hr />
                </Col>
                 <Col lg={12} xs={12}>
                    <Row>
                      <Col lg={6} xs={12} className="d-flex column justify-content-center align-items-center">
                        <Button className="btn btn-primary flex-fill subject-btn subject-kaz-img"
                        onClick={() => setSubjectId('663f1fb111badac5265554cc')}
                        >
                          <p>
                          Алгоритмдер, деректер құрылымы және программалау
                          </p>
                          
                        </Button>
                      </Col>
                      {/* <Col lg={6} xs={12} className="d-flex column justify-content-center align-items-center">
                        <Button className="btn btn-primary flex-fill subject-btn subject-math-img"
                        onClick={() => setSubjectId('640644b15665304b307c91b1')}
                        >
                          <p>
                            Математика
                          </p>
                          
                        </Button>
                      </Col> */}
                      {/* <Col lg={3} xs={12} className="d-flex column justify-content-center align-items-center">
                        <Button className="btn btn-primary flex-fill subject-btn subject-history-img"
                        onClick={() => setSubjectId('640644c85665304b307c91b3')}
                        >
                          <p>
                            Қазақстан тарихы
                          </p>
                          
                        </Button>
                      </Col>
                      <Col lg={3} xs={12} className="d-flex column justify-content-center align-items-center">
                        <Button className="btn btn-primary flex-fill subject-btn subject-english-img"
                        onClick={() => setSubjectId('640644de5665304b307c91b5')}
                        >
                          <p>
                            Ағылшын
                          </p>
                          
                        </Button>
                      </Col> */}
                    </Row>
                </Col>
              </Row>}
                

                <Col className="col-12 d-flex column justify-content-end align-items-center">
           
                    <Button variant="primary" href="/employee-profile" className="btn outlined-btn">
                      Артқа қайту
                    </Button>
                
                  <Button
                  disabled={!isValid}
                    variant="primary"
                    className="btn-signup"
                    type="submit"
                  >
                    Сақтау
                  </Button>
                </Col>
              </Form>
            </Card>
            </Row>
          </Container>
          <br />
        <br />
        <br />
        </Container>
        
      </>)
    };

    export default EditProfile

    
