import { StatusBar } from 'expo-status-bar';
import React ,{useState}from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import Header from "./components/Header"
import TodoItem from "./components/TodoItem"
import AddTodo from "./components/AddTodo"
import Sandbox from './components/Sandbox';

export default function App() {
  const [todo,setTodo] = useState([
    {text:'Jouer au football',key:'1'},
    {text:'Boire un cocktail',key:'2'},
    {text:'Manger des donuts',key:'3'}
  ])
  
  const pressKey = (key) => {
      setTodo((prevTodo) => {
        return prevTodo.filter(Todo => {
          return Todo.key !== key
        })
      })
  }

  const submitHandler = (text) => {
    if (text.length>3) {
      setTodo((prevTodo) => {
        return [
          {text:text,key:Math.random().toString()},
          ...prevTodo
        ]
      })
    }else{
      Alert.alert('OOPS!','Les taches devraient dépasser les 3 lettres',[
        {text:'Compris !',onPress:() => console.log('alert ferme')}
      ])
    }
    
  }

  return (
     
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
           <View style={styles.container}>
          <Header/>
          <View style={styles.content}>
            <AddTodo submitHandler={submitHandler}/>
              <View style={styles.list}>
                  <FlatList
                  data={todo}
                  renderItem={({item}) => {
                    return( <TodoItem item={item} pressKey={pressKey}/>)
                  }}
                
                  />
              </View>
          </View>
        </View>
    </TouchableWithoutFeedback>
  
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
 content:{
   padding:40,
   flex:1

 },
 list:{
   marginTop:20,
   flex:1
 }
 
});
