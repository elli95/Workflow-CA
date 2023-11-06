const email = "unit-test-user@stud.noroff.no";
const password = "test1234";
const wrongEmail = "test@test.com";
const wrongPassword = "abcdefgh";

describe("Form verification test", () => {
  it("should refuse an empty email field at login", () => {
    cy.visit("/");
    cy.wait(1000);

    cy.get("#registerForm button[type=button]").contains("Login").click();
    cy.wait(1000);

    cy.get("#loginEmail").type("{enter}");
    cy.get("#loginEmail:invalid").should("exist");
  });

  it("should refuse an empty password field at login", () => {
    cy.visit("/");
    cy.wait(1000);

    cy.get("#registerForm button[type=button]").contains("Login").click();
    cy.wait(1000);

    cy.get("#loginEmail").type(email, "{enter}");
    cy.get("#loginPassword:invalid").should("exist");
  });

  it("should refuse a wrong email at login", () => {
    cy.visit("/");
    cy.wait(1000);

    cy.get("#registerForm button[type=button]").contains("Login").click();
    cy.wait(1000);

    cy.get("#loginEmail").type(wrongEmail, "{enter}");
    cy.get("#loginEmail:invalid").should("exist");
  });

  it("should refuse a wrong password at login", () => {
    cy.visit("/");
    cy.wait(1000);

    cy.get("#registerForm button[type=button]").contains("Login").click();
    cy.wait(1000);

    cy.get("#loginEmail").type(email, "{enter}");
    cy.get("#loginPassword").type(wrongPassword, "{enter}");
    cy.get("#loginForm button[type=submit]").contains("Login").click();
  });
});
