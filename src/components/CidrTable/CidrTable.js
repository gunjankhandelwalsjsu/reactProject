import React from 'react'
import { Column, Cell } from 'fixed-data-table'
import ResponsiveTableWrapper from '../ResponsiveTableWrapper'
import renderers from '../../modules/renderers'
    
// Stateless cell components for Table component
var columnNodes = '';
function SortHeaderCell ({children, sortBy, sortKey, sortDesc, columnKey, ...props}) {
  const clickFunc = () => sortBy(columnKey)
  return (
    <Cell {...props}>
      <a onClick={clickFunc}>
        {children} {renderers.renderSortArrow(sortKey, sortDesc, columnKey)}
      </a>
    </Cell>
  )
}

                          
SortHeaderCell.propTypes = {
  sortBy: React.PropTypes.func.isRequired,
  sortKey: React.PropTypes.string.isRequired,
  sortDesc: React.PropTypes.bool.isRequired,
  columnKey: React.PropTypes.string,
  children: React.PropTypes.any
}


function DataCell ({data, rowIndex, columnKey, ...props}) {
    
  return <Cell {...props}> {data[rowIndex][columnKey]} </Cell>
}

DataCell.propTypes = {
  data: React.PropTypes.array.isRequired,
  rowIndex: React.PropTypes.number,
  columnKey: React.PropTypes.string
}
 
 
class CidrTable extends React.Component {
 constructor(props, context) {
    super(props, context)
  }
  componentWillMount () {
   this.props.fetchData()
  }
   
  handleFilterStringChange (e) {
    e.preventDefault()
    this.props.filterBy(e.target.value)
  }
    
  handlePropertyStringChange (e) {
    e.preventDefault()
    this.props.setInputText(e.target.value); 
  }
    
  handleClick(e) {
    e.preventDefault()
    var inputText = this.props.inputText;
    var data = this.props.input;
    if(inputText == 'quotationStart'||inputText == 'quotationEnd'||inputText == 'alternateQuotationStart'||inputText == 'alternateQuotationEnd') 
        {        
            this.props.setInput(inputText);
            data.push(inputText);
            const { isFetching, filterString, sortBy, sortKey, sortDesc} = this.props
            const headerCellProps = { sortBy, sortKey, sortDesc }

            if(data<=0) return;
            var storeThis = this;
            columnNodes = data.map(function(inputIndex){
             var property = inputIndex;
             var propertyData=storeThis.props.data;
             return (<Column
                            columnKey={property}
                            header={
                                      <SortHeaderCell {...headerCellProps}> {property} </SortHeaderCell>
                                   }
                            cell={<DataCell data={propertyData}/>}
                            flexGrow={1}
                            width={100} />)
            });
        }
    else{
         alert("sorry the property "+inputText+" doesnt exist");
         return;
        }
}

 handleRemoveClick(e){
    e.preventDefault()
    var inputText = this.props.inputText;
    var data = this.props.input;
    this.props.removeInput(inputText);
    data = data.filter(function(inputPermit){
          console.log(inputPermit)
          return (inputPermit != inputText);
    });
    console.log(data);
    const { isFetching, filterString, sortBy, sortKey, sortDesc} = this.props
    const headerCellProps = { sortBy, sortKey, sortDesc }
    if(data.length<=0) 
    {
         columnNodes = '';
         return ;
    }
    var storeThis = this;
    console.log(data);
    columnNodes = data.map(function(inputIndex){
     console.log(inputIndex)
     var property = inputIndex;
     var propertyData=storeThis.props.data;
     return (<Column
                    columnKey={property}
                    header={
                              <SortHeaderCell {...headerCellProps}> {property} </SortHeaderCell>
                           }
                    cell={<DataCell data={propertyData}/>}
                    flexGrow={1}
                    width={100} />)
    });
                   
  }  
    
    
  handleSortClick (label, key) {
    const sortFunc = () => this.props.sortBy(key)
    return <a onClick={sortFunc}>{label}</a>
  }

  doesMatch (str) {
    return (key) => (key + '').toLowerCase().indexOf(str) !== -1
  }

  filterData () {
    const {data, filterString} = this.props
    const str = filterString.toLowerCase()
    return str !== ''
      ? data.filter((r) => Object.values(r).some(this.doesMatch(str)))
      : data
  }

  sortData () {
    const {data, sortKey, sortDesc} = this.props
    const multiplier = sortDesc ? -1 : 1
    data.sort((a, b) => {
      const aVal = a[sortKey] || 0
      const bVal = b[sortKey] || 0
      return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0)
    })
    return this
  }
  
  render () {
    const { isFetching, filterString, sortBy, sortKey, sortDesc, input, flag, data, setFlag } = this.props
    const headerCellProps = { sortBy, sortKey, sortDesc }
    const dynamicColumnProps = {input, flag, data, setFlag, headerCellProps }
    const finalData = this.sortData().filterData(); 
    

    return (
      <div>
        <br/>
        <input className = 'filter-input pull-left' value={this.props.inputText}
          type='text' placeholder='Enter input property'
          onChange= {::this.handlePropertyStringChange}
          /> 
         <br /><br /><br />
        <input className='button btn-success pull-left' ref = 'property' value="Add column"
           onClick={::this.handleClick}
          type='button'/> 
        
        
        <input className='button btn-danger pull-left' value="Remove column"
           onClick={::this.handleRemoveClick}
          type='button'/> 
        <br />
        <br />
        <br />
        <input className='filter-input pull-left' value={filterString}
          onChange={::this.handleFilterStringChange}
          type='text' placeholder='Filter Rows'
          autoCorrect='off' autoCapitalize='off' spellCheck='false' />       
        <br />

        {isFetching && finalData.length === 0 &&
          <div className='loader-box'></div>}
        {!isFetching && finalData.length === 0 &&
          <h3 className='center'>No Matching Results :( </h3>}

        <ResponsiveTableWrapper
          rowHeight={50}
          headerHeight={50}
          rowsCount={data.length}>
          <Column
            columnKey='locale'
            header={<SortHeaderCell {...headerCellProps}> Locale </SortHeaderCell>}
            cell={<DataCell data={finalData} />}
            flexGrow={3}
            width={100} />
          {columnNodes}
        </ResponsiveTableWrapper>
      </div>
    )
    }
  }


CidrTable.propTypes = {
  // actions
  fetchData: React.PropTypes.func.isRequired,
  sortBy: React.PropTypes.func.isRequired,
  filterBy: React.PropTypes.func.isRequired,

  // state data
  data: React.PropTypes.array.isRequired,
  filterString: React.PropTypes.string.isRequired,
  sortKey: React.PropTypes.string.isRequired,
  sortDesc: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired
}

export default CidrTable