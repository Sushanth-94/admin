import React from "react";
import "./AdminTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function AdminTable({ data, onDeleteItem, editMode, editItem, onToggleEdit }) {
  const tableHeader = (
    <section className="gridWrapper">
      <div className="grid">
        <input name={"Select all"} value={"Select all"} type="checkbox" />
      </div>
      <div className="grid">Name</div>
      <div className="grid">Email</div>
      <div className="grid">Role</div>
      <div className="grid">Actions</div>
    </section>
  );

  const tableData = data.map((dat) => {
    return (
      <section className="gridWrapper" key={dat.id}>
        <div className="childGrid">
          <input name={dat.id} value={dat.id} type="checkbox" />
        </div>
        <div className="childGrid">
          {editMode === dat.id ? (
            <input
              type="text"
              name="name"
              value={dat.name}
              onChange={(e) => {
                editItem(e.target.value, dat.id, e.target.name);
              }}
            />
          ) : (
            dat.name
          )}
        </div>
        <div className="childGrid">
          {editMode === dat.id ? (
            <input
              type="text"
              name="email"
              value={dat.email}
              onChange={(e) => {
                editItem(e.target.value, dat.id, e.target.name);
              }}
            />
          ) : (
            dat.email
          )}
        </div>
        <div className="childGrid">
          {editMode === dat.id ? (
            <input
              type="text"
              name="role"
              value={dat.role}
              onChange={(e) => {
                editItem(e.target.value, dat.id, e.target.name);
              }}
            />
          ) : (
            dat.role
          )}
        </div>
        <div className="childGrid">
          {editMode === dat.id ? (
            <FontAwesomeIcon
              icon={faCheck}
              onClick={() => onToggleEdit("")}
              className="checkIcon"
            />
          ) : (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => onToggleEdit(dat.id)}
              className="editIcon"
            />
          )}
          <FontAwesomeIcon
            onClick={() => onDeleteItem(dat.id)}
            icon={faTrash}
            className="delIcon"
          />
        </div>
      </section>
    );
  });
  return (
    <React.Fragment>
      {tableHeader}
      {tableData}
    </React.Fragment>
  );
}

export default AdminTable;
