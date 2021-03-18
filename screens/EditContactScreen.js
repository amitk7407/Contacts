import React from 'react'
import { connect } from 'react-redux'

import EditContact from "../components/EditContact"
import { editContact } from '../redux/actions'

const EditContactScreen = ({ route, navigation, dispatchEditContact }) => {
    return (
        <EditContact dispatchContact={dispatchEditContact} contact={route.params.contactDetail} navigation={navigation} />
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchEditContact: (data) => dispatch(editContact(data))
})

export default connect(null, mapDispatchToProps)(EditContactScreen)