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

import { fetchLoginEmployee, selectIsAuth } from "../redux/slices/user.js";

const LoginEmployee = () => {

  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const [phone, setPhone] = React.useState();

  const [errorMessage, setErrorMessage] = React.useState("");

  const [matchedPass, setMatchedPass] = React.useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: ""
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
   
      const data = await dispatch(
        fetchLoginEmployee({
          login: values.login,
          password: values.password,
        })
      );

      setErrorMessage(data.payload.message);

      if ("token" in data.payload) {
        window.localStorage.setItem("token", data.payload.token);
      }
  };

  if (isAuth) {
    return <Navigate to="/" />;
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
            <h4 style={{ color: "#7209B7" }}>Жүйеге кіру</h4>
            <hr/>
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

            <Card className="static-card" style={{width: '600px'}}>
              <Form onSubmit={handleSubmit(onSubmit)} method="post">
                <Row>
                  <Col lg={12} xs={12}>
                    <br />
                    <Form.Group className="mb-3">
                      {errors && errors.login ? (
                        <Form.Label style={{ color: "red" }}>
                          {errors.login?.message}
                        </Form.Label>
                      ) : (
                        <Form.Label>Пошта немесе телефон</Form.Label>
                      )}

                      <Form.Control
                        style={
                          Boolean(errors.login?.message)
                            ? {
                                borderColor: "red",
                              }
                            : { borderColor: "#80a8ce" }
                        }
                        className="form-control-input"
                        {...register("login", {
                          required: "Поштаңызды немесе телефонды енгізіңіз",
                        })}
                        type="text"
                        placeholder=""
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={12} xs={12}>
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
                </Row>

                <Col className="col-12 d-flex column justify-content-end align-items-center">
                  <Link to="/for-employee/registration">
                    <Button variant="primary" className="btn outlined-btn">
                      Тіркелу парақшасы
                    </Button>
                  </Link>

                  <Button
                    // disabled={!isValid}
                    variant="primary"
                    className="btn-signup"
                    type="submit"
                  >
                    Жүйеге кіру
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

export default LoginEmployee;
