
import { StyleSheet, Text, View, FlatList, Alert,TouchableWithoutFeedback, Keyboard} from 'react-native';
import React,{useState} from 'react'; 
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';

export default function App() {

const [todos,setTodos]= useState([
  {text:'buy coffe', key:'1'},
  {text:'create my app', key:'2'},
  {text:'play on the switch', key:'3'}
]);

const pressHandler = (key) => {
  setTodos((prevTodos)=> {
    return prevTodos.filter(todo => todo.key !=key );


  });
}

const submitHandler = (text) => {

  if (text.length > 3 ){
    setTodos((prevTodos) => {
      return [
        {text:text, key:Math.random().toString()},
        ...prevTodos
      ]
  
    });
  }else {
      Alert.alert('oops!','Ξαναπροσπαθησε  , εχεις εισαγει λαθος χαρακτηρες',[
        {text:'understood', onPess:() => console.log('alert closed')}
      ]);
  }
 
}

  return (

    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();
      console.log('dismissed keyboard')
    }}>
    <View style={styles.container}>
         <Header/>
         <View style={styles.content}> 
            <AddTodo submitHandler={submitHandler}/>
            <View style={styles.lists}>
                 <FlatList
                    data={todos}
                    renderItem={({item}) => (
                     <TodoItem item={item} pressHandler={pressHandler} />

                    )}
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

  },
  lists:{
    marginTop:40,
  },
 
});
