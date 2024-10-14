import axios from "axios";
import React, { useEffect, useState } from "react";

const API = "https://6631e14cc51e14d69562ac56.mockapi.io/Mtaxi";

function Apple() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await axios.get(API);
        const itemsWithTimers = res.data.map((item) => ({
          ...item,
          count: 10800, // Initial count for each item
        }));
        setItems(itemsWithTimers);
      } catch (error) {
        console.log(error);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          count: item.count > 0 ? item.count - 1 : 0, // Decrease the timer for each item
        }))
      );
    }, 1000);

    return () => clearInterval(interval); // Clear the interval on component unmount
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setItems((prevItems) => prevItems.filter((i) => i.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <div className="app__logo">
          <div className="logo">MTAXI</div>
          <h1>@</h1>
        </div>
        <div className="app__product">
          {items.map((item) => (
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
                {formatCount(
                  formatCountS(formatCountM(formatCountH(item.count)))
                )}
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
