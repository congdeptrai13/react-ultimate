import { useEffect } from "react";
import { useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
  const [isShowModalDeleteQuiz, setIsShowModalDeleteQuiz] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, [])
  const fetchQuiz = async () => {
    setDataDelete({});
    setDataUpdate({});
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
    // console.log("res:", res);
  }
  const handleDelete = (quiz) => {
    // console.log("check quiz", quiz);
    setDataDelete(quiz);
    setIsShowModalDeleteQuiz(!isShowModalDeleteQuiz);
  }
  const handleUpdate = (quiz) => {
    setDataUpdate(quiz);
    setIsShowModalUpdateQuiz(!isShowModalUpdateQuiz);
  }
  return (
    <>
      <div>List Quizzes:</div>
      <table className="table table-hover table-bordered mt-2 my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {listQuiz && listQuiz.map((item, index) => {
          return (<tbody>
            <tr key={`table-quiz-${index}`}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.difficulty}</td>
              <td style={{ display: "flex", gap: "15px" }}>
                <button className="btn btn-warning"
                  onClick={() => handleUpdate(item)}>Edit</button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item)}
                >Delete</button>
              </td>
            </tr>
          </tbody>)
        })}
      </table>
      <ModalDeleteQuiz
        show={isShowModalDeleteQuiz}
        setShow={setIsShowModalDeleteQuiz}
        dataDelete={dataDelete}
        setDataUpdate={setDataUpdate}
        fetchQuiz={fetchQuiz}
      />
      <ModalUpdateQuiz
        show={isShowModalUpdateQuiz}
        setShow={setIsShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
      />
    </>
  )
}
export default TableQuiz;