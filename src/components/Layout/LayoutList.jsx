import React, { useState, useEffect } from "react";
import New from "./New";
import Edit from "./Edit";
import "./Layout.css";
import {
  layoutlist,
  LayoutEditPost,
  addLayout,
  LayoutDeletePost,
} from "../Api";
import { useNavigate } from "react-router-dom";

function LayoutTable() {
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [layoutData, setLayoutData] = useState([]);
  const [selectedLayoutId, setSelectedLayoutId] = useState(null);

  useEffect(() => {
    fetchLayoutData();
  }, []);

  const fetchLayoutData = async () => {
    try {
      const data = await layoutlist();
      setLayoutData(data);
    } catch (error) {
      console.error("Error fetching layout data:", error);
    }
  };

  const columnNames = [
    { header: "Layout ID", accessor: "layoutId" },
    { header: "Layout", accessor: "layout" },
    { header: "Display Order", accessor: "displayOrder" },
    { header: "Title", accessor: "title" },
    { header: "Tagline", accessor: "tagline" },
    { header: "Slider Link JSON", accessor: "sliderLinkJSON" },
    { header: "See More JSON", accessor: "seeMoreJSON" },
    { header: "See More", accessor: "seeMore" },
    { header: "Ratio", accessor: "ratio" },
    { header: "Web Display Order", accessor: "webdisplayorder" },
    { header: "Allow Display", accessor: "allowwebdisplay" },
  ];

  // Function to handle edit button click
  const handleEdit = (layoutId) => {
    console.log(`Edit layout with id ${layoutId}`);
    setSelectedLayoutId(layoutId);
    setShowEdit(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      // Make API call to update layout item
      await LayoutEditPost(updatedData);
      await fetchLayoutData();
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating layout item:", error);
    }
  };

  // Function to handle delete button click
  const handleDelete = async (layoutId) => {
    try {
      console.log("delete layoutId:", layoutId);

      await LayoutDeletePost(layoutId);
      // Filter out the deleted item from layoutData
      setLayoutData((prevLayoutData) =>
        prevLayoutData.filter((item) => item.layoutId !== layoutId)
      );
    } catch (error) {
      console.error("Error deleting layout item:", error);
    }
  };

  // Function to handle adding a new item
  const handleAdd = async (formData) => {
    try {
      await addLayout(formData);
      await fetchLayoutData();
      console.log("formData:", formData);
      setShowNew(false);
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  // Function to handle closing the popup
  const handleClose = () => {
    setShowNew(false);
    setShowEdit(false);
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="mx-auto p-4 h-screen layout">
      <div className="flex justify-between items-center my-2">
        <h2
          className="text-2xl font-bold mb-4 bg-slate-200 p-1 rounded-lg text-green-700 cursor-pointer"
          onClick={handleHome}
        >
          Layout Table
        </h2>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={() => setShowNew(true)}
        >
          New
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="text-green-700 bg-slate-200">
          <tr>
            {columnNames.map((column, index) => (
              <th key={index} className="border border-gray-300 p-2">
                {column.header}
              </th>
            ))}
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {layoutData.map((layoutItem, rowIndex) => (
            <tr className="text-center bg-slate-100" key={rowIndex}>
              {columnNames.map((column, colIndex) => (
                <td key={colIndex} className="border border-x-2">
                  {layoutItem[column.accessor]}
                </td>
              ))}
              <td className="flex justify-center p-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mr-2"
                  onClick={() => handleEdit(layoutItem.layoutId)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg"
                  onClick={() => handleDelete(layoutItem.layoutId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showNew && <New onAdd={handleAdd} onClose={handleClose} />}
      {showEdit && (
        <Edit
          rowData={layoutData.find(
            (item) => item.layoutId === selectedLayoutId
          )}
          onClose={handleClose}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}

export default LayoutTable;
