import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetProvider from '../context/PlanetProvider';
import userEvent from '@testing-library/user-event';

describe("Testa se tabela renderiza corretamente", () => {
  test("Se aparece o título", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const title = screen.getByTestId("table-title");
    expect(title).toBeInTheDocument();
  });

  test("Se há um campo de input de texto", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const inputText = screen.getByTestId("name-filter");
    expect(inputText).toBeInTheDocument();
  });

  test("Se há um campo de input tipo number", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const inputNumber = screen.getByTestId("value-filter");
    expect(inputNumber).toBeInTheDocument();
  });

  test("Se possui uma tabela", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("Se possui o Name na tabela", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const tableName = screen.getByRole("columnheader", { name: /name/i });
    expect(tableName).toBeInTheDocument();
  });

  test("Se possui a coluna Diameter na tabela", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const diameterColumn = screen.getByTestId("diameter-column");
    expect(diameterColumn).toBeInTheDocument();
    });
  });

  test("Se possui as pesquisas de input", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const filterName = screen.getByTestId("name-filter");
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const value = screen.getByTestId("value-filter");

    expect(filterName).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  test("Se o filtro faz a busca por nome", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );

    const filterName = screen.getByTestId("name-filter");
    userEvent.type(filterName, "tat");
  });

  test("Se existe botão de filtrar", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );
    const filterButton = screen.getByRole("button", { name: /filtrar/i });
    expect(filterButton).toBeInTheDocument();
  });

  test("Se ocorre o clique do botão de filtros", () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );

    const columnFilter = screen.getByTestId("column-filter");
    expect(columnFilter).toHaveValue("population");

    userEvent.selectOptions(columnFilter, "orbital_period");

    const comparisonFilter = screen.getByTestId("comparison-filter");
    expect(comparisonFilter).toHaveValue("maior que");

    userEvent.selectOptions(comparisonFilter, "menor que");

    const valueFilter = screen.getByTestId("value-filter");
    expect(valueFilter).toHaveValue(0);

    userEvent.type(valueFilter, "340");

    const buttonFilter = screen.getByTestId("button-filter");
    userEvent.click(buttonFilter);
  });

  test('Se filtros e botão com "maior que" funcionam corretamente', () => {
    render(
      <PlanetProvider>
        <App />
      </PlanetProvider>
    );

    const columnFilter = screen.getByTestId("column-filter");
    userEvent.selectOptions(columnFilter, "orbital_period");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(comparisonFilter, "maior que");
    const valueFilter = screen.getByTestId("value-filter");
    userEvent.type(valueFilter, "4900");
    const buttonFilter = screen.getByTestId("button-filter");
    userEvent.click(buttonFilter);
  
  });
