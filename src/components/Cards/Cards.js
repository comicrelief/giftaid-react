import React from 'react';
import cardImageOne from './images/kevin-card.jpg';
import cardImageTwo from './images/aziza-card.jpg';
import cardImageThree from './images/georgia-card.jpg';
import './Cards.scss';

const Card = () => (
  <div className="cards cards--three-grid-centre">
    <div className="cards__wrapper">
      <div className="cards__item">
        <div className="cards__image">
          <img src={cardImageOne} alt="Kevin's story" />
        </div>
        <div className="cards__content-wrapper">
          <div className="cards__content">
            <p>&quot;If it wasn&#39;t for this place, I would be dead.&quot;</p>
            <p>
              <a className="link" href="https://www.sportrelief.com/where-your-money-goes/kevin" target="_blank" rel="noopener noreferrer">Kevin&#39;s story</a>
            </p>
          </div>
        </div>
      </div>
      <div className="cards__item">
        <div className="cards__image">
          <img src={cardImageTwo} alt="Aziza's story" />
        </div>
        <div className="cards__content-wrapper">
          <div className="cards__content">
            <p className="font--large">&quot;Malaria impacts my daily life.&quot;</p>
            <p>
              <a className="link" href="https://www.sportrelief.com/where-your-money-goes/aziza/" target="_blank" rel="noopener noreferrer">Aziza&#39;s story</a>
            </p>
          </div>
        </div>
      </div>
      <div className="cards__item">
        <div className="cards__image">
          <img src={cardImageThree} alt="Georgia's story" />
        </div>
        <div className="cards__content-wrapper">
          <div className="cards__content">
            <p>&quot;I got really ill, I felt I was up to failure.&quot;</p>
            <p>
              <a className="link" href="https://www.sportrelief.com/where-your-money-goes/georgia" target="_blank" rel="noopener noreferrer">Georgia&#39;s story</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <a href="https://www.comicrelief.com/your-impact" className="btn btn--red">Read More</a>
  </div>
);

export default Card;
