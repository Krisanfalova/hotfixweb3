import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import accounting from 'accounting';
// import PropTypes from 'prop-types';

import edit from '../img/edit.svg';
import './place.css';


const Place = ({ item, order, onIncrementPosition, onDecrementPosition, area }) => {
  const price = useMemo(() => {
    const foodIds = new Set((item.foods || []).map(item => item.id));

    const result = Object.values(order)
      .filter((value) => {
        const { item: { id }} = value;

        return foodIds.has(id);
      })
      .reduce((result, value) => {
        const { count, item: { price }} = value;

        return result + parseInt(price) * parseInt(count);
      }, 0);

    return accounting.formatNumber(result, 0, ' ');
  }, [ order, item ]);

  return (
    <div className="Place">
      <header className="Place__header">
        <aside className="Place__trz">
          <h1 className="Place__head">
            <Link to="/" className="Place__logo">
              {area.name}
            </Link>
          </h1>
          <Link to="/edit" className="Place__change-tz">
          <img
            alt="change-profile"
            src={edit}
          />
          </Link>
        </aside>
      </header>
      <aside className="Place__restoraunt">
        <img
          className="Place__restoraunt-logo"
          alt="Fastfood logo"
          src={item.image}
        />
        <h2
          className="Place__restoraunt-name"
        >
          {item.name}
        </h2>
        <p className="Place__restoraunt-type">
          {item.description}
        </p>
      </aside>
      <ul className="Place__foods">
        {item.foods.map((food => (
          <li
            className="Place__food"
            key={food.id}
          >
            <div className="Place__food-logo-wrapper">
              <img
                alt="food logo"
                className="Place__food-logo"
                src={food.image}
              />
            </div>
            <h3 className="Place__food-name">
              {food.name}
            </h3>
            <p className="Place__food-composition">
              {food.composition}
            </p>
            <div className="Place__food-price">
              <span className=".Place__food-price-price">Цена: {food.price}&nbsp;&nbsp;</span>
              <button
                className="Place__food-button"
                onClick={() => {
                  onDecrementPosition({ id: food.id, itemId: item.id, areaId: area.id });
                }}
              >
                -
              </button>
              <span>&nbsp;{food.id in order ? order[food.id].count : 0}&nbsp;</span>
              <button
                className="Place__food-button"
                onClick={() => {
                  onIncrementPosition({ id: food.id, itemId: item.id, areaId: area.id });
                }}
              >
                +
              </button>
            </div>
          </li>
        )))}
      </ul>
      <footer className="Place__footer">
        <Link to={`/basket/${area.id}/${item.id}`} className="Place__order">
          Оформить заказ ({price})
        </Link>
      </footer>
    </div>
  );
};

Place.defaultProps = {
  item: {},
  onIncrementPosition: () => {},
  onDecrementPosition: () => {},
};

export default Place;
