describe('flujo de compra en demoblaze', () => {

  it('Debe abrir la página principal de demoblaze', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('PRODUCT STORE').should('be.visible');
  });

  it('Debe completar el proceso de compra en demoblaze: 1. Agregar 2 productos, 2. Visualizar el carrito, 3. Completar la orden, 4. Finalizar compra', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('Samsung galaxy s6').click();
    cy.on('window:alert', (texto) => {
      expect(texto).to.equal('Product added');
    });

    cy.contains('Add to cart').click();
    cy.wait(2000);

    cy.visit('https://www.demoblaze.com/');
    cy.contains('Nokia lumia 1520').click();
    cy.on('window:alert', (texto) => {
      expect(texto).to.equal('Product added');
    });
    cy.contains('Add to cart').click();

    cy.wait(2000);
    cy.contains('Cart').click();

    cy.get('#tbodyid').should('contain', 'Samsung galaxy s6');
    cy.get('#totalp').should('contain', '1180');
    
    cy.contains('Place Order').should('be.visible');
    cy.contains('Place Order').click();
    cy.get('#orderModal').should('be.visible');
    cy.wait(2000);
    cy.get('#name').type('John Doe');
    cy.get('#country').type('USA');
    cy.get('#city').type('New York');
    cy.get('#card').type('1234 5678 9012 3456');
    cy.get('#month').type('12');
    cy.get('#year').type('2025');
    cy.contains('Purchase').click();

    cy.contains('Thank you for your purchase!').should('be.visible');
    cy.contains('Amount: 1180 USD').should('be.visible');
    cy.contains('OK').click();
  });

  it('Permite comprar sin los datos: country, city, month y year', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('Samsung galaxy s6').click();
    cy.on('window:alert', (texto) => {
      expect(texto).to.equal('Product added');
    });

    cy.contains('Add to cart').click();
    cy.wait(2000);

    cy.contains('Cart').click();
    cy.contains('Place Order').click();
    cy.get('#orderModal').should('be.visible');
    cy.wait(2000);
    cy.get('#name').type('John Doe');
    cy.get('#card').type('1234 5678 9012 3456');
    cy.contains('Purchase').click();

    cy.log('Validar si el sitema permite comprar sin datos');
    cy.wait(2000);
  });

  it('Permite abrir formulario de compra con carrito vacío', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('Cart').click();
    cy.contains('Place Order').click();
    cy.wait(2000);
    cy.get('#orderModal').should('be.visible');
    cy.wait(2000);
  });
  
  it('Permite finalizar compra con carrito vacío', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('Cart').click();
    cy.contains('Place Order').click();
    cy.wait(2000);
    cy.get('#orderModal').should('be.visible');
    cy.wait(2000);
    cy.get('#name').type('John Doe');
    cy.get('#card').type('1234 5678 9012 3456');
    cy.wait(2000);
    cy.contains('Purchase').click();
    cy.wait(2000);
  });

  it('Permite ingresar texto en tarjeta', () => {
    cy.visit('https://www.demoblaze.com/');
    cy.contains('Cart').click();
    cy.contains('Place Order').click();
    cy.get('#orderModal').should('be.visible');
    cy.wait(2000);
    cy.get('#name').type('John Doe');
    cy.get('#card').type('cualquier texto en lugar de números');
    cy.get('#card').should('have.value', 'cualquier texto en lugar de números');
    cy.wait(2000);
  });

  it('Agrega el mismo producto 2 veces y lo muestra duplicado en el carrito', () => {

    cy.visit('https://www.demoblaze.com/');
    cy.contains('Nokia lumia 1520').click();
    cy.on('window:alert', (texto) => {
      expect(texto).to.equal('Product added');
    });
    cy.contains('Add to cart').click();

    cy.wait(2000);

    cy.visit('https://www.demoblaze.com/');
    cy.contains('Nokia lumia 1520').click();
    cy.on('window:alert', (texto) => {
      expect(texto).to.equal('Product added');
    });
    cy.contains('Add to cart').click();
    cy.wait(2000);
    cy.contains('Cart').click();
  });
})