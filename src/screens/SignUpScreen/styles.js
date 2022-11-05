import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#262a2d',
        width: '100%',
        height: '100%',
        fontFamily: 'kanyon-normal',
        padding: '10%',
        alignContent: 'center',
    },
    outerContainer: {
        marginVertical: '10%'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '5%',
        width: '90%',
        borderColor: '#1093c9',
        borderWidth: 1,
        borderRadius: '10%'
    },
    dateContainer: {
        flex: 1,
        //flexDirection: 'row',
        // justifyContent: 'space-between',
        margin: '5%',
        width: '90%',
        borderColor: '#1093c9',
        borderWidth: 1,
        borderRadius: '10%'
    },
    customContainer: {
        marginTop: 0,
        marginBottom: '0%',
        marginLeft: '5%',
        width: '90%',
    },
    toggleContainer: {
        width: '90%',
        margin: '5%',
        marginBottom: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    temp: {
        width: '65%',
        height: '100%',
        fontSize: 17,
        color: 'white'
    },
    title: {
        color: 'white',
        fontFamily: 'kanyon-bold',
        fontSize: 30,

    },
    whiteText: {
        color: 'white',
        fontFamily: 'kanyon-normal',
        fontSize: 17
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        width: '50%'
    },
    toggle: {
        marginTop: '3%'
    },
    buttonContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})
module.exports = styles