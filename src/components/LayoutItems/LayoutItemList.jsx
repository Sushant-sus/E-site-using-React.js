import React, { useState, useEffect } from "react";
import New from "./New";
import Edit from "./Edit";
import "../Layout/Layout.css";
import {
  LayoutItemEditPost,
  addLayoutItem,
  layoutitemlist,
  layoutindexlistGet,
} from "../Api";
import { useParams } from "react-router";
import { LayoutItemDeletePost } from "../Api";

function LayoutItemList() {
  const { layoutId } = useParams();

  const [showNew, setShowNew] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [layoutData, setLayoutData] = useState([]);
  const [selectedLayoutId, setSelectedLayoutId] = useState(null);

  useEffect(() => {
    fetchLayoutData();
  }, []);

  const fetchLayoutData = async () => {
    try {
      debugger;
      const data = await layoutindexlistGet();
      // const filteredData = data.filter(
      //   (item) => item.layoutId === parseInt(layoutId)
      // ); // Filter data based on layoutId
      setLayoutData(data);
    } catch (error) {
      console.error("Error fetching layout data:", error);
    }
  };

  const columnNames = [
    { header: "Layout Item ID", accessor: "layoutItemId" },
    { header: "Logo", accessor: "logo" },
    { header: "Image", accessor: "image" },

    { header: "Type", accessor: "type" },
    { header: "Title", accessor: "title" },
    { header: "Layout ID", accessor: "layoutId" },
    // { header: "Display Order", accessor: "displayOrder" },
    { header: "Featured", accessor: "featured" },
    { header: "Subtitle 1", accessor: "subtitle1" },
    { header: "Subtitle 2", accessor: "subtitle2" },
    { header: "Subtitle 3", accessor: "subtitle3" },
    { header: "Extra Info 1", accessor: "extraInfo1" },
    { header: "Extra Info 2", accessor: "extraInfo2" },
    // { header: "Parent Layout Item ID", accessor: "parentLayoutItemId" },
    // { header: "Logo File", accessor: "logoFile" },
    // { header: "Image File", accessor: "imagefile" },
  ];

  // Function to handle edit button click
  const handleEdit = (layoutItemId) => {
    setSelectedLayoutId(layoutItemId);
    setShowEdit(true);
  };

  // Function to handle update after editing
  const handleUpdate = async (updatedData) => {
    try {
      // Make API call to update layout item
      await LayoutItemEditPost(updatedData);
      // Fetch updated layout data after updating the item
      await fetchLayoutData();
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating layout item:", error);
    }
  };

  // Function to handle delete button click
  const handleDelete = async (layoutItemId) => {
    try {
      debugger;
      LayoutItemDeletePost(layoutItemId);
    } catch (error) {
      console.error("Error deleting layout item:", error);
    }
  };

  // Function to handle adding a new item
  const handleAdd = async (formData) => {
    try {
      debugger;
      await addLayoutItem(formData);
      await fetchLayoutData();
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

  return (
    <div className="mx-auto p-4 h-screen layout">
      <div className="flex justify-between items-center my-2">
        <h2 className="text-2xl font-bold mb-4 bg-slate-200 p-1 rounded-lg text-green-700 cursor-pointer">
          Layout Item Table
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
        <tbody className="bg-slate-100 ">
          {layoutData.map((layoutItem, rowIndex) => (
            <tr className="text-center" key={rowIndex}>
              {columnNames.map((column, colIndex) => (
                <td key={colIndex} className="border border-x-2">
                  {column.accessor === "image" || column.accessor === "logo" ? (
                    <img
                      src={layoutItem[column.accessor]}
                      alt=""
                      className="w-full h-auto"
                    />
                  ) : (
                    layoutItem[column.accessor]
                  )}
                </td>
              ))}
              <td className="flex justify-center p-1 my-">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mr-2"
                  onClick={() => handleEdit(layoutItem.layoutItemId)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg"
                  onClick={() => handleDelete(layoutItem.layoutItemId)}
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
            (item) => item.layoutItemId === selectedLayoutId
          )}
          onClose={handleClose}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}

export default LayoutItemList;
