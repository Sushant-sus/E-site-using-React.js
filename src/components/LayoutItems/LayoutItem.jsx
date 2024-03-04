import React, { useEffect, useState } from "react";
import { layoutitemlist } from "../Api";
import { useParams } from "react-router-dom";

const LayoutItemList = () => {
  const { layoutId } = useParams();
  const [layoutItems, setLayoutItems] = useState([]);

  useEffect(() => {
    fetchLayoutItems();
  }, [layoutId]);

  const fetchLayoutItems = async () => {
    try {
      const data = await layoutitemlist();
      const filteredItems = data.filter(
        (item) => item.layoutId === parseInt(layoutId)
      );
      setLayoutItems(filteredItems);
    } catch (error) {
      console.error("Error fetching layout items:", error);
    }
  };

  return (
    <div className="grid items-center h-screen p-4 layout">
      <div className="grid grid-cols-4 gap-4">
        {layoutItems.map((item, index) => (
          <div key={index} className="grid-item">
            <img
              src={item.image}
              alt={`Image ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoutItemList;
