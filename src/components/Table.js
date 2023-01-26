import React, { useContext, useState } from 'react';
import { PlanetContext } from '../context/PlanetContext';

export default function Table() {
  const { planets } = useContext(PlanetContext);
  const [filterName, setFilterName] = useState('');

  const filteredNames = planets.filter((planet) => planet.name.includes(filterName));

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
          {filteredNames.map((e) => (
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
