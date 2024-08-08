import React from 'react';
import {View, Text} from 'react-native';
import {useValue} from './ValueContext';

function TreatmentSummary() {
    const {currentValue} = useValue();
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Treatment Summary</Text>
      </View>
    );
  }

export default TreatmentSummary;