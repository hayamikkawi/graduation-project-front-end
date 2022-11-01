import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#262a2d'
    },
    text: {
        color: 'white',
        fontFamily: 'kanyon-medium',
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'center',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
        padding: '2%',
        width: '90%',
        flexWrap: 'wrap'
    },
    center: {
        alignItems: 'center',
    },
    customCenter: {
        alignItems: 'center',
        width: '70%', 
        marginHorizontal: '15%', 
        marginVertical: '5%'
    },
    outer: {
        marginBottom: '10%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingVertical: '2%'

    },
    textInput: {
        borderRadius: '3%'
    }
})

module.exports = styles