describe("Basic interaction test", () => {
  it("generates AST graph for sample JS code and simple user's code", () => {
    cy.visit("/")
    cy.contains("Syntax Visualizer")

    // Check sample code
    cy.contains("Program")
    cy.contains("CallExpression")
    cy.contains("StringLiteral")

    // Enter some basic code
    cy.contains("function")
    cy.focused()
      .type("{selectAll}")
      .type("{backspace}")
      .type('console.log("Hello, from test!")')

    // Check entered code
    cy.get(".ast-root").contains("Program")
    cy.get(".ast-root").contains("ExpressionStatement")
    cy.get(".ast-root").contains("CallExpression")
    cy.get(".ast-root").contains("MemberExpression")
    cy.get(".ast-root").contains("Identifier")
    cy.get(".ast-root").contains("console")
    cy.get(".ast-root").contains("log")
    cy.get(".ast-root").contains("StringLiteral")
    cy.get(".ast-root").contains('"Hello, from test!"')
  })
})
