import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ContactItem = ({ item, handlePress, term }) => {
    let startIndex = 0
    let endIndex = 0
    const contactLabel = item.name || item.phone1.value || item.phone2.value || item.email.value || 'No Name'

    if (term) {
        startIndex = contactLabel.toLowerCase().indexOf(term)
        endIndex = contactLabel.toLowerCase().indexOf(term) + term.length
    }

    return (
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item.id)}>
            {item.image ? <Image source={{ uri: item.image }} style={styles.image} /> :
                <Ionicons name='person-circle-outline' size={30} color='#dddddd' />}
            {term && startIndex >= 0 ?
                <Text style={styles.name}>
                    {contactLabel.substring(0, startIndex)}
                    <Text style={styles.highlight}>
                        {contactLabel.substring(startIndex, endIndex)}
                    </Text>
                    {contactLabel.substring(endIndex, contactLabel.length)}
                </Text> :
                <Text style={styles.name}>{contactLabel}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    name: {
        fontSize: 20,
        paddingHorizontal: 10
    },
    highlight: {
        color: 'blue'
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
})

export default ContactItem