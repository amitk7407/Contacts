import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Communications from 'react-native-communications';

import ImageUpload from './ImageUpload'
import { editContact } from '../redux/actions'

const ContactDetail = ({ contactDetail, dispatchEditContact }) => {
    const { name, phone1, phone2, email, image } = contactDetail
    const contactLabel = name || phone1.value || phone2.value || email.value || 'No Name'

    const handleChange = (key, data) => {
        dispatchEditContact({ ...contactDetail, [key]: data })
    }

    return (
        <View style={styles.container}>
            <ImageUpload handleChange={handleChange} image={image} />
            <Text style={styles.name}>{contactLabel}</Text>
            {!!phone1.value && <View style={styles.numberContainer}>
                <View>
                    <Text style={styles.value}>{phone1.value}</Text>
                    <Text style={styles.type}>{phone1.type}</Text>
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => Communications.phonecall(phone1.value, true)}>
                        <Ionicons name="call-outline" style={styles.callIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Communications.text(phone1.value)}>
                        <MaterialCommunityIcons name="message-text-outline" style={styles.messageIcon} />
                    </TouchableOpacity>
                </View>
            </View>}
            {!!phone2.value && <View style={styles.numberContainer}>
                <View>
                    <Text style={styles.value}>{phone2.value}</Text>
                    <Text style={styles.type}>{phone2.type}</Text>
                </View>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => Communications.phonecall(phone2.value, true)}>
                        <Ionicons name="call-outline" style={styles.callIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Communications.text(phone2.value)}>
                        <MaterialCommunityIcons name="message-text-outline" style={styles.messageIcon} />
                    </TouchableOpacity>
                </View>
            </View>}
            {!!email.value &&
                <TouchableOpacity style={styles.emailContainer} onPress={() => Communications.email(email.value, null, null, '', '')}>
                    <Text style={styles.value}>{email.value}</Text>
                    <Text style={styles.type}>{email.type}</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
        flex: 1
    },
    name: {
        fontWeight: '600',
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd'
    },
    numberContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    emailContainer: {
        paddingVertical: 15,
    },
    value: {
        fontSize: 20,
        fontWeight: '600'
    },
    type: {
        fontSize: 10,
    },
    icons: {
        flexDirection: 'row'
    },
    callIcon: {
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        backgroundColor: 'green',
        color: 'white',
        borderColor: 'transparent'
    },
    messageIcon: {
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        backgroundColor: 'blue',
        color: 'white',
        borderColor: 'transparent',
        marginLeft: 10
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchEditContact: (data) => dispatch(editContact(data))
})

export default connect(null, mapDispatchToProps)(ContactDetail)