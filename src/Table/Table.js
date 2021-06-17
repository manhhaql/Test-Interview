import React, { useEffect, useState } from "react";

const Table = () => {
  const [datas, setDatas] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [userModifying, setUserModifying] = useState();

  // fetch data from API
  useEffect(() => {
    fetch("https://6069981de1c2a10017544b18.mockapi.io/company")
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  // handle toggle modal and data need modify
  const onEditClick = (item) => {
    setShowModalEdit(true);
    setUserModifying(item);
  };

  const onDeleteClick = (item) => {
    setShowModalDelete(true);
    setUserModifying(item);
  };

  // delete record when click Yes
  const deleteUser = (userId) => {
    fetch(`https://6069981de1c2a10017544b18.mockapi.io/company/${userId}`, {
      method: "DETELE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        const newUsers = datas.filter((user) => user.id !== userId);
        setDatas(newUsers);
      })
      .catch((err) => console.log(err));
  };

  // edit record when click Save Changes
  const updateUser = (userId) => {
    // fetch update api here
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((item) => (
            <tr key={item.id}>
              <td>{item.customer}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <button
                  onClick={() => onEditClick(item)}
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  style={{ marginRight: "4px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteClick(item)}
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={`modal fade ${showModalEdit ? "show" : ""}`}
        id="exampleModal"
        style={{ display: showModalEdit ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setShowModalEdit(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Email: {userModifying?.email}</p>
              <p>Name: {userModifying?.name}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModalEdit(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => updateUser(userModifying.id)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${showModalDelete ? "show" : ""}`}
        id="exampleModal"
        style={{ display: showModalDelete ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setShowModalDelete(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Do you want to delete?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModalDelete(false)}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => deleteUser(userModifying?.id)}
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
