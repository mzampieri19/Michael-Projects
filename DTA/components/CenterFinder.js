import React from 'react';
import {View, Text} from 'react-native';
import {useValue} from './ValueContext';

function CenterFinder() {
    const {currentValue} = useValue();
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Center Finder</Text>
      </View>
    );
  }

export default CenterFinder;