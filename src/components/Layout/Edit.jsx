import React, { useState, useEffect } from "react";
import { LayoutEditPost } from "../Api";

function Edit({ onSubmit, onClose, rowData }) {
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

  const [formData, setFormData] = useState({});

  // Update formData state when rowData prop changes
  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update layout item
      await LayoutEditPost(formData);
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error updating layout item:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-[60%]">
        <h2 className="text-lg font-semibold mb-4 bg-slate-200 w-fit p-2 rounded-lg">
          Edit Layout
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-4 my-8 gap-10">
          {columnNames.map((column) => (
            <div key={column.accessor}>
              <label
                htmlFor={column.accessor}
                className="block font-medium mb-1"
              >
                {column.header}
              </label>
              <input
                type="text"
                id={column.accessor}
                name={column.accessor}
                value={formData[column.accessor] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}
          <div className="col-span-4 flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="update"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
