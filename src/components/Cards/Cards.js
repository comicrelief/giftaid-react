import React from 'react';
import CardData from './Cards.json';

const Card = () => (
  <div className="cards cards--three-grid-centre cards--three-grid-unit">
    <div className="cards__wrapper">
      {
      CardData.map(element => (
        <div className="cards__item" key={element.id}>
          <div className={`cards__image cards__item--${element.id}`} />
          <div className="cards__content-wrapper">
            <div className="cards__content">
              <p>{element.description}</p>
              <p>
                <a
                  href={element.urlsource}
                  className="link link--black"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {element.title}
                </a>
              </p>
            </div>
          </div>
        </div>

      ))
    }

    </div>
    <a href="https://www.comicrelief.com/your-impact" className="btn btn--red">Read More</a>
  </div>
);

export default Card;
