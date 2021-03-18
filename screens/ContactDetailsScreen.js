import React from 'react'
import ContactDetail from '../components/ContactDetail'

const ContactDetailsScreen = ({ route, navigation }) => {
    const contactDetail = route.params.contactDetail

    return (
        <ContactDetail contactDetail={contactDetail} navigation={navigation} />
    )
}

export default ContactDetailsScreen
