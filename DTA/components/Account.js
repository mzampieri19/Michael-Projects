import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {useValue} from './ValueContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchData, storeData, clearData } from '/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/components/background/async-storage.js';
import axios from 'axios';


function Account() {
    const {currentValue} = useValue();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // if user is logged in 
    const [canLogin, setCanLogin] = useState(false); // if user entered username and password
    const navigation = useNavigation();

    useEffect(() => {
        const checkLoginStatus = async () => {
          const storedUsername = await fetchData('username'); // fetch username
          const storedPassword = await fetchData('password'); // fetch password
          if (storedUsername && storedPassword) {
            setUsername(storedUsername); // set username
            setPassword(storedPassword); // set password
            setLoggedIn(true); // set logged in to true
          }
        };
        checkLoginStatus();
      }, [navigation]);
    
    //   useEffect(() => {
    //     logDataServer();
    //   }, [canLogin]);
    
      useEffect(() => {
        // enable login button if both username and password are entered
        // right now only checks if they are not empty
        // Will change to check if they are correct
        setCanLogin(username.trim() !== '' && password.trim() !== '');
      }, [username, password]);
    
      const handleLogin = async () => {
        await storeData('username', username);
        await storeData('password', password);
        setLoggedIn(true);
        console.log('Logged in ' + username);
        //logDataServer();
       
        
      };
    
    //   const logDataServer = async () => {
    //     // Connects and logs username and date accessed to server 
    //     console.log('Logging data to server');
    //     let score =
    //       await axios(
    //         {
    //           method: 'post',
    //           url: server + '/room',
    //           data: { id: group, uid: username, data: new Date().toISOString() },
    //         });
    //     console.dir(score.data)
    //   };
    
      const handleLogout = async () => {
        await clearData('username'); // clear username
        await clearData('password'); // clear password
        setUsername('');
        setPassword('');
        setLoggedIn(false);
      };

      return (
        <View style = {styles.container}>
            <ScrollView>
                {!loggedIn ? (
                    <ScrollView contentContainerStyle = {styles.contentContainer}>
                    <Text style={styles.title}>Welcome to the all in one dialsysis tracking app</Text>
                    <Text style={styles.subtitle}>Please log in here: </Text>
            
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        borderColor = 'black'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    {canLogin ? ( // if user entered username and password
                        <Button
                        title="Login"
                        onPress={handleLogin}
                        disabled={!canLogin} // Disable button if canLogin is false
                        />
                    ) : ( // if user did not enter username and password
                        <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>Please enter username and password</Text>
                        </View>
                    )}
                    </ScrollView>
                ) : (
                    <View style={styles.loggedInContainer}>
                    <Text style={styles.loggedInText}>Welcome, {username}!</Text>
                    <Button title="Logout" onPress={handleLogout} />
                    <Text style= {styles.loggedInSubtext}> You are logged in! </Text>
                    <Text style= {styles.loggedInSubtext}> View your account and personal information here </Text>
                    </View>
                    )}
        </ScrollView>
        </View>
      ); 
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    contentContainer: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',

    },
    subtitle: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      marginBottom: 10,
      borderRadius: 100,
    },
    messageContainer: {
      padding: 10,
      marginBottom: 10,
    },
    messageText: {
      color: 'red',
    },
    loggedInContainer: {
      padding: 20,
    },
    loggedInText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    loggedInSubtext: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
    },


  });

export default Account;