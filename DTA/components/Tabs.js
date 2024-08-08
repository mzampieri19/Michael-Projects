import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import LiquidTracker from '/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/components/liquidtracker/LiquidTracker.js';
import FoodScanner from './FoodScanner';
import TreatmentSummary from './TreatmentSummary';
import CenterFinder from './CenterFinder';
import Account from './Account';
import ValueProvider from './ValueContext';
import { Image } from 'react-native';



const Tab = createBottomTabNavigator();

export default function App() {
  const data = {username: 'none', status: 'admin'}

  const tabOptions = ({ route }) => ({
    tabBarButton: (props) => (
      <TouchableOpacity {...props}>
        <View>
          <Text style={styles.tabName}>{route.name}</Text>
        </View>
      </TouchableOpacity>
      
    ),
  });

  return (
    <ValueProvider value ={data}>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'limegreen',
            inactiveTintColor: 'blue',
          }}>
          <Tab.Screen 
            name="Home" 
            component={LiquidTracker}
            options={{
                tabBarIcon: () => (
                    <Image source={require('/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/assets/measure.png')} style={{width: 20, height: 20}} />

                )
            }}

         />
          <Tab.Screen 
            name="Scanner" 
            component={FoodScanner} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/assets/cutlery.png')} style={{width: 20, height: 20}} />

                )
            }}
          />
          <Tab.Screen 
            name="Treatment" 
            component={TreatmentSummary} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/assets/dialysis-machine.png')} style={{width: 20, height: 20}} />

                )
            }}
          />
          <Tab.Screen 
            name="Centers" 
            component={CenterFinder} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/assets/maps-and-flags.png')} style={{width: 20, height: 20}} />

                )
            }}
          />
          <Tab.Screen 
            name="Account" 
            component={Account} 
            options={{
                tabBarIcon: () => (
                    <Image source={require('/Users/michelangelozampieri/Desktop/Repositories/Personal_Projects/DTA/assets/account.png')} style={{width: 20, height: 20}} />

                )
            }}
          />
         

        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );

}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    headerText: { 
      fontSize: 24,
      fontWeight: 'bold',
      color: 'green',
      alignContent: 'center',
      justifyContent: 'center',
    },

    tabName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'green',
      alignContent: 'center',
      justifyContent: 'center',
    },
    
  });