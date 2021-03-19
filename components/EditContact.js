import React, { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import DropdownWithInput from './DropdownWithInput'
import ImageUpload from './ImageUpload'
import { verifyEmailAddress, verifyPhoneNumber } from '../common/utility'

const EditContact = ({ navigation, dispatchContact, contact }) => {
    const [contactObj, setContactObj] = useState(contact)

    const handleChange = (key, data) => {
        setContactObj({ ...contactObj, [key]: data })
    }

    const handleCancel = () => {
        navigation.navigate('Home')
    }

    const handleUpdate = () => {
        const { phone1, phone2, email } = contactObj
        if (verifyPhoneNumber(phone1.value) && verifyPhoneNumber(phone2.value) && (!email.value || verifyEmailAddress(email.value))) {
            dispatchContact && dispatchContact(contactObj)
            navigation.navigate('Home')
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={handleCancel}>
                    <Ionicons name="close" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpdate}>
                    <Ionicons name="checkmark" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ImageUpload handleChange={handleChange} image={contactObj.image} />
            <TextInput
                autoCorrect={false}
                autoCapitalize='words'
                placeholder='Name'
                onChangeText={(text) => handleChange('name', text)}
                style={[styles.inputStyle, { paddingLeft: 20, marginTop: 20 }]}
                value={contactObj.name}
            />
            <DropdownWithInput
                defaultValue={contactObj.phone1}
                options={[{ label: 'Mobile', value: 'Mobile' }, { label: 'Home', value: 'Home' }, { label: 'Work', value: 'Work' }]}
                placeholder='Phone'
                type='phone'
                eventKey='phone1'
                handleChange={handleChange}
            />
            <DropdownWithInput
                defaultValue={contactObj.phone2}
                options={[{ label: 'Mobile', value: 'Mobile' }, { label: 'Home', value: 'Home' }, { label: 'Work', value: 'Work' }]}
                placeholder='Phone'
                type='phone'
                eventKey='phone2'
                handleChange={handleChange}
            />
            <DropdownWithInput
                defaultValue={contactObj.email}
                options={[{ label: 'Home', value: 'Home' }, { label: 'Work', value: 'Work' }]}
                placeholder='Email'
                type='email'
                eventKey='email'
                handleChange={handleChange}
            />
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        flex: 1
    },
    iconsContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    icon: {
        fontSize: 40,
        color: 'grey',
    },
    inputStyle: {
        fontSize: 20,
        height: 50,
        backgroundColor: '#F0EEEE',
        borderRadius: 10,
    },
})

export default EditContact