import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useWindowDimensions } from 'react-native'
import ProfilePic from '../../components/ProfilePicture/profile-pic'
import CustomHeader from '../../components/Header/header'
import CustomButton from '../../components/CustomButton'
import { AirbnbRating } from 'react-native-ratings'
import * as SecureStore from 'expo-secure-store'
import API_URL from '../../App_URL'
import RatingModal from '../../components/Modals/rating-modal'
import { Buffer } from "buffer";
import { useFocusEffect } from '@react-navigation/native';
import CommentCard from '../../components/Cards/comment-card.js'
import { Avatar } from 'react-native-gifted-chat'
import ReportModal from '../../components/Modals/report-modal'

const Profile = ({ navigation, route }) => {
    const [id, setId] = useState(route.params.id)
    const [rating, setRating] = useState(false)
    const [report, setReport] = useState(false)
    const [role, setRole] = useState('')
    const { other } = route.params
    const { height } = useWindowDimensions()
    // const dummyUser = {
    //     id: 1, 
    //     username: 'Haya Mikkawi',
    //     email: 'hayamikkawi@gmail.com',
    //     mobileNumber: '0595564459',
    //     role: 'user',
    //     bio: 'Haya Mikkawi, 21 year old from Nablus, Software Engineer at Apple-Rawabi and student at NNU',
    //     rating: 2.5,
    //     dateOfBirth: '2000.11.23',
    //     gender: 'female',
    //     phoneVerified: false,
    //     emailVerified: true,
    //     profilePic: User,
    //     reviews: [{
    //         id: 1,
    //         reviewer: 'Aya',
    //         comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tellus dui, mollis elementum odio at, vestibulum cursus odio. Donec in velit posuere, volutpat urna at, luctus felis. Donec accumsan erat ac nisi egestas, non volutpat ante accumsan. In lacinia massa sed dui ultricies porta id sollicitudin quam. Integer vehicula viverra lacus a feugiat. Curabitur a dignissim urna, et mattis felis. Morbi sagittis et nisl non dignissim. Maecenas nec aliquet nulla. Vivamus laoreet bibendum nibh at rutrum. Curabitur quis ante id neque porta pharetra ut vel nulla. Sed nec lectus lectus.",
    //         reviewerId: 4
    //     }, {
    //         id: 2,
    //         reviewer: 'dana',
    //         comment: 'A little bit late!',
    //         reviewId: 5
    //     }]
    // }
    const [user, setUser] = useState('')
    const [imageURL, setImageURL] = useState('')
    useFocusEffect(
        React.useCallback(() => {
            const fetchUserId = async () => {
                console.log('fetching data')
                if (!other) {
                    const userString = await SecureStore.getItemAsync('user')
                    const user = JSON.parse(userString)
                    console.log('id: ' + user.id)
                    setId(user.id)
                    setRole(user.role)
                }
            }
            const fetchUserData = async () => {
                const token = await SecureStore.getItemAsync('secureToken')
                console.log(`${API_URL}/users/profile/${id}`)
                axios.get(`${API_URL}/users/profile/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },

                }).then((res) => {
                    if (res.status == 200) {
                        setUser(res.data)
                        try {
                            const b = new Buffer.from(res.data.profilePicture.data, 'binary').toString('base64')
                            setImageURL('data:image/jpeg;base64,' + b)
                        } catch (err) {
                            console.log(err)
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
            if (!other)
                fetchUserId()
            // if(id != 0)
            //     fetchUserData()
            fetchUserData()
        }, [])
    )
    useEffect(() => {
        const fetchUserData = async () => {
            const token = await SecureStore.getItemAsync('secureToken')
            console.log(`${API_URL}/users/profile/${id}`)
            axios.get(`${API_URL}/users/profile/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },

            }).then((res) => {
                if (res.status == 200) {
                    setUser(res.data)
                    try {
                        const b = new Buffer.from(res.data.profilePicture.data, 'binary').toString('base64')
                        setImageURL('data:image/jpeg;base64,' + b)
                    } catch (err) {
                        console.log(err)
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        if (id != 0)
            fetchUserData()
    }, [id, role])

    const onEditPress = () => {
        console.log('edit')
        navigation.navigate('Profile-Edit', {
            user,
            setUser,
            uri: imageURL,
            setImageURL
        })
    }
    const onVerifyPress = () => {
        navigation.navigate('Profile-Verify', {
            user: user
        })
    }
    const onLogoutPress = async () => {
        const expoToken = await SecureStore.getItemAsync('expoToken')
        const token = await SecureStore.getItemAsync('secureToken')
        axios.post(`${API_URL}/me/logout`, {
            pushToken: expoToken
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(async (res) => {
            if (res.status == 200) {
                await SecureStore.deleteItemAsync('secureToken')
                await SecureStore.deleteItemAsync('user')
                route.params.setIsSigned(false)
                navigation.navigate("Pre")
                //route.params.setIsSigned(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const onContactPress = async () => {
        const sender = await SecureStore.getItemAsync('user')
        const senderJson = await JSON.parse(sender)
        const receiver = {
            _id: id,
            name: user.username,
            profilePicture: Avatar
        }
        const sender2 = {
            _id: senderJson.id,
            name: senderJson.username
        }
        navigation.navigate('Chat-Screen', {
            receiver,
            sender: sender2
        })
    }
    const onRatePress = () => {
        setRating(true)
    }
    const onReviewerPress = (userId) => {
        console.log('visiting profile')
        navigation.push('Profile-Other', {
            id: userId,
            other: true,
        })
    }
    const onReportPress = () => {
        setReport(true)
    }
    return (
        <ScrollView style={styles.root}>
            <ReportModal modalVisible={report} onPress={() => setReport(false)} userId={id} />
            <RatingModal modalVisible={rating} onPress={() => setRating(false)} userId={id} />
            <View style={styles.header}>
                <View style={[styles.div, { height: 0.3 * height }]}>
                    {imageURL && <ProfilePic source={{ uri: imageURL }} radius={180} style={[styles.img, { marginTop: .5 * .3 * height }]} />
                    }
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
                                isDisabled={true}
                            />
                        </View>
                        <View style={styles.bio}>
                            <Text style={styles.text}>{user.bio}</Text>
                        </View>
                        {other ?
                            <View style={styles.flex}>
                                <CustomButton width='27%' text={'Contact'} onPress={onContactPress} />
                                <CustomButton width='25%' text={'Rate'} onPress={onRatePress} />
                                <CustomButton width='25%' text={'Report'} onPress={onReportPress} />
                            </View> : <View style={styles.flex}>
                                <CustomButton width='20%' icon={'build'} onPress={onEditPress} />
                                {(user.phoneVerified == true && user.emailVerified == true) ?
                                    <CustomButton width='20%' icon={'checkmark-done'} bgcolor='#80B362' /> :
                                    <CustomButton width='20%' icon={'shield-checkmark'} onPress={onVerifyPress} />
                                }
                                <CustomButton width='20%' icon={'log-out'} onPress={onLogoutPress} />
                            </View>}
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
                {!user.comments || user.comments.length == 0 && <Text style={styles.text}>No Reviews</Text>}
                {user.comments && user.comments.map((review, index) => {
                    return <CommentCard
                        key={index}
                        name={review.username}
                        comment={review.comment}
                        onReviewerPress={() => onReviewerPress(review.userId)} />
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
        marginHorizontal: '15%',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        // fontFamily: 'kanyon-medium',
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