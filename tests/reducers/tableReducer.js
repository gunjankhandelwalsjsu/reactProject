import listCidrData from '../testdata/cidrData.json'
import { listLocaleWithProperties } from '../../src/reducers/tableReducer'

describe('tableReducer.listCidrData', () => {
  it('Listify locale with properties', () => {
    expect(listCidrData).to.be.an('array')
    const result = listLocaleWithProperties(listCidrData)
    expect(result)
      .to.be.an('array')
      .to.have.length.above(35)

    result.forEach((row) => {
      expect(row).to.have.all.keys([
        'locale',
        'quotationStart',
        'quotationEnd',
        'alternateQuotationStart',
        'alternateQuotationEnd'
      ])
    })
  })
})
