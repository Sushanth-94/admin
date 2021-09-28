import React, { useState } from "react";
import "./AdminTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function AdminTable({ data, onDeleteItem, editMode, editItem, onToggleEdit }) {
  const [selectedCheckboxes, setselectedCheckboxes] = useState([]);

  const onChange = (id) => {
    let selected = [...selectedCheckboxes];
    let checkboxFound = selectedCheckboxes.indexOf(id);
    if (id === "0") {
      if (checkboxFound > -1) {
        selected.splice(0, selected.length);
      } else {
        const ids = data.map((dat) => {
          return `${dat.id}`;
        });
        selected.push("0", ...ids);
      }
    } else {
      if (checkboxFound > -1) {
        selected.splice(checkboxFound, 1);
      } else {
        selected.push(id);
      }
    }
    setselectedCheckboxes(selected);
  };

  const tableHeader = (
    <section className="gridWrapper">
      <div className="grid">
        <input
          name={"Select all"}
          value={"Select all"}
          type="checkbox"
          onChange={() => onChange("0")}
          checked={selectedCheckboxes.includes("0")}
        />
      </div>
      <div className="grid">Name</div>
      <div className="grid">Email</div>
      <div className="grid">Role</div>
      <div className="grid">Actions</div>
    </section>
  );

  const tableData = data.map((dat) => {
    const isSelected = selectedCheckboxes.includes(dat.id);
    return (
      <section
        className="gridWrapper"
        key={dat.id}
        style={{
          backgroundColor: isSelected ? "#dfd7d733" : "white",
        }}
      >
        <div className="childGrid">
          <input
            onChange={() => onChange(dat.id)}
            checked={isSelected}
            name={dat.id}
            value={dat.id}
            type="checkbox"
          />
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

  const tableFooter = (
    <button
      className="deleteSelectedBtn"
      onClick={() => {
        setselectedCheckboxes([]);
        onDeleteItem(selectedCheckboxes);
      }}
    >
      Delete selected
    </button>
  );
  return (
    <React.Fragment>
      {tableHeader}
      {tableData}
      {tableFooter}
    </React.Fragment>
  );
}

export default AdminTable;
