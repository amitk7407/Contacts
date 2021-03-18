import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const ImageUpload = ({ handleChange, image }) => {
    const [selectedImage, setSelectedImage] = useState(image)

    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!')
            return
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync()

        if (pickerResult.cancelled === true) {
            return
        }

        setSelectedImage(pickerResult.uri)
        handleChange('image', pickerResult.uri)
    }

    return (
        <TouchableOpacity onPress={openImagePickerAsync}>
            {selectedImage ? <Image source={{ uri: selectedImage }} style={styles.image} /> :
                <Ionicons name="person-circle-outline" style={styles.personIcon} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    personIcon: {
        fontSize: 100,
        color: '#dddddd',
        alignSelf: 'center'
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 50
    },
})

export default ImageUpload