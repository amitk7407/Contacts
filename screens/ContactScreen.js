import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from "react-redux"
import { AntDesign } from '@expo/vector-icons'

import SearchBar from "../components/SearchBar"
import ContactList from "../components/ContactList"

const ContactScreen = ({ navigation, contactsInfo }) => {
    const [term, setTerm] = useState('')
    const filteredContacts = contactsInfo.filter(contact =>
        contact.name.toLowerCase().includes(term) ||
        contact.phone1.value.toLowerCase().includes(term) ||
        contact.phone2.value.toLowerCase().includes(term) ||
        contact.email.value.toLowerCase().includes(term)
    )

    return (
        <View style={styles.container}>
            <SearchBar term={term} onTermChange={setTerm} placeholder={`${contactsInfo.length} Contacts`} />
            <ContactList navigation={navigation} contacts={filteredContacts} term={term.toLowerCase()} />
            <TouchableOpacity style={styles.addButtonPosition} onPress={() => navigation.navigate('Add New Contact')}>
                <AntDesign name='plus' style={styles.addButton} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        flex: 1
    },
    addButtonPosition: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    addButton: {
        fontSize: 30,
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 25,
        padding: 10,
    }
})

const mapStateToProps = (state) => ({
    contactsInfo: state.contactsInfo,
})

export default connect(mapStateToProps)(ContactScreen)