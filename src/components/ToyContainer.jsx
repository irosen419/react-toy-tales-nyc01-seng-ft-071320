import React from 'react';
import ToyCard from './ToyCard'

const renderToyCards = (props) => {
  return props.toys.map(toy => <ToyCard toy={toy} appLikeHandler={props.appLikeHandler} appDonateHandler={props.appDonateHandler} />)
}

const ToyContainer = (props) => {
  return (
    <div id="toy-collection">
      {renderToyCards(props)}
    </div>
  );
}

export default ToyContainer;
