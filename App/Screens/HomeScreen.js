import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import ChatFaceData from '../Services/ChatFaceData';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [chatFaceData, setChatFaceData] =  useState([]);
  const [selectedchatFace, setSelectedChatFace] =  useState([])

  useEffect(() => {
    setChatFaceData (ChatFaceData)
    setSelectedChatFace (ChatFaceData[0])
  }, [])

  const onFacePress = (id) => {
    setSelectedChatFace (ChatFaceData[id - 1]); 
  }

  const { navigate } = useNavigation();
  
  // Handle Navigation for selected buddy
  const handleNavigation = () => {
    navigate('Chat', {selectedFace: selectedchatFace});
  }
  
  return (
    <View style={{alignItems:'center',  paddingTop: 90 }}>
      <Text style={[{color: selectedchatFace.primary}, {fontSize:35}]}>Hello</Text>
      <Text style={[{color: selectedchatFace.primary}, {fontSize:27, fontWeight:'bold'}]}>I am {selectedchatFace.name}</Text>
     
      <Image source={{uri: selectedchatFace.image}} style={{ width: 230, height:230, marginTop:50}}/>    

      <Text style={{marginTop:15, fontSize:25}}>How can I help you?</Text> 

      <View style={{marginTop:15, padding:10,  backgroundColor:'#F5F5F5', height:110, alignItems:'center', borderRadius:20}}>
          <FlatList
              data={ChatFaceData}
              horizontal={true}
              renderItem={({item}) => selectedchatFace.id != item.id && (
              
              <TouchableOpacity onPress={() => onFacePress(item.id)} style={{margin:15}}>
                    <Image source={{uri: item.image}} style={{ width: 40, height:40}}/>
              </TouchableOpacity>
                
              )}
          />
          <Text style={{marginTop:5,fontSize:17, color:'#818589'}}>Choose your chat buddy</Text>
      </View>


      <TouchableOpacity onPress={handleNavigation} style={[{backgroundColor: selectedchatFace.primary}, { margin:50,  alignItems:'center', padding:10,  borderRadius:15, width: Dimensions.get('screen').width*0.6} ]}>
        <Text style={{color:'white', fontSize:20,}}>
                Let Chat
        </Text>
       </TouchableOpacity>
      
    </View>
  )
}