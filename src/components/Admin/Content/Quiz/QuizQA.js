import { useEffect, useState } from 'react';
import Select from 'react-select';
import "./QuizQA.scss"
import { HiOutlinePlusCircle } from "react-icons/hi";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _, { create } from 'lodash';
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin, getQuizWithQA, postUpsertQA
} from "../../../../services/apiServices";
import { toast } from 'react-toastify';

const QuizQA = (props) => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ]
    },
  ];
  const [questions, setQuestions] = useState(initQuestions)

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",

  })
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  useEffect(() => {
    fetchQuiz();
  }, [])
  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);
  //return a promise that resolves with a File instance
  function urltoFile(url, filename, mimeType) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }
  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      //convert base64 to file object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `question - ${q.id}.png`;
          q.imageFile =
            await urltoFile(`data:image/png;base64,${q.imageFile}`, `question - ${q.id}.png`, `image/png`)
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  }

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        }
      })
      setListQuiz(newQuiz);
    }
    // console.log("res:", res);
  }
  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ]
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === 'REMOVE') {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter(item => item.id !== id);
      setQuestions(questionsClone);
    }
  }
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === 'ADD') {
      const newAnswer =
      {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionsClone.findIndex(item => item.id === questionId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === 'REMOVE') {
      let index = questionsClone.findIndex(item => item.id === questionId);
      questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId);
      setQuestions(questionsClone);
    }
  }
  const handleOnChange = (type, questionId, value) => {
    if (type === 'QUESTION') {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex(item => item.id === questionId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  }
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(item => item.id === questionId);
    if (index > -1 && event.target && event.target.files && event.target.files[0]) {
      console.log("check file:", event.target.files[0]);
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  }
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(item => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      })
      setQuestions(questionsClone);
    }
  }
  const handleSubmitQuestionForQuiz = async () => {
    //todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!")
      return;
    }
    //validate answer
    let isValidAnswer = true;
    let indexQ = 0, indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      indexQ = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`);
      return;
    }
    //validate question
    let isValidQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQ = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQ === false) {
      toast.error(`not empty description for question ${indexQ1 + 1} `);
      return;
    }
    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile)
      }
    }
    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone

    });
    console.log("check questionsClone:", questionsClone)
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(item => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName
      })
      setIsPreviewImage(true);
    }
  }
  console.log("check questions:", questions);
  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className='col-6 form-group'>
          <label className='mb-2'>Select Quiz:</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <div className='mt-3 mb-2'>
          Add questions:
        </div>
        {
          questions && questions.length > 0
          && questions.map((question, index) => {
            return (
              <div key={question.id} className='q-main mb-4'>
                <div className='questions-content'>
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      value={question.description}
                      onChange={(event) => handleOnChange("QUESTION", question.id, event.target.value)}
                    />
                    <label >Question {index + 1}'s description</label>
                  </div>
                  <div className='group-upload'>
                    <label htmlFor={`${question.id} `}>
                      <RiImageAddFill className='label-upload' />
                    </label>
                    <input
                      id={`${question.id} `}
                      type={"file"}
                      hidden
                      onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                    />
                    <span>{question.imageName
                      ?
                      <span
                        onClick={() => handlePreviewImage(question.id)}
                        style={{ cursor: "pointer" }}
                      >{question.imageName}</span>
                      :
                      "0 file is uploaded"}</span>
                  </div>
                  <div className='btn-add'>
                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                      <HiOutlinePlusCircle className='icon-add' />
                    </span>
                    {questions.length > 1 &&
                      <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                        <AiOutlineMinusCircle className='icon-remove' />
                      </span>}
                  </div>
                </div>
                {
                  question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className='answers-content'>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                        />
                        <div className="form-floating answer-name">
                          <input
                            type="type"
                            className="form-control"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                          />
                          <label >Answers {index + 1}</label>
                        </div>
                        <div className='btn-group'>
                          <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                            <HiOutlinePlusCircle className='icon-add' />
                          </span>
                          {question.answers.length > 1 &&
                            <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                              <AiOutlineMinusCircle className='icon-remove' />
                            </span>
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
        {
          questions && questions.length > 0 &&
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className='btn btn-warning'
            >Save Questions</button>
          </div>
        }
      </div>
      {
        isPreviewImage === true &&
        <Lightbox
          image={dataImagePreview.url}
          title={dataImagePreview.title}
          onClose={() => setIsPreviewImage(false)}
        >
        </Lightbox>
      }
    </div >
  )
}
export default QuizQA;