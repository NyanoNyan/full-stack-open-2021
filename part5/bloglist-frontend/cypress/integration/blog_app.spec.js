
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
      const user1 = {
        name: 'Rui Ha',
        username: 'RuiHa',
        password: 'juhjhkjhk'
      }
      const user2 = {
        name: 'Kawhi',
        username: 'Kawhi',
        password: 'asdf'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user1)
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
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

    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('RuiHa')
        cy.get('#password').type('juhjhkjhk')
        cy.get('#login-btn').click()

        cy.contains('create').click()
        cy.get('#title-inp').type('testerino')
        cy.get('#author-inp').type('testerino2')
        cy.get('#url-inp').type('testerino3')
        cy.get('#create-submit').click()
      })

      it('A new blog can be created', function() {
        cy.contains('create').click()
        cy.get('#title-inp').type('testerino')
        cy.get('#author-inp').type('testerino2')
        cy.get('#url-inp').type('testerino3')
        cy.get('#create-submit').click()

        // Another one
        cy.contains('create').click()
        cy.get('#title-inp').type('testerino')
        cy.get('#author-inp').type('testerino2')
        cy.get('#url-inp').type('testerino3')
        cy.get('#create-submit').click()
      })

      it('User can like a blog', function() {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('Likes: 1')
      })
    })

    describe('Blog deletion', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('RuiHa')
        cy.get('#password').type('juhjhkjhk')
        cy.get('#login-btn').click()

        cy.contains('create').click()
        cy.get('#title-inp').type('testerino')
        cy.get('#author-inp').type('testerino2')
        cy.get('#url-inp').type('testerino3')
        cy.get('#create-submit').click()
      })

      it('User who created the blog can delete the blog', function() {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('#blog-msg').should('contain', 'testerino has been deleted')
      })

      it('User cannot delete other blogs', function() {
        cy.contains('logout').click()
        cy.contains('login').click()
        cy.get('#username').type('Kawhi')
        cy.get('#password').type('asdf')
        cy.get('#login-btn').click()

        cy.contains('show').click()
        cy.contains('remove').click()
        cy.get('#blog-msg').should('contain', 'testerino cannot be deleted')
      })

    })

    describe('Blog order', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('RuiHa')
        cy.get('#password').type('juhjhkjhk')
        cy.get('#login-btn').click()

        cy.contains('create').click()
        cy.get('#title-inp').type('testerino')
        cy.get('#author-inp').type('testerino1000')
        cy.get('#url-inp').type('testerino20')
        cy.get('#create-submit').click()

        cy.contains('create').click()
        cy.get('#title-inp').type('testerino2')
        cy.get('#author-inp').type('testerino2000')
        cy.get('#url-inp').type('testerino30')
        cy.get('#create-submit').click()

        cy.contains('create').click()
        cy.get('#title-inp').type('testerino3')
        cy.get('#author-inp').type('testerino3000')
        cy.get('#url-inp').type('testerino50')
        cy.get('#create-submit').click()

        cy.wait(500)

        for (let i=0; i<5; i++) {
          cy.get('.blog-data > .likes-btn')
            .then((v) => {
              v[1].click()
            })
          cy.wait(2000)
        }
      })

      it.only('test', function() {
        // element changes due to it ordering based on most likes, so it changes midway
        cy.get('.blog-data').each((el, index, list) => {
          if (index === 0) {
            cy.wrap(el[0])
              .should('contain', 'testerino2')
              .and('contain', '3')
          } else if (index === 1) {
            cy.wrap(el[0])
              .should('contain', 'testerino')
              .and('contain', '2')
          } else if (index === 2) {
            cy.wrap(el[0])
              .should('contain', 'testerino3')
              .and('contain', '0')
          }
        })

        cy.get('.show-btn')
          .then((v) => {
            v.click()
          })

      })
    })

  })
})