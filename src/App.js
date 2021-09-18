import React, { useEffect, useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import AdminTable from "./components/adminTable/AdminTable";
import "./index.css";

export default function App() {
  const [inputValue, setinputValue] = useState("");
  const [tableData, settableData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [toggleEdit, settoggleEdit] = useState("");

  useEffect(() => {
    const URL =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    fetchData(URL);
  }, []);

  const fetchData = async (URL) => {
    try {
      const jsonResp = await fetch(URL);
      const decodedResp = await jsonResp.json();
      settableData(decodedResp);
      setfilteredData(decodedResp);
    } catch (error) {
      console.log(error);
    }
  };

  const searchFilter = (val) => {
    setinputValue(val);
    const filteredData = tableData.filter((dat) => {
      return (
        dat.name.toLowerCase().includes(val.toLowerCase()) ||
        dat.email.toLowerCase().includes(val.toLowerCase()) ||
        dat.role.toLowerCase().includes(val.toLowerCase())
      );
    });
    setfilteredData(filteredData);
  };

  const onDeleteItem = (id) => {
    const ids = [...id];
    const filteredData = tableData.filter((dat) => {
      return !ids.includes(dat.id);
    });
    settableData(filteredData);
    setfilteredData(filteredData);
    setinputValue("");
  };

  const onEditItem = (value, id, val) => {
    // console.log(value, id, name);
    const selectedItem = tableData.findIndex((dat) => dat.id === id);
    const filteredItems = [...tableData];
    filteredItems[selectedItem][val] = value;

    // console.log(filteredItems);
    settableData(filteredItems);
    setfilteredData(filteredItems);
    setinputValue("");
  };

  return (
    <div className="appContainer">
      <SearchBar
        inputValue={inputValue}
        handleInputChange={(val) => {
          searchFilter(val);
        }}
      />
      <AdminTable
        data={filteredData}
        onDeleteItem={onDeleteItem}
        editMode={toggleEdit}
        editItem={(val, id, name) => onEditItem(val, id, name)}
        onToggleEdit={(val) => settoggleEdit(val)}
      />
    </div>
  );
}
