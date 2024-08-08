import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const LiquidCard = ({ id, label: initialLabel, amount: initialAmount, starred: initialStarred, onUpdate, onDelete, onToggleStar, isMetric }) => {
  const [label, setLabel] = useState(initialLabel);
  const [amount, setAmount] = useState(initialAmount);
  const [starred, setStarred] = useState(initialStarred);

  useEffect(() => {
    setLabel(initialLabel);
    setAmount(initialAmount);
    setStarred(initialStarred);
  }, [initialLabel, initialAmount, initialStarred]);

  const handleUpdate = () => {
    onUpdate(id, label, amount);
  };
  
  const handleDelete = () => {
    onDelete(id);
  };
  
  const handleToggleStar = () => {
    onToggleStar(id);
    setStarred(!starred);
  };

  return (
    <View style={styles.card}>
      <Text>
        {label} - {amount} {isMetric ? 'ml' : 'fl oz'}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.starButton} onPress={handleToggleStar}>
          <FontAwesome name={starred ? 'star' : 'star-o'} size={30} color='blue' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.trashButton} onPress={handleDelete}>
          <FontAwesome name='trash' size={30} color='red' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <FontAwesome name='pencil' size={30} color='green' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 20,
    backgroundColor: 'lightblue',
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    width: '100%',
  },
  starButton: {
    padding: 5,
    marginHorizontal: 30,
  },
  trashButton: {
    padding: 5,
    marginHorizontal: 30,
  },
  updateButton: {
    padding: 5,
    marginHorizontal: 30,
  },
});

export default LiquidCard;
