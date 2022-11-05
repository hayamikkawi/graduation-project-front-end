import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgcolor, fgcolor, disabled = false, width = '90%', icon }) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.container,
                styles[`container_${type}`],
                bgcolor ? { backgroundColor: bgcolor } : {},
                width ? { width: width } : '90%',
                disabled && { backgroundColor: 'gray' }
            ]
            }
        >

            <View style={styles.flex}>
                <Text style={[
                    styles.text,
                    styles[`text_${type}`],
                    fgcolor ? { color: fgcolor } : {},
                    // disabled && {color: 'black'}
                ]}
                >{text}
                </Text>
                {icon && <Ionicon name={icon} size={20} color={'white'} />}
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            width: '90%',
            padding: 15,
            marginVertical: 10,
            marginLeft: '5%',
            alignItems: 'center',
            borderRadius: '50%',

        },
        container_PRIMARY: {
            backgroundColor: '#1093c9'
        },
        container_TERTIARY: {

        },
        text_TERTIARY: {
            color: 'white',
            fontFamily: 'kanyon-medium'
        },
        text: {
            fontFamily: 'kanyon-bold',
            color: 'white',
            fontSize: '17'
        },
        flex: {
            flexDirection: 'row'
        }
    }
)

export default CustomButton