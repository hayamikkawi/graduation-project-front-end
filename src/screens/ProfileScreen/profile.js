import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useWindowDimensions } from 'react-native'
import ProfilePic from '../../components/ProfilePicture/profile-pic'
import User from '../../../assets/user/F38.jpg'
import CustomHeader from '../../components/Header/header'
import CustomButton from '../../components/CustomButton'
import { Rating, AirbnbRating } from 'react-native-ratings'
import CommentCard from '../../components/Cards/comment-card'
import * as SecureStore from 'expo-secure-store'
import API_URL from '../../App_URL'

const Profile = ({ navigation, route }) => {

    const dummyUser = {
        username: 'Haya Mikkawi',
        email: 'hayamikkawi@gmail.com',
        mobileNumber: '0595564459',
        role: 'user',
        bio: 'Haya Mikkawi, 21 year old from Nablus, Software Engineer at Apple-Rawabi and student at NNU',
        rating: 2.5,
        dateOfBirth: '2000.11.23',
        gender: 'female',
        phoneVerified: false,
        emailVerified: true,
        profilePic: User, 
        reviews: [{
            id: 1,
            reviewer: 'Aya',
            comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tellus dui, mollis elementum odio at, vestibulum cursus odio. Donec in velit posuere, volutpat urna at, luctus felis. Donec accumsan erat ac nisi egestas, non volutpat ante accumsan. In lacinia massa sed dui ultricies porta id sollicitudin quam. Integer vehicula viverra lacus a feugiat. Curabitur a dignissim urna, et mattis felis. Morbi sagittis et nisl non dignissim. Maecenas nec aliquet nulla. Vivamus laoreet bibendum nibh at rutrum. Curabitur quis ante id neque porta pharetra ut vel nulla. Sed nec lectus lectus."
        }, {
            id: 2,
            reviewer: 'dana',
            comment: 'A little bit late!'
        }]
    }
    const { height } = useWindowDimensions()
    const [user, setUser] = useState(dummyUser)
    const [bio, setUserBio] = useState(user.bio)
    const [pic, setUserPic] = useState(user.profilePic)

    useEffect(() => {
        console.log('opening profile image')
        const fetchUserData = async () => {
            const token = await SecureStore.getItemAsync('secureToken')
            axios.get('/user/me', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then((res) => {
                if (res.status == 200) {
                    setUser(res.data.user)
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        //  fetchUserData()
        return () => {

        };
    }, [])

    const onEditPress = () => {
        navigation.navigate('Profile-Edit', {
            user, 
            setUser
        })
    }
    const onVerifyPress = () => {
        navigation.navigate('Profile-Verify', {
            user: user
        })
    }
    const onLogoutPress = async () => {
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/users/logout`, {}, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(async (res) => {
            if (res.status == 200) {
                await SecureStore.deleteItemAsync('secureToken')
                navigation.navigate("Log in")
               //route.params.setIsSigned(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <ScrollView style={styles.root}>
            <View style={styles.header}>
                <View style={[styles.div, { height: 0.3 * height }]}>
                    <ProfilePic source={user.profilePic} radius={180} style={[styles.img, { marginTop: .5 * .3 * height }]} />
                </View>
                <View style={styles.userMain}>
                    <View style={[{ marginTop: .3 * .3 * height }]}>
                        <CustomHeader text={user.username} size={20} />
                    </View>
                    <View style={styles.userInfo}>
                        <View style={styles.role}>
                            <Text style={[styles.text, { color: '#1093c9', fontFamily: 'kanyon-bold', fontSize: 17 }]}>Role: {user.role}</Text>
                            <AirbnbRating
                                count={5}
                                defaultRating={user.rating}
                                size={20}
                            />
                        </View>
                        <View style={styles.bio}>
                            <Text style={styles.text}>{user.bio}</Text>
                        </View>
                        <View style={styles.flex}>
                            <CustomButton width='20%' icon={'build'} onPress={onEditPress} />
                            {(user.phoneVerified == true && user.emailVerified == true) ?
                                <CustomButton width='20%' icon={'checkmark-done'} bgcolor='#80B362' /> :
                                <CustomButton width='20%' icon={'shield-checkmark'} onPress={onVerifyPress} />
                            }
                            <CustomButton width='20%' icon={'log-out'} onPress={onLogoutPress} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.contactInfo}>
                <View style={styles.flex}>
                    <Text style={styles.text}>Date of Birth: </Text>
                    <Text style={styles.text}>   {user.dateOfBirth}</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.text}>Gender: </Text>
                    <Text style={styles.text}>   {user.gender}</Text>
                </View>
            </View>
            <View style={styles.contactInfo}>
                <CustomHeader text={'Contact Details'} size={17} />
                <View style={styles.flex}>
                    <Text style={styles.text}>Email: </Text>
                    <Text style={styles.text}>   {user.email}</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.text}>Mobile Number: </Text>
                    <Text style={styles.text}>   {user.mobileNumber}</Text>
                </View>
            </View>
            <View style={styles.contactInfo}>
                <CustomHeader text={'Reviews'} size={17} />
                {user.reviews.length == 0 && <Text style={styles.text}>No Reviews</Text>}
                {user.reviews.map((review) => {
                    return <CommentCard key={review.id} name={review.reviewer} comment={review.comment} />
                })}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#262a2d',
        padding: '2%'
    },
    header: {
        alignContent: 'center',
        alignItems: 'center'
    },
    div: {
        width: '100%',
        backgroundColor: 'rgba(16, 147, 201, .6)',
        borderTopLeftRadius: '5%',
        borderTopRightRadius: '5%',
        alignItems: 'center'
    },
    img: {
    },
    userInfo: {

    },
    bio: {
        width: '80%',
    },
    text: {
        color: 'white',
        fontFamily: 'kanyon-medium',
        fontSize: 16,
        lineHeight: 25,
        textAlign: 'center',
    },
    userMain: {
        alignContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: 'rgba(16, 147, 201, .6)',
        width: '100%',
        padding: '2%',
        borderBottomLeftRadius: '5%',
        borderBottomRightRadius: '5%',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    role: {
        alignItems: 'center',
        marginBottom: '2%',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    contactInfo: {
        width: '100%',
        marginVertical: '5%',
        borderColor: 'rgba(16, 147, 201, .6)',
        borderWidth: 1,
        padding: '5%',
        borderRadius: '5%'
    }
})
export default Profile