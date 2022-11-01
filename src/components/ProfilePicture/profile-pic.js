import { View, Image, StyleSheet } from 'react-native'
import React from 'react'

const ProfilePic = ({ radius, source, style }) => {
    return (
        <View>
            <Image
                source={source}
                style={[style, styles.img, { width: radius }, { height: radius }]}
                resizeMode='cover' />
        </View>
    )
}
const styles = StyleSheet.create({
    img: {
        borderRadius: '100%',
        borderWidth: 2, 
        borderColor: '#1093c9', 
        margin: '5%'
    }
})
export default ProfilePic