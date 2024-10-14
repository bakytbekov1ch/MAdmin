import axios from "axios";
import React, { useEffect, useState } from "react";

const API = "https://6631e14cc51e14d69562ac56.mockapi.io/Mtaxi";

function Apple() {
  const [item, setItem] = useState([]);
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? parseInt(savedCount, 10) : 10800;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const newCount = prev > 0 ? prev - 1 : 0;
        localStorage.setItem("count", newCount);
        return newCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatCount = (count) => {
    return count < 10000 ? `0${count}` : count;
  };

  const formatCountS = (count) => {
    return count < 1000 ? `0${count}` : count;
  };

  const formatCountM = (count) => {
    return count < 100 ? `0${count}` : count;
  };

  const formatCountH = (count) => {
    return count < 10 ? `0${count}` : count;
  };

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
              <h2>
                {formatCount(formatCountS(formatCountM(formatCountH(count))))}
              </h2>
              <button onClick={() => handleDelete(item.id)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Apple;
