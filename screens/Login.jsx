import React, { useState } from "react";
import { Image, Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native"
import backimg from '../assets/background.jpg'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Login Success'))
        .catch(err => Alert.alert('Login error', err.message))

      setEmail('')
      setPassword('')
    }else {
      let desc = 'Ingrese las credenciales'
      Alert.alert('Login Error', desc)
    }
  }

  // console.log(navigation)
  return (
    <View style={styles.container}>
      <Image source={backimg} />
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.whiteSheet}>
        <SafeAreaView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Enter email" 
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password" 
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin} >
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.dontAcount}>Don't have an account?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signUp}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    position: 'absolute',
    top: '15%',
    left: '30%',
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold'
  },
  whiteSheet: {
    width: '80%',
    height: '60%',
    backgroundColor: '#fff',
    position: 'absolute',
    // bottom: 0,
    top: '25%',
    left: '10%',
    borderRadius: 60 
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: '#f6f7fb',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  button: {
    backgroundColor: '#67e48c',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  dontAcount: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 14
  },
  signUp: {
    color: '#67e48c',
    fontWeight: '600',
    fontSize: 14
  }
})

