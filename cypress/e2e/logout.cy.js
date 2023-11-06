const email = "unit-test-user@stud.noroff.no";
const password = "test1234";

describe("Logout test", () => {
  it("should allow a user to log out with logout button", () => {
    cy.visit("/");
    cy.wait(1000);

    cy.get("#registerForm button[type=button]").contains("Login").click();
    cy.wait(1000);

    cy.get("#loginEmail").type(email, "{enter}");
    cy.get("#loginPassword").type(password);
    cy.get("#loginForm button[type=submit]").contains("Login").click();
    cy.wait(1000);

    cy.location("href").should("include", "view=profile&name");
    cy.get("header button[type=button]").contains("Logout").click();
    cy.wait(1000);

    cy.getAllLocalStorage().should("be.empty");
  });
});
