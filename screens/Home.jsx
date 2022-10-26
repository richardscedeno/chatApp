import { View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
// const urlImg = "https://images.pexels.com/photos/617278/pexels-photo-617278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
// import { TouchableOpacity } from "react-native-gesture-handler"
import { AntDesign } from '@expo/vector-icons'

export const Home = () => {
  const navigation = useNavigation()
  // console.log(navigation)

  const handleLogout = () => {
    signOut(auth).catch(err => console.log(err))
  }

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome name="search" style={styles.search} />
      ),
      // headerRight: () => (
      //   <Image source={{ uri: urlImg }} style={styles.img}/>
      // )
      headerRight: () => (
        <TouchableOpacity style={{marginRight:10}} onPress={handleLogout} >
          <AntDesign name='logout' size={24} style={{color:'gray', marginRight:10}} />
        </TouchableOpacity>
      )
    })
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
        <Entypo name="chat" style={styles.chat} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // backgroundColor: "#fff"
  },
  chat: {
    fontSize: 28,
    color: '#fff'
  },
  chatButton: {
    backgroundColor: 'green',
    height: 50,
    width: 50,

    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: .9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 20
  },
  search: {
    fontSize: 24,
    color: 'green',
    marginLeft: 15
  },
  img: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 50
  }
})