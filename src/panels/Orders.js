import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import refresh from '../img/refresh-button.svg';
import './orders.css';


const Orders = ({ order, orderStatuses, foodAreas, setFinishedOrder, setActiveOrder }) => {
  const activeOrders = useMemo(() => {
    const activeOrdersList = Object.keys(orderStatuses)
      .filter(shopId => orderStatuses[shopId] === 'ACTIVE')
      .map(shopId => shopId);

    const result = [];
    const activeOrdersSet = new Set(activeOrdersList);

    foodAreas.forEach((area) => {
      area.items.forEach(item => {
        if (activeOrdersSet.has(item.id)) {
          const data = {
            placeId: area.id,
            placeName: area.name,
            shopId: item.id,
            shopName: item.name,
            price: item.foods.reduce((result, food) => {
              if (food.id in order) {
                const { item: { price }, count } = order[food.id];

                return result + parseInt(price) * parseInt(count);
              }

              return result;
            }, 0),
            link: `/order/${area.id}/${item.id}`,
          };

          result.push(data);
        }
      });
    });

    return result;
  }, [ order, orderStatuses, foodAreas ]);

  const finishedOrders = useMemo(() => {
    const activeOrdersList = Object.keys(orderStatuses)
      .filter(shopId => orderStatuses[shopId] !== 'ACTIVE')
      .map(shopId => shopId);

    const result = [];
    const activeOrdersSet = new Set(activeOrdersList);

    foodAreas.forEach((area) => {
      area.items.forEach(item => {
        if (activeOrdersSet.has(item.id)) {
          const data = {
            placeName: area.name,
            shopName: item.name,
            shopId: item.id,
            price: item.foods.reduce((result, food) => {
              if (food.id in order) {
                const { item: { price }, count } = order[food.id];

                return result + parseInt(price) * parseInt(count);
              }

              return result;
            }, 0),
            link: `/order/${area.id}/${item.id}`,
          };

          result.push(data);
        }
      });
    });

    return result;
  }, [ order, orderStatuses, foodAreas ]);

  return (
    <div className="Orders">
      <ul className="Orders__active-orders">
        {activeOrders.map(order => (
          <li
            className="Orders__active-order"
            key={order.link}
          >
            <div className="Orders__left">
              <h3 className="Orders__header">{order.placeName}</h3>
              <p className="Orders__shop-name">{order.shopName}</p>
              <p className="Orders__price">Сумма {order.price} - Оплачено</p>
            </div>
            <div className="Orders__time">
              ~ 15 М
            </div>
            <Link
              className="Orders__change"
              to={`/place/${order.placeId}/${order.shopId}`}
            >
              Изм
            </Link>
            <button
              className="Orders__cancel"
              onClick={() => {
                setFinishedOrder({ itemId: order.shopId });
              }}
            >
              Отм.
            </button>
          </li>
        ))}
      </ul>
      <ul className="Orders__finished-orders">
        {finishedOrders.map(order => (
          <li
            className="Orders__finished-order"
            key={order.link}
          >
            <div className="Orders__left">
              <h3 className="Orders__header Orders__dark">{order.placeName}</h3>
              <p className="Orders__shop-name Orders__pink">{order.shopName}</p>
              <p className="Orders__price Orders__pink">Сумма {order.price} - Оплачено</p>
            </div>
            <button
              className="Orders__repeat"
              onClick={() => {
                setActiveOrder({ itemId: order.shopId });
              }}
            >
              <img
                className="Orders__refresh"
                alt="repeat order"
                src={refresh}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Orders.defaultProps = {
  setFinishedOrder: () => {},
  setActiveOrder: () => {},
};

export default Orders;
