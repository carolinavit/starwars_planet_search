import React, { useContext, useEffect, useState } from 'react';
import { PlanetContext } from '../context/PlanetContext';

export default function Table() {
  const { planets } = useContext(PlanetContext);
  const [filterName, setFilterName] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const filteredNames = planets.filter((planet) => planet.name.includes(filterName));
    setFilteredPlanets(filteredNames);
  }, [filterName]);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const filterPlanets = () => {
    let filteredPln = [];

    if (comparisonFilter === 'maior que') {
      filteredPln = planets.filter(
        (planet) => Number(planet[columnFilter]) > Number(valueFilter),
      );
    }

    if (comparisonFilter === 'menor que') {
      filteredPln = planets.filter(
        (planet) => Number(planet[columnFilter]) < Number(valueFilter),
      );
    }

    if (comparisonFilter === 'igual a') {
      filteredPln = planets.filter(
        (planet) => Number(planet[columnFilter]) === Number(valueFilter),
      );
    }

    setFilteredPlanets(filteredPln);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="Buscar"
          onChange={ (e) => setFilterName(e.target.value) }
        />
      </div>
      <div>
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            onChange={ (e) => setColumnFilter(e.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            data-testid="comparison-filter"
            onChange={ (e) => setComparisonFilter(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterPlanets }
        >
          Filtrar
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((e) => (
            <tr key={ e.name }>
              <td>{e.name}</td>
              <td>{e.rotation_period}</td>
              <td>{e.orbital_period}</td>
              <td>{e.diameter}</td>
              <td>{e.climate}</td>
              <td>{e.gravity}</td>
              <td>{e.terrain}</td>
              <td>{e.surface_water}</td>
              <td>{e.population}</td>
              <td>{e.films}</td>
              <td>{e.created}</td>
              <td>{e.edited}</td>
              <td>{e.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
