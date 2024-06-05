import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bar1 from '../../components/Data'; // Ensure this component is also converted to TypeScript

// Define a type for the counter state
type CounterState = {
  [key: string]: number; // Maps a date string to a count
};

// Define a type for the styles
interface Styles {
  container: object;
  counterText: object;
  button: object;
  buttonText: object;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  counterText: {
    fontSize: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

const CounterPage: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [weeklyData, setWeeklyData] = useState<CounterState>({});

  // Function to increment the counter
  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await storeData(newCount);
  };

  // Function to store count data
  const storeData = async (value: number) => {
    try {
      const dateKey = new Date().toISOString().slice(0, 10); // Get current date as YYYY-MM-DD
      const existingData = await AsyncStorage.getItem('@counter');
      const updatedData: CounterState = existingData ? JSON.parse(existingData) : {};
      updatedData[dateKey] = (updatedData[dateKey] || 0) + value;
      await AsyncStorage.setItem('@counter', JSON.stringify(updatedData));
      setWeeklyData(updatedData); // Update weekly data for the graph
    } catch (e) {
      Alert.alert('Error', 'Failed to save data.');
    }
  };

  // Function to load count data
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem('@counter');
      if(value !== null) {
        const data: CounterState = JSON.parse(value);
        setWeeklyData(data);
        // Set the latest count based on today's date
        const todayKey = new Date().toISOString().slice(0, 10);
        setCount(data[todayKey] || 0);
      }
    } catch(e) {
      Alert.alert('Error', 'Failed to load data.');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {count}</Text>
      <TouchableOpacity style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>Increment</Text>
      </TouchableOpacity>
      {/* Pass the processed weekly data to the Bar1 component */}
      <Bar1  />
    </View>
  );
};

export default CounterPage;
