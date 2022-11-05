import { ScrollView, Text, StyleSheet, View } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

const CommentCard = ({ onReviewerPress, name, comment }) => {
    return (
        <View style={styles.root}>
            <Pressable style={styles.flexBig} onPress={onReviewerPress}>
                <View style={styles.flex}>
                    <Ionicon name='person-circle' size={25} color={'white'} />
                    <Text style={[styles.text, { marginLeft: '5%' }, { fontFamily: 'kanyon-bold' }]}>{name}:</Text>
                </View>
                <Ionicon name='caret-forward' color={'#1093c9'} size={25} />
            </Pressable>
            <ScrollView >
                <View>
                    <Text style={[styles.text, { marginLeft: '10%' }]}>{comment}</Text>
                </View>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    root: {
        backgroundColor: 'rgba(26,29,29, 0.8)',
        margin: '2%',
        width: '96%',
        height: 150,
        padding: '5%',
        borderRadius: '2%'
    },
    text: {
        color: 'white',
        fontFamily: 'kanyon-normal',
        fontSize: 15
    },
    flexBig:{
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    flex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '3%', 
    }
})
export default CommentCard