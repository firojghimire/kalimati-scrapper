describe('Get Kalimati data', function(){
    it('Downloads csv data', () => {
        const fs = require('fs')
        const dayjs = require('dayjs')
        const duration = require('dayjs/plugin/duration')
        dayjs.extend(duration)
        const filename = '/home/firoj/kalimati-scrapper/cypress/downloads/कालीमाटी फलफूल तथा तरकारी बजार बिकास समिति  Regulating the market in Nepalese consumer interest since 1995.csv'
        const renamedFileDir = '/home/firoj/kalimati-scrapper/cypress/downloads/'
        cy.visit('https://kalimatimarket.gov.np/price')
        let dataDate = '2013-04-15'
        let endDate = '2020-03-12'

        while(dataDate!=endDate){
            cy.get('#datePricing').invoke('attr', 'value', dataDate)
            cy.get('#findSpecificDay').click()
            cy.get('.buttons-csv').first().click()
            cy.task('renameFile', { currentName: filename, renameTo: `${renamedFileDir}${dataDate}.csv` })
            dataDate = dayjs(dataDate).add(dayjs.duration({ 'days': 1 })).format('YYYY-MM-DD')
        }
    });
})