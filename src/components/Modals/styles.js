import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    succeedModalView: {
        width: '90%',
        height: '40%',
        marginHorizontal: '5%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: '10%',
        alignItems: 'center',
        shadowColor: '#ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    modalView: {
        width: '80%',
        height: '30%',
        margin: '5%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: '5%',
        paddingVertical: '8%',
        alignItems: 'center',
        shadowColor: '#ff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#1093c9',
        fontSize: 22,
        fontFamily: 'kanyon-bold'
    },
    modalTextError: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
        fontSize: 22,
        fontFamily: 'kanyon-bold'
    },
    modalButtons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    button: {
        width: '20%',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        padding: '5%',
        width: '90%',
        marginHorizontal: '5%',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    textInput: {
        width: '100%',
        borderRadius: '5%'
    }
})
module.exports = styles