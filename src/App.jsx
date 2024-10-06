import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

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
              <div className="app__price">
                <h2>MoneyTaxi:</h2>
                <h2>{item.price}₽</h2>
                <h2>{item.payeer}</h2>
              </div>
              <div className="app__price">
                <div className="apple">
                  <div className="app__time">
                    <h2>{item.number}</h2>
                    <h2 style={{ color: "blue" }}>36:59:59</h2>
                  </div>
                  <h2>{item.category}</h2>
                </div>
                <div className="app__price" style={{ gap: "3px" }}>
                  <h3>№{item.id}</h3>
                  <MdOutlineDeleteOutline
                    className="icon"
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Apple;
