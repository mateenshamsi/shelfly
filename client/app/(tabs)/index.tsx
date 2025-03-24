import { Link } from 'expo-router';
import { Image, View,Text,StyleSheet, Platform } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Hello</Text>  
        <Link style={styles.link} href="/signup">Signup</Link>
        <Link style={styles.link} href="/login">Login</Link>

    </View>
  );
}
const styles = StyleSheet.create({
  container:{ 
    flex:1 ,
    justifyContent:"center", 
    alignItems:"center",
    color:"red" 
  },
  title:{ 
    color:"green",
    fontSize:24 , 
  },
  link:{
    border:"1px solid red",
    color:"white",
    padding:"12px",
     
  }
})
