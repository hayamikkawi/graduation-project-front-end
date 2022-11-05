import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../components/Header/header'
import Checkbox from 'expo-checkbox'
import Ionicon from 'react-native-vector-icons/Ionicons'
import CarSeat from '../../../assets/myIcons/car-chair.png'
import NoSmoke from '../../../assets/myIcons/no-smoke.png'
import Female from '../../../assets/myIcons/female.png'
import Disabled from '../../../assets/myIcons/disabled.png'
import NoAnimal from '../../../assets/myIcons/no-pets.png'
import NoChildren from '../../../assets/myIcons/children.png'
import AC from '../../../assets/myIcons/air-conditioner.png'
import CustomButton from '../../components/CustomButton'

const PublishProperties = ({ navigation, route }) => {
  const [onlyTwo, setOnlyTwo] = useState(false)
  const [noSmoke, setNoSmoke] = useState(false)
  const [girlsOnly, setGirlsOnly] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [noPets, setNoPets] = useState(false)
  const [noChildren, setNoChildren] = useState(false)
  const [ac, setAc] = useState(false)

  const onPress = () => {
    navigation.navigate('Publish-Number', {
      sourceDescription: route.params.sourceDescription,
      sourceId: route.params.sourceId,
      destDescription: route.params.destDescription,
      destId: route.params.destId,
      date: route.params.date,
      time: route.params.time,
      onlyTwo: onlyTwo,
      noSmoke: noSmoke,
      girlsOnly: girlsOnly,
      disabled: disabled,
      noPets: noPets,
      noChildren: noChildren,
      ac: ac
    })
  }

  return (
    <ScrollView style={styles.root}>
      <CustomHeader text={'Ride Properties'} />
      <CustomHeader
        text={"Please check the ride properties:"}
        textColor={'#1093c9'}
        size={22}
      />
      <View style={styles.container}>
        <View style={styles.propContainer}>
          <Image source={CarSeat} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}> Only 2 passengers in the back seat.</Text>
          <Checkbox
            value={onlyTwo}
            onValueChange={setOnlyTwo}
            style={styles.checkbox}
            color={'#1093c9'}
          />
        </View>
        <View style={styles.propContainer}>
          <Image source={NoSmoke} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}> Smoking not allowed</Text>
          <Checkbox
            value={noSmoke}
            onValueChange={setNoSmoke}
            style={styles.checkbox}
            color={'#1093c9'}
          />
        </View>
        <View style={styles.propContainer}>
          <Image source={Female} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}> Girls only</Text>
          <Checkbox
            value={girlsOnly}
            onValueChange={setGirlsOnly}
            style={styles.checkbox}
            color={'#1093c9'}
          />
        </View>
        <View style={styles.propContainer}>
          <Image source={Disabled} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}> Disabled seat available</Text>
          <Checkbox
            value={disabled}
            onValueChange={setDisabled}
            style={styles.checkbox}
            color={'#1093c9'}
          />
        </View>
        <View style={styles.propContainer}>
          <Image source={NoAnimal} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}> Pets not allowed</Text>
          <Checkbox
            value={noPets}
            onValueChange={setNoPets}
            style={styles.checkbox}
            color={'#1093c9'}
          />
        </View>
        <View style={styles.propContainer}>
          <Image source={NoChildren} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}> Children not allowed</Text>
          <Checkbox
            value={noChildren}
            onValueChange={setNoChildren}
            style={styles.checkbox}
            color={'#1093c9'}
          />
        </View>
        <View style={styles.propContainer}>
          <Image source={AC} style={styles.icon} resizeMode="contain" />
          <Text style={styles.text}> Air Conditioner</Text>
          <Checkbox
            value={ac}
            onValueChange={setAc}
            style={styles.checkbox}
            color={'#1093c9'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            text={'Next'}
            onPress={onPress}
          />
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: '#262a2d',
    width: '100%',
    height: '100%'
  },
  container: {
    flexDirection: 'column',
    width: '90%',
    margin: '5%'
  },
  propContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between', 
    //borderWidth: 1, 
    marginBottom: '5%', 
    flexWrap: 'wrap'

  },
  checkbox: {
    marginLeft: 8,
    margin: 8,
    width: 20,
    height: 20
  },
  icon: {
    width: 30,
    height: 30,
    //borderWidth: 1
  },
  text: {
    color: 'white',
    fontFamily: 'kanyon-normal',
    //borderWidth: 1, 
    borderColor: 'red',
    paddingTop: '3%',
    fontSize: 17
  }, 
  buttonContainer: {
    width: '70%',
    marginLeft:'20%', 
   // marginTop:'30%'
}
})
export default PublishProperties