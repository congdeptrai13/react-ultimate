import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiServices';
import _ from "lodash";
import Select from 'react-select';
const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];
const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("")
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //update State
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setImage("");
    setPreviewImage("");
  }
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  }
  const handleSubmitCreateUser = async () => {
    //validate
    // const isValidEmail = validateEmail(email);
    // if (!isValidEmail) {
    //   toast.error("invalid email");
    //   return;
    // }
    let data = await putUpdateQuizForAdmin(dataUpdate.id, description, name, type?.value, image);
    console.log(data)
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUsers();
      // props.setCurrentPage(1);
      // await props.fetchListUsersWithPaginate(props.currentPage);
      await props.fetchQuiz();

    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className='modal-add-user'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">name</label>
              <input type="name" className="form-control" value={name}
                onChange={(event) => { setName(event.target.value) }} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input type="name" className="form-control" value={description}
                onChange={(event) => { setDescription(event.target.value) }} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Difficulty</label>
              <Select
                value={type}
                // onChange={this.handleChange}
                defaultValue={type}
                onChange={setType}
                options={options}
                placeholder={"Quiz Type..."}
              />
            </div>
            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload'>
                <FcPlus />
                Upload File Image</label>
              <input type="file" id="labelUpload" hidden onChange={(event) => handleUploadImage(event)} />
              <div className='col-md-12 img-preview'>
                {previewImage ? <img src={previewImage} /> : <span>preview image</span>}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalUpdateQuiz;