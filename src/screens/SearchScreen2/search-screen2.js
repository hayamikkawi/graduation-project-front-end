import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete/GooglePlacesAutocomplete'

const Google_Key = require('../../Google-Key')
const SearchScreenMap = ({ route, navigation }) => {
    return (
        <GooglePlacesAutocomplete
            styles={{
                container: {
                    width: '100%',
                    backgroundColor: '#262a2d'
                },
                textInputContainer: {
                    width: '100%',
                },
                textInput: {
                    width: '100%',
                    backgroundColor: '#262a2d',
                    color: 'white',
                    borderBottomWidth: 1, 
                    borderColor: 'gray', 
                }
            }}
            placeholder="Search"
            textInputProps={{
                placeholderTextColor: 'gray',
                returnKeyType: "search"
              }}
            query={{
                key: Google_Key,
                language: 'en', // language of the results
            }}
            onPress={(data, details = null) => {
                console.log(data)
                navigation.goBack()
                if(route.params.data === "destination"){
                    route.params.changeDest(data.description, data.place_id)
                } else if (route.params.data === "source"){
                    route.params.changeSource(data.description, data.place_id)
                }
            }}
            onFail={(error) => console.error(error)}
            requestUrl={{
                url:
                    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                useOnPlatform: 'web',
            }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        />

    )
}

export default SearchScreenMap