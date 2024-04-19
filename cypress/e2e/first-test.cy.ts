/// <reference types="cypress"/>

describe('Renderización de Home', () => {
    it('Renderiza el componente Home', () => {
      cy.visit('http://localhost:8081'); 
      cy.contains('Total'); 
    });
  });