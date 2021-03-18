import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { verifyEmailAddress, verifyPhoneNumber } from '../common/utility'

const keyboardMap = {
    phone: 'number-pad',
    email: 'email-address'
}

const DropdownWithInput = ({ defaultValue, options, placeholder, type, eventKey, handleChange }) => {
    const [dropdownValue, setDropdownValue] = useState(defaultValue.type)
    const [textValue, setTextValue] = useState(defaultValue.value)
    const [errorMessage, setErrorMessage] = useState('')

    const handleChangeText = (value) => {
        setTextValue(value)
        if (type === 'phone') {
            verifyPhoneNumber(value) ?
                setErrorMessage('') :
                setErrorMessage('Invalid phone number. Phone number should contain 10 digits')
        }
        else if (type === 'email') {
            verifyEmailAddress(value) ?
                setErrorMessage('') :
                setErrorMessage('Invalid email address')
        }
        handleChange && handleChange(eventKey, { type: dropdownValue, value })
    }

    const hanldePickerChange = (type) => {
        setDropdownValue(type)
        if (textValue) {
            handleChange && handleChange(eventKey, { type, value: textValue })
        }
    }

    return (
        <View>
            <View picker style={styles.dropdownStyle}>
                <View style={styles.pickerView}>
                    <Picker
                        mode="dropdown"
                        selectedValue={dropdownValue}
                        style={styles.pickerStyle}
                        onValueChange={hanldePickerChange}
                    >
                        {options.map((opt, i) => <Picker.Item key={i} label={opt.label} value={opt.value} />)}
                    </Picker></View>
                <TextInput
                    autoCorrect={false}
                    autoCapitalize='none'
                    placeholder={placeholder}
                    keyboardType={keyboardMap[type]}
                    value={textValue}
                    onChangeText={handleChangeText}
                    maxLength={type === 'phone' ? 10 : 200}
                    style={[styles.inputStyle, { flex: 1, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, paddingLeft: 20 }]}
                />
            </View>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    inputStyle: {
        fontSize: 20,
        height: 50,
        backgroundColor: '#F0EEEE',
        borderRadius: 10,
    },
    dropdownStyle: {
        flexDirection: 'row',
        paddingTop: 20
    },
    pickerStyle: {
        height: 50,
        width: 120,
    },
    pickerView: {
        borderLeftWidth: 0,
        borderRightWidth: 1,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        borderRightColor: '#dddddd',
        backgroundColor: '#F0EEEE',
    }
})

export default DropdownWithInput