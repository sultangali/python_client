import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "react-phone-number-input/style.css";
import { Person, Telephone, PinMap, Calendar2X } from "react-bootstrap-icons";
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllClassroom,
  fetchAllExamAnswers,
  fetchGetLessons,
  fetchGetSubjects,
} from "../../redux/slices/study";

const Rating = () => {
  const dispatch = useDispatch();

  const [chartWidth, setChartWidth] = React.useState("100%");

  const userData = useSelector((state) => state.user.data);

  const { subjects, lessons, exam_answers } = useSelector((state) => state.study);

  React.useEffect(() => {
    dispatch(fetchGetSubjects());
    dispatch(fetchGetLessons());
    dispatch(fetchAllExamAnswers())
  }, []);

  let sortedSubjects = {
    python: [],
    //csharp: [],
  };

  if (lessons) {
    lessons?.items.forEach((lesson, i) => {
      if (lesson.clss == userData?.classroom?.name) {
        switch (lesson.subject?.name) {
          case "Алгоритмдер, деректер құрылымы және программалау":
            sortedSubjects.python.push(lesson);
            break;
        }
      }
    });
  }

  console.log('sortedSubjects?.python.length', subjects && subjects)

  const dataA = [
    ["Барлық сабақтар", "Percentage"],
    ["Барлығы", 10],
    [subjects?.items[0]?.chapters[0].name, 2],
    [subjects?.items[0]?.chapters[1].name, 2],
    [subjects?.items[0]?.chapters[2].name, 2],
    [subjects?.items[0]?.chapters[3].name, 2]
  ];

  const dataB = [
    ["Пән", "Өтілген сабақтар", { role: "style" }],
    ["Алгоритмдер, деректер құрылымы және программалау",userData?.subjects?.python?.attending?.length, "orange"],
  ];

  const sortedExamAnswers = {
     python_grades: [],
  }

  exam_answers?.items?.forEach((ex, i) => {
    if (ex.student?._id == userData?._id) {
      console.log(ex?.subject?.name)
      switch(ex?.subject?.name) {
        case 'Алгоритмдер, деректер құрылымы және программалау':
          sortedExamAnswers.python_grades.push(ex?.grade)
        break;
      
      }
    }
  })

  const dataC = [
    [
      "Жалпы көрсеткіш",
      "Алгоритмдер, деректер құрылымы және программалау", { role: 'style'}
    ],
    ["I тоқсан", 0,  'red'  ],
    ["II тоқсан", 0 , 'red' ],
    ["III тоқсан", 0 , 'red'],
    ["IV тоқсан", 
    (sortedExamAnswers?.python_grades.reduce((a, b) => a + b, 0)) / sortedExamAnswers?.python_grades.length, 'red'], 
  ];

  const dataD = [
    ["Ай", "Алгоритмдер, деректер құрылымы және программалау", { role: 'style'} ],
    ["Мамыр", (sortedExamAnswers?.python_grades.reduce((a, b) => a + b, 0)) / sortedExamAnswers?.python_grades.length , 'purple'],
  ];

  const options = {
    legend: "none",

    pieStartAngle: 0,
    slices: {},
  };
  const optionsB = {
    legend: "none",
  };
  const optionsC = {
    legend: { position: "bottom" },
  };

  const optionsD = {
    legend: { position: "bottom" },

    bars: "horizontal",
  };

  return (
    <Card className="static-card profile-access-denied-card">
      <Card.Body>
        <h4>Оқушы рейтингі</h4>
        <hr />
        <Row>
          <Col lg={6} xs={12} className="">
            <h6>Барлық сабақтар көрсеткіші</h6>
            <Chart
              chartType="PieChart"
              data={dataA}
              options={options}
              width={"100%"}
              height={"400px"}
            />
            <hr />
          </Col>
          <Col lg={6} xs={12} className="text-center">
            <h6>Өтілген сабақтар көрсеткіші</h6>
            <Chart
              chartType="ColumnChart"
              data={dataB}
              options={optionsB}
              width={"100%"}
              height={"400px"}
            />
            <hr />
          </Col>
          <Col lg={12} xs={12} className="d-flex row justify-content-start">
            <h6>Ағымдағы айдағы балл көрсеткіші</h6>
            <Chart
              style={{ marginTop: "10px" }}
              chartType="Bar"
              data={dataD}
              options={optionsD}
              width={"100%"}
              height={"100px"}
            />
            <hr />
          </Col>
          <Col lg={12} xs={12}>
            <h6>Жылдық балл көрсеткіші</h6>
            <Chart
              className=""
              style={{ padding: "0", color: "green" }}
              chartType="LineChart"
              data={dataC}
              options={optionsC}
              width={"100%"}
              height={"400px"}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Rating;
