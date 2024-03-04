import React, { useState } from "react";

function New({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    layoutItemId: 0,
    type: "",
    title: "",
    layoutId: 0,
    displayOrder: 0,
    featured: true,
    image: "",
    subtitle1: "",
    subtitle2: "",
    subtitle3: "",
    logo: "",
    extraInfo1: "",
    extraInfo2: "",
    parentLayoutItemId: 0,
    // logoFile: null,
    // imagefile: null
  });
  const columnNames = [
    // { header: "Layout Item ID", accessor: "layoutItemId" },
    { header: "Type", accessor: "type" },
    { header: "Title", accessor: "title" },
    { header: "Layout ID", accessor: "layoutId" },
    { header: "Display Order", accessor: "displayOrder" },
    // { header: "Featured", accessor: "featured" },
    { header: "Image", accessor: "image" },
    { header: "Subtitle 1", accessor: "subtitle1" },
    { header: "Subtitle 2", accessor: "subtitle2" },
    { header: "Subtitle 3", accessor: "subtitle3" },
    { header: "Logo", accessor: "logo" },
    { header: "Extra Info 1", accessor: "extraInfo1" },
    { header: "Extra Info 2", accessor: "extraInfo2" },
    { header: "Parent Layout Item ID", accessor: "parentLayoutItemId" },
    // { header: "Logo File", accessor: "logoFile" },
    // { header: "Image File", accessor: "imagefile" },
  ];

  // Initialize formData state with empty values for all columns
  // const [formData, setFormData] = useState(
  //   Object.fromEntries(columnNames.map((column) => [column.accessor, ""]))
  // );

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData(
      Object.fromEntries(columnNames.map((column) => [column.accessor, ""]))
    );
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-[60%]">
        <h2 className="text-lg font-semibold mb-4 bg-slate-200 w-fit p-2 rounded-lg">
          Add New Layout Item
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
                value={formData[column.accessor]}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;
