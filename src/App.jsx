import axios from "axios";
import React, { useEffect, useState } from "react";

const API = "https://6631e14cc51e14d69562ac56.mockapi.io/Mtaxi";

function Apple() {
  const [item, setItem] = useState([]);

  const handleClick = async () => {
    try {
      const res = await axios.get(API);
      setItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setItem((prevItems) => prevItems.filter((i) => i.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="app__logo">
          <div className="logo">MTAXI</div>
          <h1>@</h1>
        </div>
        <div className="app__product">
          {item.map((item) => (
            <div key={item.id} className="app__data">
              <img src={item.image} alt="image" />

              <div className="app__mbank">
                <h2>{item.card}</h2>
                <h2>{item.payeer}</h2>
              </div>

              <div className="app__mbank">
                <h2>{item.category}</h2>
                <h2>{item.price} сом</h2>
              </div>
              <h2>02:59:59</h2>
              <button onClick={() => handleDelete(item.id)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Apple;
