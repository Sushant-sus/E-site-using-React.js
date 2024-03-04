import React, { useState, useEffect } from "react";
import { LayoutItemEditPost } from "../Api";

function Edit({ onSubmit, onClose, rowData }) {
  const columnNames = [
    { header: "Layout Item ID", accessor: "layoutItemId", type: "number" },
    { header: "Type", accessor: "type", type: "string" },
    { header: "Title", accessor: "title", type: "string" },
    { header: "Layout ID", accessor: "layoutId", type: "number" },
    { header: "Display Order", accessor: "displayOrder", type: "number" },
    { header: "Featured", accessor: "featured", type: "boolean" },
    { header: "Image", accessor: "image", type: "string" },
    { header: "Subtitle 1", accessor: "subtitle1", type: "string" },
    { header: "Subtitle 2", accessor: "subtitle2", type: "string" },
    { header: "Subtitle 3", accessor: "subtitle3", type: "string" },
    { header: "Logo", accessor: "logo", type: "string" },
    { header: "Extra Info 1", accessor: "extraInfo1", type: "string" },
    { header: "Extra Info 2", accessor: "extraInfo2", type: "string" },
    {
      header: "Parent Layout Item ID",
      accessor: "parentLayoutItemId",
      type: "number",
    },
    { header: "Logo File", accessor: "logoFile", type: "string" },
    { header: "Image File", accessor: "imagefile", type: "string" },
  ];

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(rowData);
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await LayoutItemEditPost(formData);
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
              type="submit"
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
