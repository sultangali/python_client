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
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { fetchRegisterEmployee, selectIsAuth } from "../redux/slices/user.js";

const RegistrationEmployee = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [phone, setPhone] = React.useState("+7");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [matchedPass, setMatchedPass] = React.useState(true);

  const [job, setJob] = React.useState("");

  const jobOptions = [
    { value: "0", text: "Қызмет түрін таңдаңыз" },
    { value: "1", text: "Мұғалім" },
    { value: "2", text: "Модератор" },
  ];

  const handleJobChange = (event) => {
    switch (jobOptions[event.target.value].text) {
      case "Мұғалім":
        setJob("teacher");
        break;
      case "Модератор":
        setJob("moderator");
        break;
    }
  };

  console.log(job && job);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      lastname: "",
      firstname: "",
      patronymic: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    console.log(values)
    if (values.password === values.confirmPass) {
      const data = await dispatch(
        fetchRegisterEmployee({
          lastname: values.lastname,
          firstname: values.firstname,
          patronymic: values.patronymic,
          email: values.email,
          phoneNumber: phone && phone,
          role: job && job,
          password: values.password,
        })
      );

      setErrorMessage(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
    } else {
      setMatchedPass(false);
    }
  };

  if (isAuth) {
    window.location.assign('http://localhost:3000/employee-profile')
  }

  return (
    <Container fluid>
      <Row>
        <Col
          className="col-lg-6 col-xs-12 d-flex align-items-center justify-content-center registration-teacher-img-card"
          style={{ padding: "0" }}
        ></Col>
        <Col className="col-lg-6 col-xs-12 d-flex row static-card-col align-items-center justify-content-start">
          <div>
            <h4 style={{ color: "#7209B7" }}>Регистрация</h4>
            <hr />
            {errorMessage && errorMessage && (
              <Alert
                variant={errorMessage && errorMessage ? "danger" : "primary"}
                style={
                  errorMessage && errorMessage
                    ? { borderColor: "red" }
                    : { borderRadius: "6px" }
                }
              >
                {
                  <div className="text-center" style={{ margin: "-12px" }}>
                    {errorMessage && <span>{errorMessage}</span>}
                  </div>
                }
              </Alert>
            )}

            <Card className="static-card">
              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Row>
                  <h4>Жеке ақпарат</h4>
                  <Col lg={12} xs={12}>
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
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12} xs={12}>
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
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12} xs={12}>
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
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <h4>Байланыс ақпараты</h4>
                  <Col lg={12} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.email ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.email?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Пошта</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.email?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("email", {
                          required: "Поштаңызды енгізіңіз",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Дұрыс форматты енгізіңіз",
                          },
                        })}
                        type="email"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {!phone ? (
                        <Form.Label style={{ color: "red" }}>
                          Телефонды енгізіңіз
                        </Form.Label>
                      ) : (
                        <Form.Label>Телефон</Form.Label>
                      )}

                      <PhoneInput
                        style={
                          !phone
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control phone"
                        defaultCountry="KZ"
                        value={phone}
                        onChange={setPhone}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.role ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.role?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Қызмет түрі</Form.Label>
                      )}
                      <Form.Select
                        selected={job}
                        onChange={handleJobChange}
                        className="form-control-input select-input"
                      >
                        {jobOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.password ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.password?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Құпия сөз</Form.Label>
                      )}

                      <Form.Control
                        className="form-control-input"
                        style={
                          Boolean(errors.password?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        {...register("password", {
                          required: "Құпия сөзді енгізіңіз",
                          minLength: {
                            value: 6,
                            message:
                              "Құпия сөз 6 және 16 символ арасында болуы керек",
                          },
                          maxLength: {
                            value: 16,
                            message:
                              "Атыңыз 6 және 16 символ арасында болуы керек",
                          },
                        })}
                        type="password"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                      {errors && errors.confirmPass ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.confirmPass?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Құпия сөзді қайталаңыз</Form.Label>
                      )}

                      <Form.Control
                        className="form-control-input"
                        style={
                          Boolean(errors.confirmPass?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        {...register("confirmPass", {
                          required: "Құпия сөзді қайта енгізіңіз",
                          validate: (val) => {
                            if (watch("password") !== val) {
                              return "Құпия сөздер сәйкес келмейді";
                            }
                          },
                        })}
                        type="password"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Col className="col-12 d-flex column justify-content-end align-items-center">
                  <Link to="/for-employee/login">
                    <Button variant="primary" className="btn outlined-btn">
                      Кіру парақшасы
                    </Button>
                  </Link>

                  <Button
                    variant="primary"
                    className="btn-signup"
                    type="submit"
                  >
                    Тіркелу
                  </Button>
                </Col>
              </Form>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationEmployee;
