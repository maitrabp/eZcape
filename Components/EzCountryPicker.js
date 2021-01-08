import React from 'react'
import { View, Text, Modal } from 'react-native'

const EzCountryPicker = (props) => {
    return (
        <View>
            <Modal visible={props.isVisible}>
                <View>
                    <Text>Modal Open</Text>
                </View>
            </Modal>
        </View>
    )
}

export default EzCountryPicker
