import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CategoryPicker({ selectedCategory, onCategoryChange }) {
  const [selectedCategoryState, setSelectedCategoryState] = useState(selectedCategory || 'Audi');

  const onCategoryChangeHandler = (value) => {
    setSelectedCategoryState(value);
    onCategoryChange(value);
  };

  const categories = [
    { label: 'Audi', value: 'Audi', icon: 'car' },
    { label: 'Opel', value: 'Opel', icon: require('../assets/carBrand/opel.png') },
    { label: 'BMW', value: 'BMW', icon: 'car' },
    { label: 'Mercedes', value: 'Mercedes', icon: 'car' },
    { label: 'Work', value: 'Work', icon: 'briefcase' },
    { label: 'Shopping', value: 'Shopping', icon: 'shopping-cart' },
  ];

  const pickerItems = categories.map((category) => ({
    label: category.label,
    value: category.value,
    key: category.value,
    icon: () => <Icon name={category.icon} size={20} color="#900" style={styles.icon} />,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Μάρκα Αυτοκινήτου</Text>
      <View style={styles.innerContainer}>
        <RNPickerSelect
          onValueChange={(value) => onCategoryChangeHandler(value)}
          items={pickerItems}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
            iconContainer: styles.iconContainer,
          }}
          value={selectedCategoryState}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            const selectedIcon = categories.find(cat => cat.value === selectedCategoryState)?.icon;
            return selectedIcon ? <Icon name={selectedIcon} size={20} color="#900" /> : null;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginTop: -15, // Μετακινήστε τον τίτλο πάνω από το border
  },
  innerContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    position: 'absolute',
    backgroundColor: 'white', // Οποιοδήποτε χρώμα που επιθυμείτε
    top: -10, // Μετακίνηση του τίτλου πάνω από το border
    left: 10, // Αριστερή ευθυγράμμιση
    zIndex: 1, // Βεβαιωθείτε ότι ο τίτλος είναι εμφανής πάνω από το border
    paddingHorizontal: 5,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
  icon: {
    marginRight: 10,
  },
});
