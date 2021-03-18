import React from 'react'
import { Text, StyleSheet, FlatList } from 'react-native'
import ContactItem from './ContactItem'

const getAlphabeticallyFilteredList = (data) => {
    const alphabeticallyFilteredList = data.reduce((acc, obj) => {
        const key = obj.name
        const letter = key ? key[0].toUpperCase() : '#'
        const alphabeticGroup = acc.find(e => e.letter === letter)

        if (!alphabeticGroup) {
            acc.push({ letter: letter, contacts: [obj] })
        }
        else {
            const index = acc.findIndex(e => e.letter === letter)
            acc[index].contacts.push(obj)
        }
        return acc
    }, [])

    return alphabeticallyFilteredList.sort((a, b) => a.letter < b.letter ? -1 : 1)
}

const ContactList = ({ navigation, contacts, term }) => {
    const handlePress = (id) => {
        navigation.navigate('Details', { contactDetail: contacts.find(item => item.id === id) })
    }

    const renderItem = (itemList) => {
        return (
            <>
                {!term && <Text style={styles.letter}>{itemList.letter}</Text>}
                <FlatList
                    data={itemList.contacts}
                    renderItem={(element) => <ContactItem item={element.item} handlePress={handlePress} term={term} />}
                    keyExtractor={item => `contact${item.id}`}
                />
            </>
        )
    }

    return (
        <>
            <Text style={styles.contactText}>{term ? `${contacts.length} found` : 'All Contacts'}</Text>
            <FlatList
                data={getAlphabeticallyFilteredList(contacts)}
                renderItem={(element) => renderItem(element.item)}
                keyExtractor={item => item.letter}
            />
        </>
    )
}

const styles = StyleSheet.create({
    contactText: { paddingVertical: 10 },
    letter: {
        fontSize: 15,
        borderTopWidth: 1,
        paddingTop: 20,
        borderTopColor: '#dddddd'
    }
})

export default ContactList