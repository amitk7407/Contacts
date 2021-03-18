import React from 'react'
import { connect } from 'react-redux'

import EditContact from "../components/EditContact"
import { addContact } from '../redux/actions'

const obj = {
    phone1: { type: 'Mobile', value: '' },
    phone2: { type: 'Home', value: '' },
    email: { type: 'Work', value: '' },
    name: ''
}

const AddContactScreen = ({ navigation, dispatchAddContact }) => {
    return (
        <EditContact dispatchContact={dispatchAddContact} contact={obj} navigation={navigation} />
    )
}

const mapDispatchToProps = (dispatch) => ({
    dispatchAddContact: (data) => dispatch(addContact(data))
})

export default connect(null, mapDispatchToProps)(AddContactScreen)