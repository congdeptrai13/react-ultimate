import "./ManageQuiz.scss";
import Select from 'react-select';
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify"
import TableQuiz from "./TableQuiz";
import Accordion from 'react-bootstrap/Accordion';

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];
const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState('EASY');
  const [image, setImage] = useState(null);
  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  }
  const handleSubmitQuiz = async () => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
    } else {
      toast.error(res.EM);
    }
  }
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset class="border rounded-3 p-3">
                <legend class="float-none w-auto px-3">Add new Quiz</legend>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label >Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    value={type}
                    // onChange={this.handleChange}
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz Type..."}
                  />
                </div>
                <div className="more-actions form-group">
                  <label className="mb-1">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangeFile(event)
                    }
                  />

                </div>
                <div className="mt-3">
                  <button
                    onClick={() => handleSubmitQuiz()}
                    className="btn btn-warning"
                  >Save</button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail">
        <TableQuiz />
      </div>
    </div >
  )
}
export default ManageQuiz;