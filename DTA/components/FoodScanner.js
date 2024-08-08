import React from 'react';
import { useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodScanner = () => {
  const [username, setUsername] = useState('');
  

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUsername = await fetchData('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Failed to load username:', error);
      }
    };

    loadUsername();
  }, []);

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Food Scanner</Text>
            <Text style={styles.headerText}>Hello, {username}!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'blue',
        padding: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
    },
});

export default FoodScanner; 