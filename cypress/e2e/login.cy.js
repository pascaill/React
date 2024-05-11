/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="masukkan email"]').should('be.visible');
    cy.get('input[placeholder="masukkan password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="masukkan email"]').type('testuser@gmail.com');

    cy.get('input[placeholder="masukkan password"]').type('wrong_password');

    cy.get('button').contains(/^Login$/).click();

    cy.get('p[data-testid="ntf-err"]').should('have.text', 'email or password is wrong');
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="masukkan email"]').type('test@yopmail.com');

    cy.get('input[placeholder="masukkan password"]').type('test123');

    cy.get('button').contains(/^Login$/).click();

    cy.get('span[data-testid="user-name"]').should('have.text', 'test');
  });
});
