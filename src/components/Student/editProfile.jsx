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
  Alert,
} from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import {  fetchUpdateStudent, selectIsAuth, fetchAuthMe } from "../../redux/slices/user.js";

const EditProfile = () => {

    const dispatch = useDispatch();

    const isAuth = useSelector(selectIsAuth);
  
    const navigate = useNavigate()


    const userData = useSelector((state) => state.user.data);

    React.useEffect(() => {
      dispatch(fetchAuthMe())
    }, [])

    console.log(userData && userData.phone)

    const [birthday, setBirthday] = React.useState(userData && userData.birthday && userData.birthday)

    const [phone, setPhone] = React.useState(userData && userData.phone && userData.phone);
    const [father_phone, setFPhone] = React.useState("+7");
    const [mother_phone, setMPhone] = React.useState("+7");
  
    const [errorMessage, setErrorMessage] = React.useState("");
  
    const [matchedPass, setMatchedPass] = React.useState(true);
  
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isValid },
    } = useForm({
      defaultValues: {
        lastname: userData && userData.lastname && userData.lastname,
        firstname: userData && userData.firstname && userData.firstname,
        patronymic: userData && userData.patronymic && userData.patronymic,
        address: userData && userData.address && userData.address,
        father_lname: userData && userData.father_lname && userData.father_lname,
        father_fname: userData && userData.father_fname && userData.father_fname,
        father_patron: userData && userData.father_patron && userData.father_patron,
        mother_lname: userData && userData.mother_lname && userData.mother_lname,
        mother_fname: userData && userData.mother_fname && userData.mother_fname,
        mother_patron: userData && userData.mother_patron && userData.mother_patron
      },
      mode: "onChange",
    });
  
    const onSubmit = async (values) => {
        const data = await dispatch(
            fetchUpdateStudent({
            lastname: values.lastname,
            firstname: values.firstname,
            patronymic: values.patronymic,
            phone: phone && phone,
            address: values.address,
            // birthday: birthday,
            father_lname: values.father_lname,
            father_fname: values.father_fname,
            father_patron: values.father_patron,
            father_phone: father_phone && father_phone,
            mother_lname: values.mother_lname,
            mother_fname: values.mother_fname,
            mother_patron: values.mother_patron,
            mother_phone: mother_phone && mother_phone
          })
        );
  
        setErrorMessage(data.payload.message);
  
        if ("token" in data.payload) {
          window.localStorage.setItem("token", data.payload.token);
        }

        navigate('/student-profile')
      }

      return (<>
        <Container fluid style={{backgroundColor: 'white', height: '100vh'}}>
        <br />
          <Container>
          <h3>Профилді өңдеу</h3>
          <br />
            <Row>
            <Card className="static-card">
              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Row>
                  <h4>Жеке ақпарат</h4>
                  <Col lg={4} xs={12}>
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
                          userData.lastname && 
                          userData.lastname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
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
                          userData.firstname && 
                          userData.firstname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
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
                          userData.patronymic && 
                          userData.patronymic}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
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
                  <Col lg={4} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.address ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.address?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Мекенжай</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.address?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("address", {
                          required: "Мекенжайды енгізіңіз",
                          minLength: {
                            value: 3,
                            message: "Мекенжай атауы тым қысқа",
                          },
                        })}
                        type="text"
                        placeholder={userData && userData.address && userData.address}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className="col-12">
                    <hr />
                  </Col>
                  
                </Row>
                <Row>
                <h4>Әкесі</h4>
                  <Col lg={4} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.father_lname ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.father_lname?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Фамилия</Form.Label>
                      )}
                      <Form.Control
                        style={
                          Boolean(errors.father_lname?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("father_lname", {
                          required: "Фамилияңызды енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Фамилия 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Фамилия 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.father_lname && 
                          userData.father_lname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.father_fname ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.father_fname?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Аты</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.father_fname?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("father_fname", {
                          required: "Атыңызды енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Аты 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Аты 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.father_fname && 
                          userData.father_fname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.father_patron ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.father_patron?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Әкесінің аты</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.father_patron?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("father_patron", {
                          required: "Әкеңіздің атын енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Әкесінің аты 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Әкесінің аты 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.father_patron && 
                          userData.father_patron}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
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
                        value={father_phone}
                        onChange={setFPhone}
                        placeholder={userData && userData.father_phone && userData.father_phone}
                        
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                <h4>Анасы</h4>
                  <Col lg={4} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.mother_lname ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.mother_lname?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Фамилия</Form.Label>
                      )}
                      <Form.Control
                        style={
                          Boolean(errors.mother_lname?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("mother_lname", {
                          required: "Фамилияны енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Фамилия 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Фамилия 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.mother_lname && 
                          userData.mother_lname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.mother_fname ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.mother_fname?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Аты</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.mother_fname?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("mother_fname", {
                          required: "Атын енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Аты 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Аты 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.mother_fname && 
                          userData.mother_fname}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.mother_patron ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.mother_patron?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Әкесінің аты</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.mother_patron?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("mother_patron", {
                          required: "Әкеңіздің атын енгізіңіз",
                          minLength: {
                            value: 3,
                            message:
                              "Әкесінің аты 3 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Әкесінің аты 3 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="text"
                        placeholder={userData && 
                          userData.mother_patron && 
                          userData.mother_patron}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4} xs={12}>
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
                        value={mother_phone}
                        onChange={setMPhone}
                        placeholder={userData && userData.mother_phone && userData.mother_phone}
                        
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Col className="col-12 d-flex column justify-content-end align-items-center">
           
                    <Button variant="primary" href="/student-profile" className="btn outlined-btn">
                      Артқа қайту
                    </Button>
                
                  <Button
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
          
        </Container>
      </>)
    };

    export default EditProfile

    
