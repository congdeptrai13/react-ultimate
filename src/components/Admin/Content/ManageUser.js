import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from 'react-icons/fc';
import TableUser from "./TableUser";
import { useEffect } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiServices";
import { useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 6;
  const [pageCount, setPageCount] = useState(0);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUsers, setListUsers] = useState([])
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  //componentDidMount
  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(1);
  }, []);
  const fetchListUsers = async () => {
    let res = await getAllUsers()
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  }
  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  }
  const handleClickBtnView = (user) => {
    setShowModalViewUser(!showModalViewUser);
    setDataView(user);
  }
  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(!showModalUpdateUser);
    setDataUpdate(user);
  }
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(!showModalDeleteUser);
    setDataDelete(user);
  }
  const resetUpdateData = () => {
    setDataUpdate({});
  }
  const resetViewData = () => {
    setDataView({});
  }

  return (
    <div className="manage-user-container">
      <div className="title">
        Manage User
      </div>
      <div className="users-content">
        <div className="btn-add-new">
          <button className="btn btn-primary" onClick={() => {
            setShowModalCreateUser(!showModalCreateUser)
          }}> <FcPlus /> Add new users</button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
          />

        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchListUsers={fetchListUsers}
          resetUpdateData={resetUpdateData}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          fetchListUsers={fetchListUsers}
          dataView={dataView}
          resetViewData={resetViewData}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  )
}
export default ManageUser;