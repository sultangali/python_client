import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/index.scss";

const Chapter = ({ name, clss, img, id }) => {
  return (
    <>
      <Col lg={3} className="d-flex  justify-content-center align-items-center">
        <Button
          className="btn btn-primary  subject-btn chapter"
          style={{
            backgroundImage: `url(http://localhost:5000${img})`,
            //borderRadius: '50%',
            backgroundSize: 'cover',
            border: '2px solid',
            padding: '0',
            height: '250px',
            width: '250px'
          }}
          onClick={() => {
            window.location.assign(`http://localhost:3000/class/${clss}/chapter/${id}/all-lessons`)
          }}
        >
          <p>{name}</p>
        </Button>
      </Col>
    </>
  );
};

export default Chapter;
