describe("Get Kalimati data", function () {
  it("Downloads csv data", () => {
    const fs = require("fs");
    const dayjs = require("dayjs");
    const duration = require("dayjs/plugin/duration");
    dayjs.extend(duration);
    const filename =
      Cypress.config("downloadsDir") + Cypress.config("downloadedFileName");
    const renamedFileDir = Cypress.config("downloadsDir");
    cy.visit("https://kalimatimarket.gov.np/price");
    let dataDate = "2013-04-15"; //Cypress.config("startDate");
    let endDate = "2013-04-20"; //Cypress.config("endDate");

    while (dataDate != endDate) {
      cy.get("#datePricing").invoke("attr", "value", dataDate);
      cy.get("#findSpecificDay").click();
      cy.get(".buttons-csv").first().click();
      cy.task("renameFile", {
        currentName: filename,
        renameTo: `${renamedFileDir}${dataDate}.csv`,
      });
      dataDate = dayjs(dataDate)
        .add(dayjs.duration({ days: 1 }))
        .format("YYYY-MM-DD");
    }
  });
});
