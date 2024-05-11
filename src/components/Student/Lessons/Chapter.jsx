import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../../../styles/index.scss";

const Chapter = ({ name, clss, img, id, subject }) => {
  return (
    <>
      <Col lg={3} className="d-flex  justify-content-center align-items-center">
        <Button
          className="btn btn-primary  subject-btn chapter"
          style={{
            backgroundImage: `url(http://localhost:5000${img})`,
            borderRadius: '4px',
            backgroundSize: 'cover',
            padding: '0',
            height: '250px',
            width: '250px',
            border: 'none'
          }}
          onClick={() => {
            window.location.assign(`http://localhost:3000/all-subjects/${subject}/all-chapters/${id}/all-lessons`)
          }}>
          <p>{name}</p>
        </Button>
      </Col>
    </>
  );
};

export default Chapter;
