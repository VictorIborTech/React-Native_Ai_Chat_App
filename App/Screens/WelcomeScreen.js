import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect } from "react";
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";

export default function WelcomeScreen() {
  useEffect(() => {
    setTimeout(() => {
      navigate('Home');
    }, 4000)
  }, [])

  const { navigate } = useNavigation();

  const handlePress = () => {
    navigate("Home");
  };
  return (
    <SafeAreaView
      style={{
        marginTop: 150,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginBottom: 250 }}>
        <Animatable.Text
          style={{
            fontSize: 40,
            textAlign: "center",
            fontWeight: "bold",
            color: "gray",
          }}
          duration={2500}
          animation="bounceInUp"
        >
          TechstraAI
        </Animatable.Text>
        <Animatable.Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: "gray",
            fontWeight: "600",
          }}
          duration={3500}
          animation="flipInY"
        >
          The Future is here, Powered by AI
        </Animatable.Text>
        {/* <Image source={require('../../assets/ai_face-removebg-preview.png')}  style={{ width: 90, height:110, marginTop:10, justifyContent:'center'}}  /> */}
      </View>
      {/* <TouchableOpacity onPress={handlePress}>
        <Text  style={{ fontSize: 11, backgroundColor:'#36454F', color:'white', textAlign:'center',  alignItems:'center', padding:10,  borderRadius:15, width: Dimensions.get('screen').width*0.6 }} >
                Get Started
        </Text>
       </TouchableOpacity> */}
    </SafeAreaView>
  );
}
