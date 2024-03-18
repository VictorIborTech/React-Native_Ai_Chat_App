import { View, Text } from 'react-native'
import React, {useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat'
import GlobalApi from '../Services/GlobalApi';
import * as GoogleGenerativeAI from "@google/generative-ai";

// NOTE:
// I previosly used the GlobalApi.js to generate my AI response but it was having a slow buildup and runtime, 
// So I had to use the Gemini-pro directory from google.
// Code of the Globalapi.js integration is below(uncomment it to see changes.)

export default function ChatScreen() {

    const param = useRoute().params
    const API_KEY = "AIzaSyAQzu5XuhjiYbFtw2AtRiQHbB4tC0fD_XM";

    const [messages, setMessages] = useState([]);
    const [selectedchatFace, setSelectedChatFace] =  useState([])

    // loading effect
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setSelectedChatFace(param.selectedFace)
        setMessages([
            {
            _id: 1,
            text: 'Hello, I am '+param.selectedFace?.name,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: param.selectedFace?.image,
            },
            },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages), )

      // console.log(messages[0].text)

  
      // condition to check if there's a response
      if (messages[0].text){

        // getBardApi(messages[0].text);
        // sendMessage(messages[0].text);

        const sendMessage = async () => {
          const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = messages[0].text;
          // console.log(prompt);
          const result = await model.generateContent(prompt);
          const response = result.response;
          const text = response.text();

          // if(resp.data.resp[1].content){
          if(text){
            const chatAIResp={
              _id: Math.random()* (9999999 - 1),
              text: text,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Bot_Response',
                avatar: param.selectedFace?.image,
            
            }
          }
              // here if message, then append the chatbot response to the previous message
              setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  

              // here if we have a message on the chat, then loading effect should return to initial false.
              setLoading(false);
        }
    }

    // calling the chat response generation function
    sendMessage();


        // here if message, then loading effect should be true.
        setLoading(true);
      }
    }, [])

    


    return (
      <GiftedChat
        messages={messages}
        isTyping={loading}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )

    // const getBardApi = (msg) => {
    //     GlobalApi.getBardApi(msg).then( resp => {

    //               // console.log(resp.data)
    //           if(resp.data.resp[1].content){
    //                 const chatAIResp={
    //                   _id: Math.random()* (9999999 - 1),
    //                   text: resp.data.resp[1].content,
    //                   createdAt: new Date(),
    //                   user: {
    //                     _id: 2,
    //                     name: 'Bot_Response',
    //                     avatar: param.selectedFace?.image,
                    
    //                 }
    //               }
    //               // here if message, then append the chatbot response to the previous message
    //               setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  

    //               // here if we have a message on the chat, then loading effect should return to initial false.
    //               setLoading(false);
    //         }
    //         else{
    //               // here if we our bot don't have an answer on the chat, then loading effect should return to initial false.
    //               setLoading(false);

    //               // Now our bot response, if not result
    //               const chatAIResp={
    //                 _id: Math.random()* (9999999 - 1),
    //                 text: "Sorry, I am just a chat buddy, I don't have an answer for you, Please can you rephrase your question?",
    //                 createdAt: new Date(),
    //                 user: {
    //                   _id: 2,
    //                   name: 'Bot_Response',
    //                   avatar: param.selectedFace?.image,
                  
    //               }
    //             }

    //              // here is the chatbot message when there is no answer, then append the chatbot response to the previous message
    //              setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  


    //         }
            
    //     });
    // }
  
    
}




// import React, { useState, useEffect } from "react";
// import * as GoogleGenerativeAI from "@google/generative-ai";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import * as Speech from "expo-speech";
// import { FontAwesome } from "@expo/vector-icons";

// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const API_KEY = "AIzaSyAQzu5XuhjiYbFtw2AtRiQHbB4tC0fD_XM";

//   useEffect(() => {
//     const startChat = async () => {
//       const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//       const prompt = "hello! ";
//       const result = await model.generateContent(prompt);
//       const response = result.response;
//       const text = response.text();
//       console.log(text);
//       setMessages([
//         {
//           text,
//           user: false,
//         },
//       ]);
//     };
//     startChat();
//   }, []);

//   const sendMessage = async () => {
//     setLoading(true);
//     const userMessage = { text: userInput, user: true };
//     setMessages([...messages, userMessage]);

//     const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const prompt = userMessage.text;
//     const result = await model.generateContent(prompt);
//     const response = result.response;
//     const text = response.text();
//     setMessages([...messages, { text, user: false }]);
//     setLoading(false);
//     setUserInput("");

//     if (text) {
//       Speech.speak(text);
//     }
//   };

//   const toggleSpeech = () => {
//     // setIsSpeaking(!isSpeaking);
//     console.log("isSpeaking", isSpeaking);
//   };

//   const renderMessage = ({ item }) => (
//     <View style={styles.messageContainer}>
//       <Text style={[styles.messageText, item.user && styles.userMessage]}>
//         {item.text}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={messages}
//         renderItem={renderMessage}
//         keyExtractor={(item) => item.text}
//         inverted
//       />
//       <View style={styles.inputContainer}>
//         {/* microphone icon */}
//         <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
//           <FontAwesome
//             name="microphone"
//             size={24}
//             color="black"
//             style={{
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           />
//         </TouchableOpacity>
//         <TextInput
//           placeholder="Type a message"
//           onChangeText={setUserInput}
//           value={userInput}
//           onSubmitEditing={sendMessage}
//           style={styles.input}
//           placeholderTextColor="black"
//         />
//         {loading && <ActivityIndicator size="small" color="black" />}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#ffff", marginTop: 50 },
//   messageContainer: { padding: 10, marginVertical: 5 },
//   messageText: { fontSize: 16 },
//   // userMessage: { backgroundColor: "#f0f0f0" },
//   inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
//   input: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#B7C9F2",
//     borderRadius: 10,
//     height: 50,
//   },
//   micIcon: {
//     padding: 10,
//     backgroundColor: "#B7C9F2",
//     borderRadius: 25,
//     height: 50,
//     width: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 5,
//   },
// });

// export default ChatScreen;