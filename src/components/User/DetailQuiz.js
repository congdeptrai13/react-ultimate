import _ from "lodash";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiServices";
import "./DetailQuiz.scss"
import Question from "./Question";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetchQuestions();
  }, [quizId])
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription, image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          })
          return { questionId: key, answers, questionDescription, image }
        }
        )
        .value();
      setDataQuiz(data);
      // console.log(dataQuiz)
    }
  }
  const handlePrev = () => {
    if (index - 1 < 0)
      return;
    setIndex(index - 1);
  }
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1)
      setIndex(index + 1);
  }
  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); // react hook doesn't merge state
    let question = dataQuizClone.find(item =>
      +item.questionId === +questionId)
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      })
    }
    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
    console.log(dataQuizClone);
  }
  const handleFinishQuiz = () => {
    // {
    //   "quizId": 1,
    //     "answers": [
    //       {
    //         "questionId": 1,
    //         "userAnswerId": [3]
    //       },
    //       {
    //         "questionId": 2,
    //         "userAnswerId": [6]
    //       }
    //     ]
    // }
    console.log("check data before submit:", dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(question => {
        let questionId = question.questionId;
        let userAnswerId = [];
        question.answers.forEach(a => {
          if (a.isSelected) {
            userAnswerId.push(a.id)
          }
        })
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        })
      })
      payload.answers = answers;
      console.log("final payload", payload)
    }
  }
  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}:{location?.state?.quizTitle}
          <hr />
        </div>
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            handleCheckbox={handleCheckbox}
            index={index}
            data={
              dataQuiz && dataQuiz.length > 0
                ? dataQuiz[index]
                : []
            }
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary"
            onClick={() => handlePrev()}
          >Prev</button>
          <button className="btn btn-primary"
            onClick={() => handleNext()}
          >Next</button>
          <button className="btn btn-warning"
            onClick={() => handleFinishQuiz()}
          >Finish</button>
        </div>
      </div>
      <div className="right-content">
        count down
      </div>
    </div>
  )
}
export default DetailQuiz;