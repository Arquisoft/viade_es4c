import React from 'react';
import { cleanup, act } from '@testing-library/react';
import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import HomeComponent from './home.container';

afterAll(cleanup);

let container = null;

beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Prueba que renderiza", () => {

  //Este test, comprueba que al renderizar el componenete Home, contiene las cadenas HomeUser: Not logged in (Aunque
  //en la web aparezcan separadas, aqui solo comprobamos que existan)
  act(() => {
    render(<HomeComponent />, container);
  });
  expect(container.textContent).toBe("Viade is a Solid project developed by third year students of the University of Oviedo Software Engineering degree in the Software Architecture subject. It offers a route sharing application following the SOLID principles. This is a site where all your data always remains yours. Developed by team es4c.Upload a new routeComplete it with images and videosShare it with whoever you wantAnd keep the ownership of all this  ");
});


