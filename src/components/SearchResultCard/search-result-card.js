import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchResultCard = () => {
    return (
        <Pressable 
            style= {styles.root}
            onPress={()=>{console.log('hey')}}
        >
            <View style= {styles.container}>
                <Text style={styles.text}>1:30</Text>
                <Text style={styles.text}>Nablus</Text>
            </View>
            <View style= {styles.container}>
                <Text style={styles.text}>3:30</Text>
                <Text style={styles.text}>Ramallah</Text>
            </View>
            <View style= {styles.iconsContainer}>
                <Ionicons name='female-outline' size={25}/>
                <Ionicons name='wifi-outline' size={25}/>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    root: {
        width: '90%', 
        margin: '5%', 
        borderWidth: 1, 
        padding: '5%', 
        borderRadius: '10%', 
    },
    container: {
        flexDirection: 'row', 
        alignContent: 'space-between'
    }, 
    iconsContainer: {
        flexDirection: 'row', 
        alignContent: 'flex-end', 
        //borderWidth: 1, 
        padding: '3%'
    },
    text: {
        margin:'5%', 
        fontFamily: 'kanyon-medium', 
        fontSize: 17
    }
})
export default SearchResultCard