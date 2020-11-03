import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions, Button } from "react-native";
import { Accelerometer, Gyroscope } from 'expo-sensors';

export default function App() {
  const [data_A, setData] = useState({});
  const [data_G, setGyro] = useState({});

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(10);
    Gyroscope.setUpdateInterval(1000);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
    this._subscription = Gyroscope.addListener(gyroscopeData => {
      setData(gyroscopeData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { ax, ay, az } = data_A;
  let { gx, gy, gz } = data_G;


  return (
    <View style={styles.sensor}>
      <Text style={styles.text}> Accelerometer </Text>
      <Text style={styles.text}>
        x: {round(ax)}
      </Text>
      <Text style={styles.text}>
        y: {round(ay)}
      </Text>
      <Text style={styles.text}>
        z: {round(az)}
      </Text>

      <Text style={styles.text}> Gyroscope </Text>
      <Text style={styles.text}>
        x: {round(gx)}
      </Text>
      <Text style={styles.text}>
        y: {round(gy)}
      </Text>
      <Text style={styles.text}>
        z: {round(gz)}
      </Text>
      
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100 * 0.98;
}

const styles = StyleSheet.create({
  sensor: {
    flex: 0.75,
    top: Dimensions.get('window').height / 3,
  },
  text: {
    
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  buttonContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  button: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
  middleButton: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25
  },
});
