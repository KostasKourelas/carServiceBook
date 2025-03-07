import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Audio } from 'expo-av';
import Header from './header';
import defaultImage from '../assets/default.png';
import image3 from '../assets/image3.jpeg';

export default function AllVehicles({ todos, pressHandler, navigation }) {
  // Function to play the delete sound
  const playDeleteSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../assets/sound/delete.mp3'));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const confirmDelete = (key) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: async () => {
            await playDeleteSound();
            pressHandler(key);
          } 
        },
      ],
      { cancelable: false }
    );
  };

  const renderRightActions = (item) => (
    <TouchableOpacity onPress={() => confirmDelete(item.key)} style={styles.deleteIconContainer}>
      <Icon name="delete" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header image={image3} />
      <View style={styles.content}>
        {
          todos.length > 0 ? (
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <Swipeable renderRightActions={() => renderRightActions(item)}>
                  <TouchableOpacity 
                    style={styles.card} 
                    onPress={() => navigation.navigate('EmptyScreen', { item })}
                  >
                    <Image
                      style={styles.image}
                      source={item.imageUrl ? { uri: item.imageUrl } : defaultImage}
                    />
                    <View style={styles.details}>
                      <View style={styles.textContainer}>
                        <Text style={styles.itemText}>{item.text}</Text>
                        <Text style={styles.itemCategory}>{item.category}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Swipeable>
              )}
              keyExtractor={(item) => item.key.toString()}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Δεν υπάρχει διαθέσιμο όχημα</Text>
              <TouchableOpacity 
                style={styles.blueButton} 
                onPress={() => navigation.navigate('Αρχική')}
              >
                <Text style={styles.buttonText}>Πρόσθεσε νέο</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 150,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCategory: {
    fontSize: 14,
    color: '#999',
  },
  deleteIconContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    top: 20,
    marginRight: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
  },
  blueButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
