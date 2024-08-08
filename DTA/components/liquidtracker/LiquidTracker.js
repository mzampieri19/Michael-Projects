import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import Calendar from '/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/components/liquidtracker/Calendar.js';
import { FontAwesome } from '@expo/vector-icons';
import LiquidCard from '/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/components/liquidtracker/LiquidCard.js';
import CircularProgress from '/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/components/liquidtracker/CircularProgress.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LiquidTracker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [isMetric, setIsMetric] = useState(true);

  const [dictionary, setDictionary] = useState({});
  const [dailyLimit, setDailyLimit] = useState(1000);

  const [dailyTotal, setDailyTotal] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('dictionary');
        return jsonValue != null ? JSON.parse(jsonValue) : {};
      } catch (e) {
        console.error('Failed to load dictionary:', e);
        return {};
      }
    };

    const initializeDictionary = async () => {
      const savedDictionary = await fetchData();
      setDictionary(savedDictionary);
    };

    initializeDictionary();
  }, []);

  useEffect(() => {
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('dictionary', jsonValue);
      } catch (e) {
        console.error('Failed to save dictionary:', e);
      }
    };

    storeData(dictionary);
  }, [dictionary]);

  useEffect(() => {
    getSummary();
  }, [dictionary, selectedDate]);

  const splitDate = (date) => {
    if (!date) return ''; 
    date = date.split('T')[0];
    return date.slice(1);
  };

  const getDailyTotal = (dict = dictionary) => {
    if (!selectedDate || !dict[selectedDate]) {
      return 0;
    }
  
    const total = dict[selectedDate].reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    return total;
  };
  
  const getProgress = (dict = dictionary) => {
    if (!selectedDate || !dict[selectedDate]) {
      return 0;
    }
  
    const total = dict[selectedDate].reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const progressPercentage = (total / dailyLimit) * 100;
    return progressPercentage;
  };

  const getSummary = () => {
    getDailyTotal();
    getProgress();
  };

  const toggleUnits = () => {
    console.log('Toggle Units button pressed');
    setIsMetric(!isMetric);

    const newDailyLimit = !isMetric ? 1000 : 32;
    const updatedDictionary = {};

    Object.keys(dictionary).forEach(date => {
      updatedDictionary[date] = dictionary[date].map(liquid => {
        let convertedAmount = isMetric ? liquid.amount * 0.033 : liquid.amount / 0.033;
        convertedAmount = parseFloat(convertedAmount.toFixed(1)); // Round to 2 decimal places
        return { ...liquid, amount: convertedAmount };
      });
    });

    setDailyTotal(getDailyTotal(updatedDictionary)); // Update daily total based on new units
    setProgress(getProgress(updatedDictionary)); // Update progress based on new units
  
    setDailyLimit(newDailyLimit); // Update the daily limit state
    setDictionary(updatedDictionary); // Update the dictionary with converted amounts
  };

  const clearDayLiquids = () => {
    console.log('Clear Day button pressed');
    Alert.alert(
      'Clear Liquids',
      'Are you sure you want to clear all liquids for the selected date?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setDictionary((prevDictionary) => {
              delete prevDictionary[selectedDate];
              setDailyTotal(0);
              setProgress(0);
              return { ...prevDictionary };
            });
          },
        },
      ]
    );
    console.log('Liquids cleared');
  };

  const updateDictionary = (date, liquid) => {
    setDictionary((prevDictionary) => {
      const updatedDictionary = { ...prevDictionary };

      if (updatedDictionary[date]) {
        updatedDictionary[date] = [...updatedDictionary[date], liquid];
      } else {
        updatedDictionary[date] = [liquid];
      }

      return updatedDictionary;
    });
  };

  useEffect(() => {
    if (selectedDate) {
      console.log('Updated days liquids:', dictionary[selectedDate]);
    }
  }, [dictionary, selectedDate]);

  const createCard = async () => {
    if (!selectedDate || !label || !amount) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const newId = Object.keys(dictionary[selectedDate] || {}).length;
    const newLiquid = { id: newId, label, amount };

    console.log('Days liquids before update:', dictionary[selectedDate]);
    console.log('New liquid:', newLiquid);

    updateDictionary(selectedDate, newLiquid);

    // Update daily total and progress
    getSummary();

    // Clear input fields after adding the new liquid card
    setLabel('');
    setAmount('');
    setModal(false);
  };

  const scanWithCamera = () => {
    Alert.alert('Feature not implemented yet');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
      marginHorizontal: 20,
    },
    progressContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
      alignItems: 'center',
    },
    buttonWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    topContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 20,
      alignItems: 'center',
    },
    topWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    smallText: {
      fontSize: 12,
      textAlign: 'center',
      padding: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      marginTop: 20,
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    insertTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    total: {
      fontSize: 48,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      marginTop: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      color: 'black',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      width: '80%',
    },
    addButton: {
      padding: 10,
      borderRadius: 5,
    },
    resetButton: {
      padding: 10,
      borderRadius: 5,
    },
    convertButton: {
      padding: 10,
      borderRadius: 5,
    },
    refreshButton: {
      padding: 10,
      borderRadius: 5,
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      margin: 20,
      padding: 35,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
      margin: 10,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textInput: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      padding: 10,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        snapToAlignment='start'
        showsVerticalScrollIndicator={false}
        >
        <Text style={styles.title}>Liquid Tracker</Text>

        <View style={styles.topContainer}>
          <View style={styles.topWrapper}>
            <TouchableOpacity onPress={() => setModal2(true)} style={styles.calButton}>
              <FontAwesome name="calendar" size={36} color="black" />
            </TouchableOpacity>
            <Text style={styles.smallText}>Calendar</Text>
          </View>

          <View style={styles.topWrapper}>
            <TouchableOpacity onPress={() => setModal3(true)} style={styles.refreshButton}>
              <FontAwesome name="user-circle" size={36} color="black" />
            </TouchableOpacity>
            <Text style={styles.smallText}>Settings</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Daily limit {isMetric ? '1000 ml' : '32 fl oz'}</Text>

        <View style={styles.progressContainer}>
          <CircularProgress size={200} strokeWidth={30} progress={progress.toFixed(2)} color="lightblue" total={dailyTotal} dailyLimit={dailyLimit} isMetric={isMetric}/>
        </View>

        <Text style={styles.subtitle}>What you drank today:</Text>
        
        <Text style={styles.selectedDateText}>Selected Date: {splitDate(JSON.stringify(selectedDate))}</Text>

        <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => {console.log('Add button pressed'); setModal(true)}} style={styles.addButton}>
              <FontAwesome name="plus" size={36} color="black" />
            </TouchableOpacity>
            <Text style={styles.smallText}>Add</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => {console.log('Reset Day button pressed'); clearDayLiquids()}} style={styles.addButton}>
              <FontAwesome name="trash" size={36} color="black" />
            </TouchableOpacity>
            <Text style={styles.smallText}>Reset Day</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => {console.log('Exchange button pressed'); toggleUnits()}} style={styles.convertButton}>
              <FontAwesome name="exchange" size={36} color="black" />
            </TouchableOpacity>
            <Text style={styles.smallText}>Exchange</Text>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.insertTitle}>Add Liquid Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Liquid Label"
              value={label}
              onChangeText={setLabel}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount (ml)"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={scanWithCamera}>
              <Text style={styles.buttonText}>Scan with camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={createCard}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setModal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal 
          animationType="slide"
          transparent={true}
          visible={modal2}
          onRequestClose={() => setModal2(false)}
        >
          <View style={styles.modalView}>
            <Text style={styles.insertTitle}>Select Date</Text>
            <Calendar onSelectDate={setSelectedDate} />
            <TouchableOpacity style={styles.button} onPress={() => setModal2(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Text>Liquids for the day:</Text>

        <View style={styles.cardContainer}>
          {selectedDate && dictionary[selectedDate]?.map((liquid) => (
            <LiquidCard
              key={liquid.id}
              id={liquid.id}
              label={liquid.label}
              amount={liquid.amount}
              starred={liquid.isStarred}
              isMetric={isMetric}
              onUpdate={(id, label, amount) => {
                setDictionary((prevDictionary) => ({
                  ...prevDictionary,
                  [selectedDate]: prevDictionary[selectedDate].map((item) => (item.id === id ? { ...item, label, amount } : item)),
                }));
              }}
              onDelete={(id) => {
                setDictionary((prevDictionary) => ({
                  ...prevDictionary,
                  [selectedDate]: prevDictionary[selectedDate].filter((item) => item.id !== id),
                }));
              }}
              onToggleStar={(id) => {
                setDictionary((prevDictionary) => ({
                  ...prevDictionary,
                  [selectedDate]: prevDictionary[selectedDate].map((item) => (item.id === id ? { ...item, isStarred: !item.isStarred } : item)),
                }));
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default LiquidTracker;
