describe("Basic interaction test", () => {
  it("generates AST graph for sample JS code and simple user's code", () => {
    cy.visit("/")
    cy.contains("Syntax Visualizer")

    // Check sample code
    cy.contains("Program")
    cy.contains("CallExpression")
    cy.contains("StringLiteral")

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000)

    // Enter some basic code
    cy.contains("function", { timeout: 15000 })
    cy.focused({ timeout: 15000 })
      .type("{selectall}")
      .type("{backspace}")
      .type('console.log("Hello, from test!")')

    // Check entered code
    // cy.get(".ast-root").contains("Program")
    // cy.get(".ast-root").contains("ExpressionStatement")
    // cy.get(".ast-root").contains("CallExpression")
    // cy.get(".ast-root").contains("MemberExpression")
    // cy.get(".ast-root").contains("Identifier")
    // cy.get(".ast-root").contains("console")
    // cy.get(".ast-root").contains("log")
    // cy.get(".ast-root").contains("StringLiteral")
    // cy.get(".ast-root").contains('"Hello, from test!"')
  })
})
