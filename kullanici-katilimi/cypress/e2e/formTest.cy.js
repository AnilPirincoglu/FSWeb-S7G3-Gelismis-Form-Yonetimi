describe('form test', () => {

  beforeEach(() => {
    cy.visit('localhost:3000')
  })

  const testObj = { name: "anıl", email: "anil@gmail.com", password: "Aa1!" }

  it('name writing test', () => {
    cy.get("[data-cy=name]").type("Anıl").should("have.value", "Anıl")


  })
  it('name valid test', () => {
    cy.get("[data-cy=name]").type("A")
    cy.contains("Name must not be shorter than 3 characters.")

    cy.get("[name=name]").clear()
    cy.contains("Name is required")

  })

  it('email writing test', () => {
    cy.get("[data-cy=email]").type("Anil@gmail.com").should("have.value", "Anil@gmail.com")

  })

  it("checkbox click test", () => {
    cy.get("[data-cy=terms]").check().should("be.checked")
  })
  it("submit test", () => {

    cy.get("[data-cy=name]").type("Anıl")
    cy.get("[data-cy=email]").type("anil@gmail.com")
    cy.get("[data-cy=password]").type("Aa1!")
    cy.get("[data-cy=terms]").check()
    cy.get("[data-cy=submit_button]").should("be.enabled")

  })

  it("click test", () => {
    cy.get("[data-cy=name]").type("Anıl")
    cy.get("[data-cy=email]").type("anil@gmail.com")
    cy.get("[data-cy=password]").type("Aa1!")
    cy.get("[data-cy=terms]").check()
    cy.get("[data-cy=submit_button]").click()
    const arr = ["Anıl", "E-mail", "anil@gmail.com"]
    arr.forEach((item) => { cy.get("[data-cy=membercard]").contains(item) })
    cy.get("[data-cy=membercard]").contains("Anıl")
  })

  it("error count test", () => {
    cy.get("[data-cy=name]").type("a")
    cy.get("[data-cy=email]").type("anilgmail.com")
    cy.get("[data-cy=password]").type("Aa1")
    cy.get("[data-cy=terms]").check()
    cy.get("[data-cy=terms]").uncheck()
    cy.get("[data-cy=error]").should("have.length", 4)
  })
})