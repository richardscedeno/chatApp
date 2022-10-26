import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Image, Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native"
import backimg from '../assets/background.jpg'
import { auth } from "../config/firebase";

export const Signup = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch(err => Alert.alert('Login error', err.message))

      setEmail('')
      setPassword('')
    }else {
      let desc = 'Ingrese los datos a registrar'
      Alert.alert('Signup Error', desc)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={backimg} />
      <Text style={styles.title}>Register</Text>
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

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.textButton}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.dontAcount}>Alredy A Member</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signIn}> Log In</Text>
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
  signIn: {
    color: '#67e48c',
    fontWeight: '600',
    fontSize: 14
  }
})

