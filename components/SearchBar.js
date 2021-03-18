import React, { useState, useRef } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import { Feather, MaterialIcons } from '@expo/vector-icons'

const SearchBar = ({ term, onTermChange, placeholder }) => {
    const [isFocussed, setIsFocussed] = useState(false)
    const inputRef = useRef()

    const handleInputClear = () => {
        onTermChange('')
        inputRef.current.focus()
    }

    const handleCancel = () => {
        onTermChange('')
        setIsFocussed(false)
        inputRef.current.blur()
    }

    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
                <Feather name='search' style={styles.iconStyle} />
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.inputStyle}
                    placeholder={isFocussed ? '' : placeholder}
                    value={term}
                    onChangeText={onTermChange}
                    onFocus={() => setIsFocussed(true)}
                    ref={inputRef}
                />
                {isFocussed && <MaterialIcons name='clear' style={styles.iconStyle} onPress={handleInputClear} />}
            </View>
            {isFocussed &&
                <Text style={styles.cancelText} onPress={handleCancel}>
                    Cancel
                </Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
    },
    searchBar: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        flex: 1
    },
    iconStyle: {
        fontSize: 25,
        alignSelf: 'center',
        marginHorizontal: 15
    },
    inputStyle: {
        flex: 1,
        fontSize: 20,
        paddingHorizontal: 10
    },
    cancelText: {
        color: 'blue',
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 10
    }
})

export default SearchBar