import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const ProfilePic = ({ radius, source }) => {
    return (
        <View>
            <Image
                source={source}
                style={[styles.img, { width: radius }, { height: radius }]}
                resizeMode='stretch' />
        </View>
    )
}
const styles = StyleSheet.create({
    img: {
        borderRadius: '50%',
        borderWidth: 2, 
        borderColor: '#1093c9', 
        margin: '5%'
    }
})
export default ProfilePic