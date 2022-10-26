import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useCallback, useLayoutEffect, useState } from "react";
import { View, Text } from "react-native"
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, database } from "../config/firebase";

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, 'chats')
    const q = query(collectionRef, orderBy('createdAt', 'desc'))

    const unSubcribe = onSnapshot(q, snapshot => {
      console.log('snapshot')
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })

    return unSubcribe
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    const {_id, createdAt, text, user } = messages[0]

    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    })
  }, [])


  return (
    // <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //   <Text>Chat Screen</Text>
    // </View>

      <View style={{flex:1, backgroundColor: '#fff'}}>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
          messagesContainerStyle={{
            backgroundColor: '#fff',
          }}
        />
      </View>
  )
}