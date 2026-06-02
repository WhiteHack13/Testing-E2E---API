describe('flujo de compra en demoblaze', () => {

  it('Debe abrir la página principal de demoblaze', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('PRODUCT STORE').should('be.visible');
  });

  it('Debe abrir un producto en demoblaze', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('Samsung galaxy s6').click();
    cy.on('window:alert', (texto) => {
      expect(texto).to.equal('Product added');
    });

    cy.contains('Add to cart').click();
    cy.wait(3000);

    cy.visit('https://www.demoblaze.com/');
    cy.contains('Nokia lumia 1520').click();
    cy.on('window:alert', (texto) => {
      expect(texto).to.equal('Product added');
    });
    cy.contains('Add to cart').click();

    cy.wait(3000);
    cy.contains('Cart').click();

    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6');
    cy.get('#totalp').should('contain', '1180');
    
    cy.contains('Place Order').should('be.visible');
    cy.contains('Place Order').click();
    
    cy.get('#orderModal').should('be.visible');
    cy.get('#name').type('John Doe');
    cy.get('#country').type('USA');
    cy.get('#city').type('New York');
    cy.get('#card').type('1234 5678 9012 3456');
    cy.get('#month').type('12');
    cy.get('#year').type('2025');
    cy.contains('Purchase').click();

    cy.contains('Thank you for your purchase!').should('be.visible');
    cy.contains('Amount: 1180 USD').should('be.visible');
  });
})