const email = "unit-test-user@stud.noroff.no";
const password = "test1234";

describe("Login test", () => {
  it("should allow a valid user with the correct email/password to login", () => {
    cy.visit("/");
    cy.wait(1000);

    cy.get("#registerForm button[type=button]").contains("Login").click();
    cy.wait(1000);

    cy.get("#loginEmail").type(email, "{enter}");
    cy.get("#loginPassword").type(password);
    cy.get("#loginForm button[type=submit]").contains("Login").click();
    cy.wait(1000);

    cy.location("href").should("include", "view=profile&name");
  });
});
