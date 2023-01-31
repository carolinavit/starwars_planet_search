import React, { useContext, useEffect, useState } from 'react';
import { PlanetContext } from '../context/PlanetContext';

export default function Table() {
  const { planets } = useContext(PlanetContext);
  const [filterName, setFilterName] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filters, setFilters] = useState([]);
  const [columnFilterOptions, setColumnFilterOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    const filteredNames = planets.filter((planet) => planet.name.includes(filterName));
    setFilteredPlanets(filteredNames);
  }, [filterName]);

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const filterPlanets = () => {
    let crrFiltered = planets;

    filters.forEach((filter) => {
      if (filter.comparisonFilter === 'maior que') {
        crrFiltered = crrFiltered.filter(
          (planet) => Number(planet[filter.columnFilter]) > Number(filter.valueFilter),
        );
      }

      if (filter.comparisonFilter === 'menor que') {
        crrFiltered = crrFiltered.filter(
          (planet) => Number(planet[filter.columnFilter]) < Number(filter.valueFilter),
        );
      }

      if (filter.comparisonFilter === 'igual a') {
        crrFiltered = crrFiltered.filter(
          (planet) => Number(planet[filter.columnFilter]) === Number(filter.valueFilter),
        );
      }
    });

    setFilteredPlanets(crrFiltered);
  };

  const addFilter = () => {
    if (valueFilter) {
      setFilters([...filters, { columnFilter, comparisonFilter, valueFilter }]);

      const newcolumnFilterOptions = columnFilterOptions.filter(
        (option) => option !== columnFilter,
      );

      setColumnFilterOptions(newcolumnFilterOptions);
      setColumnFilter(newcolumnFilterOptions[0]);
    }
  };

  const removeFilter = (filter) => {
    const newFilters = filters.filter(
      (crrFilter) => crrFilter.columnFilter !== filter,
    );

    setColumnFilterOptions([...columnFilterOptions, filter]);
    setFilters(newFilters);
  };

  useEffect(() => {
    filterPlanets();
  }, [filters]);

  return (
    <div>
      <h1 data-testid="table-title">Star Wars</h1>
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
            value={ columnFilter }
            data-testid="column-filter"
            onChange={ (e) => setColumnFilter(e.target.value) }
          >
            {columnFilterOptions.map((option) => (
              <option key={ option } value={ option }>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison">
          <select
            value={ comparisonFilter }
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
        <button type="button" data-testid="button-filter" onClick={ addFilter }>
          Filtrar
        </button>
      </div>
      <div>
        {filters.map((filter) => (
          <div style={ { display: 'flex' } } key={ filter.columnFilter }>
            <p data-testid="filter">
              {filter.columnFilter}
              {' '}
              {filter.comparisonFilter}
              {' '}
              {filter.valueFilter}
              <button onClick={ () => removeFilter(filter.columnFilter) }>x</button>
            </p>
          </div>
        ))}
        <button
          data-testid="button-remove-filters"
          onClick={ () => {
            setFilters([]);
            setColumnFilterOptions([
              'population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water',
            ]);
          } }
        >
          Remover todas filtragens
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th data-testid="diameter-column">Diameter</th>
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
