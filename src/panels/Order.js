назimport React from 'react';
import { Link, withRouter } from 'react-router-dom';

import edit from '../img/edit.svg';
import './place.css';


const Order = ({ match: { params: { areaId, itemId }}, history, foodAreas, setActiveOrder }) => {
  const area = foodAreas.filter(area => area.id === areaId)[0];
  const item = area.items.filter(item => item.id === itemId)[0];

  return (
    <div className="Place Place_order">
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
      <div className="Place__order-body">
        <h3 className="Place__order-number-header">
          Номер вашего заказа
        </h3>
        <main className="Place__order-number">
          7
        </main>
        <p className="Place__order-number-header">
          Заказ будет готов через
        </p>
        <h3 className="Place__order-time">
          ~ 15 минут
        </h3>
      </div>
      <footer className="Place__footer">
        <div 
          to="/orders" 
          className="Place__order"
          onClick={() => {
            setActiveOrder({ itemId });

            setTimeout(() => {
              history.push('/orders');
            }, 0);
          }}
        >
          Мои заказы
        </div>
      </footer>
    </div>
  );
};

Order.defaultProps = {
  setActiveOrder: () => {},
};

export default withRouter(Order);
