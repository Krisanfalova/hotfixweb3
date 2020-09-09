import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import edit from '../img/edit.svg';
import './Home.css';

const Home = ({ foodAreas, order }) => (
  <React.Fragment>
    <ul className="Home">
      {foodAreas.map((area) => (
        <li
          key={area.id}
        >
          <div className="Home__fixed-content">
            <header className="Home__header">
              <h1 className="Home__head">
                <Link to="/" className="Home__logo">
                  {area.name}
                </Link>
              </h1>
              <Link to="/" className="Home__change-tz">
                <img
                  className="Home__edit"
                  alt="change-profile"
                  src={edit}
                />
              </Link>
            </header>
            <ul className="Home__tabs">
              <li className="Home__tab Home__tab_active">
                Еда
              </li>
              {/* <li className="Home__tab Home__tab_disabled">
                Развлечения
              </li>
              <li className="Home__tab Home__tab_disabled">
                Здоровье
              </li> */}
            </ul>
          </div>
          <ul className="Home__items">
            {area.items.map(item => (
              <li
                className="Home__item"
                key={item.id}
              >
                <Link
                  className="Home__food-link"
                  to={item.link}
                >
                  <img
                    alt={item.name}
                    className="Home__image"
                    src={item.image}
                  />
                  <h3 className="Home__food-name">
                    {item.name}
                  </h3>
                  <p className="Home__food-type">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    {Object.keys(order).length !== 0 && (
      <footer className="Footer">
        <Link to="/orders" className="Footer__orders">
					Мои заказы
        </Link>
      </footer>
    )}
  </React.Fragment>
);

Home.propTypes = {
  foodAreas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })),
  })),
};

Home.defaultProps = {
  foodAreas: [],
};

export default Home;
