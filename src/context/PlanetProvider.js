import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PlanetContext } from './PlanetContext';

export default function PlanetProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data.results);
    };
    fetchAPI();
  }, []);

  return (
    <PlanetContext.Provider value={ { planets, setPlanets } }>
      {children}
    </PlanetContext.Provider>
  );
}

PlanetProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
