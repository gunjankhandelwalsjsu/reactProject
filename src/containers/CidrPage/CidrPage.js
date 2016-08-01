import React from 'react'
import CidrTable from '../../components/CidrTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tableActions as actions } from '../../actions'

const CidrPage = (props) => {
    console.log("changed")
  return (
    <div>
      <h2> Locale Properties </h2>
      <CidrTable {...props} />
    </div>
  )
}

const mapStateToProps = ({table}) => table
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CidrPage)