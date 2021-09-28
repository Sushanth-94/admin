import React, { useEffect, useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import AdminTable from "./components/adminTable/AdminTable";
import "./index.css";
import Pagination from "./components/pagination/Pagination";

export default function App() {
  const [inputValue, setinputValue] = useState("");
  const [tableData, settableData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [toggleEdit, settoggleEdit] = useState("");
  const [currentPage, setcurrentPage] = useState(0);
  const [totDataCount, setTotDataCount] = useState(0);

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
      setTotDataCount(decodedResp.length);
      onPageChange(0, decodedResp);
      // setfilteredData(decodedResp);
    } catch (error) {
      console.log(error);
    }
  };

  const onPageChange = (pageNum, data) => {
    // 0
    const count = 10 * (pageNum + 1);
    const existingData = data
      ? data
      : inputValue.length > 0
      ? tableData.filter((dat) => {
          return (
            dat.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            dat.email.toLowerCase().includes(inputValue.toLowerCase()) ||
            dat.role.toLowerCase().includes(inputValue.toLowerCase())
          );
        })
      : tableData;
    const fetchedData = existingData.filter((dat, index) => {
      return index >= count - 10 && index < count;
    });
    setfilteredData(fetchedData);
    setcurrentPage(pageNum);
  };

  const searchFilter = (val) => {
    setinputValue(val);
    const newfilteredData = tableData.filter((dat) => {
      return (
        dat.name.toLowerCase().includes(val.toLowerCase()) ||
        dat.email.toLowerCase().includes(val.toLowerCase()) ||
        dat.role.toLowerCase().includes(val.toLowerCase())
      );
    });
    setTotDataCount(newfilteredData.length);
    onPageChange(currentPage, newfilteredData, true);
    // setfilteredData(newfilteredData);
  };

  const onDeleteItem = (id) => {
    const ids = typeof id === "string" ? [id] : [...id];
    const filteredData = tableData.filter((dat) => {
      return !ids.includes(dat.id);
    });
    settableData(filteredData);
    setTotDataCount(filteredData.length);
    onPageChange(currentPage, filteredData);
    // setfilteredData(filteredData);
    setinputValue("");
  };

  const onEditItem = (value, id, val) => {
    const selectedItem = tableData.findIndex((dat) => dat.id === id);
    const filteredItems = [...tableData];
    filteredItems[selectedItem][val] = value;

    settableData(filteredItems);
    onPageChange(currentPage, filteredItems);
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
      <Pagination pages={totDataCount} onPageChange={onPageChange} />
    </div>
  );
}
