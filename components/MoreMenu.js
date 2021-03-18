import React, { useState } from "react"
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View } from "react-native"
import { Feather } from '@expo/vector-icons'

import { connect } from "react-redux"
import { deleteContact } from '../redux/actions'

const MoreMenu = ({ contactDetail, navigation, dispatchDeleteContact }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const goToEditSreen = () => {
        navigation.navigate('Edit Contact', { contactDetail })
        setModalVisible(false)
    }

    const deleteAndGoToHomeScreen = () => {
        dispatchDeleteContact(contactDetail.id)
        navigation.navigate('Home')
        setModalVisible(false)
    }

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
                    <View style={styles.modalBackdrop}>
                        <View style={styles.modalView}>
                            <TouchableOpacity onPress={goToEditSreen}>
                                <Text style={styles.modalText}>Edit Contact</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={deleteAndGoToHomeScreen}>
                                <Text style={styles.modalText}>Delete Contact</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible(true)}            >
                <Feather name='more-vertical' size={40} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingBottom: 10,
        marginLeft: 'auto',
    },
    modalText: {
        paddingTop: 20,
        paddingBottom: 10,
        fontWeight: "bold",
        borderRadius: 10
    }
})

const mapDispatchToProps = (dispatch) => ({
    dispatchDeleteContact: (id) => dispatch(deleteContact(id))
})

export default connect(null, mapDispatchToProps)(MoreMenu)
