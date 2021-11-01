describe('Blog app', function () {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      username: 'admin',
      name: 'admin user',
      password: 'admin'
    };

    cy.request('POST', 'http://localhost:3001/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Please login to view posts:');
    cy.get('#loginUsername');
    cy.get('#loginPassword');
  });

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.get('#loginUsername').type('admin');
      cy.get('#loginPassword').type('admin');
      cy.get('#loginSubmit').click();

      cy.contains('List of current blogs');
    });

    it('fails with correct credentials', function() {
      cy.get('#loginUsername').type('admin');
      cy.get('#loginPassword').type('vaara');
      cy.get('#loginSubmit').click();

      cy.contains('Invalid username or password');
    });

    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#loginUsername').type('admin');
        cy.get('#loginPassword').type('admin');
        cy.get('#loginSubmit').click();
      });

      it('A Blog can be created', function() {
        cy.contains('Add a new blog')
          .click();
        cy.get('#createBlogTitle').type('my title');
        cy.get('#createBlogAuthor').type('my author');
        cy.get('#createBlogUrl').type('my url');
        cy.get('#button-submitNewBlog').click();

        cy.contains('A new blog my title by my author has been added.');
        cy.contains('my title by my author');
      });

      describe('After new blog posted', function() {
        beforeEach(function() {
          cy.contains('Add a new blog')
            .click();
          cy.get('#createBlogTitle').type('my title');
          cy.get('#createBlogAuthor').type('my author');
          cy.get('#createBlogUrl').type('my url');
          cy.get('#button-submitNewBlog').click();
        });

        it('blogs can be liked', function(){
          cy.contains('View').click();
          cy.contains('👍').click();

          cy.contains('Likes: 1');
        });

        it('blogs can be deleted', function() {
          cy.contains('View').click();
          cy.contains('delete blog?').click();

          cy.contains('A new blog my title by my author has been added.');
        });

        it('Blog list automatically arranges depending on likes', function() {
          cy.contains('Add a new blog')
            .click();
          cy.get('#createBlogTitle').type('my title 2');
          cy.get('#createBlogAuthor').type('my author 2');
          cy.get('#createBlogUrl').type('my url 2');
          cy.get('#button-submitNewBlog').click();
          cy.contains('Add a new blog')
            .click();
          cy.get('#createBlogTitle').type('my title 3');
          cy.get('#createBlogAuthor').type('my author 3');
          cy.get('#createBlogUrl').type('my url 3');
          cy.get('#button-submitNewBlog').click();

          cy.get('.viewMoreButton').click({ multiple:true });

          cy.get('.likeButton')
            .each((button, index) => {
              if(index !== 0)
                button.click();
            });
          cy.get('.singleBlogContainer')
            .contains('my title 2 by my author 2');
        });
      });
    });

  });

});