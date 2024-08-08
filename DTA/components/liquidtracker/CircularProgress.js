import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ size, strokeWidth, progress, color, total, dailyLimit, isMetric }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  // Calculate how much the user is over the daily limit
  const overLimit = total - dailyLimit;
  // Determine if the user is over the limit
  const isOverLimit = overLimit > 0;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="lightgrey"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </Svg>
      <View style={styles.textContainer}>
        {isOverLimit ? (
          <>
            <Text style={styles.centerText}>Over Limit</Text>
            <Text style={styles.centerText}>{overLimit.toFixed(2)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.centerText}>Left for the Day</Text>
            <Text style={styles.centerText}>{(dailyLimit - total).toFixed(2)} {isMetric ? 'ml' : 'fl oz'}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CircularProgress;
