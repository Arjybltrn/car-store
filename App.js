import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';

const CarStoreApp = () => {
  const [cars, setCars] = useState([
    { id: '1', make: 'Toyota', model: 'Corolla', year: 2022, price: 25000 },
    { id: '2', make: 'Honda', model: 'Civic', year: 2021, price: 22000 },
    { id: '3', make: 'Ford', model: 'Mustang', year: 2020, price: 40000 },
  ]);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const addCar = () => {
    if (make && model && year && price) {
      const newCar = {
        id: generateId(),
        make: make,
        model: model,
        year: parseInt(year),
        price: parseInt(price),
      };

      setCars((prevCars) => [...prevCars, newCar]);
      setMake('');
      setModel('');
      setYear('');
      setPrice('');
    }
  };

  const generateId = () => {
    const randomNumber = Math.floor(Math.random() * 10000000000); // Generate a random number between 0 and 9999999999
    const id = randomNumber.toString().padStart(10, '0'); // Convert the number to a string and pad it with leading zeros if necessary
    return id;
  };

  const deleteCar = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };

  const renderCarCard = ({ item }) => (
    <View style={styles.carCard}>
      <Text style={styles.carCardText}>{item.make} {item.model} {item.id} </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCar(item.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Store App</Text>

      {/* Add Car Form */}
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Add Car</Text>
        <TextInput
          style={styles.input}
          placeholder="Make"
          value={make}
          onChangeText={(text) => setMake(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Model"
          value={model}
          onChangeText={(text) => setModel(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Year"
          value={year}
          onChangeText={(text) => setYear(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCar}>
          <Text style={styles.buttonText}>Add Car</Text>
        </TouchableOpacity>
      </View>

      {/* Car List */}
      <View style={styles.carListContainer}>
        <Text style={styles.sectionTitle}>Car List</Text>
        <FlatList
          data={cars}
          renderItem={renderCarCard}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  carListContainer: {
    flex: 1,
  },
  carCard: {
    backgroundColor: 'lightgray',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
  },
  carCardText: {
    fontSize: 16,
  },
});

export default CarStoreApp;
