import { useState } from 'react';
import PropTypes from 'prop-types';
import { PlanetContext } from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState();

  const fetchAPI = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data.results);
    } catch (errors) {
      setError(errors);
    }
  };
  return (
    <PlanetContext.Provider value={ { planets, fetchAPI, error } }>
      { children }
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
