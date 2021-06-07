
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
  })

  describe('Login check', function() {
    beforeEach(function() {
      const user = {
        name: 'Rui Ha',
        username: 'RuiHa',
        password: 'juhjhkjhk'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    })

    it('successful login with credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('RuiHa')
      cy.get('#password').type('juhjhkjhk')
      cy.get('#login-btn').click()
      cy.contains('RuiHa is logged in.')
    })

    it('fails with the wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('RuiHa')
      cy.get('#password').type('asdf')
      cy.get('#login-btn').click()
      cy.get('#login-msg')
        .should('contain', 'wrong username or password')
        .and('have.css', 'backgroundColor', 'rgb(211, 211, 211)')
    })
  })
})