import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../Admin.scss"
const TableUserPaginate = (props) => {
  const { listUsers, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchListUsersWithPaginate(event.selected + 1);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
            return (
              <tr key={`table-user-${index}`}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    onClick={() => props.handleClickBtnView(item)}
                    className="btn btn-secondary"
                  >view</button>
                  <button
                    onClick={() => props.handleClickBtnUpdate(item)}
                    className="btn btn-warning mx-3">update</button>
                  <button
                    onClick={() => props.handleClickBtnDelete(item)}
                    className="btn btn-danger"
                  >delete</button>
                </td>
              </tr>
            )
          })}
          {listUsers && listUsers.length === 0 &&
            <tr>
              <td colSpan={"4"}> not  found data</td>

            </tr>}
        </tbody>
      </table>
      <div className="user-pagination">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  )
}
export default TableUserPaginate;