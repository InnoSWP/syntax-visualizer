describe("MainView test", () => {
  it("shows project name and placeholder text", () => {
    cy.visit("/")
    cy.contains("h1", "Syntax Visualiser")
    cy.contains("h2", "Coming soon... 🚧")
  })
})
