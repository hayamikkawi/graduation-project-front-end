import { StyleSheet, Pressable } from 'react-native'
import React from 'react'
import SearchResultCardInner from './search-result-card-inner';


const SearchResultCard = ({ ride, navigation, numberOfPassengers, asDriver = false, asPassenger = false  }) => {
    const onPress = () => {
        navigation.navigate('SearchResultExpanded', {
            ride: ride, 
            numberOfPassengers: numberOfPassengers, 
            asPassenger: asPassenger, 
            asDriver: asDriver
        })
    }
    return (
        // <ScrollView style={styles.outerRoot}>
        <Pressable
            style={styles.root}
            onPress={onPress}
        >
            <SearchResultCardInner ride={ride} asDriver = {asDriver} asPassenger ={asPassenger}/>
        </Pressable>
        // </ScrollView>

    )
}
const styles = StyleSheet.create({

    // outerRoot:{
    //     margin: '5%',
    //     width: '80%', 
    //     height: 250, 
    //     borderRadius: '10%',
    //     borderColor: 'white', 
    //     borderWidth: 1,

    // },
    root: {
        width: '80%',
        borderWidth: 1,
        padding: '3%',
        borderRadius: '10%',
        backgroundColor: '#303438',
        //backgroundColor: '#77838c',
        borderColor: '#1093c9',
        marginHorizontal: '10%',
        marginVertical: '4%'
    }
})
export default SearchResultCard