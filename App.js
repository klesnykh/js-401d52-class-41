import { Camera, CameraType } from 'expo-camera';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState('off');

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleTorch() {
    if (flashMode === 'torch') {
      setFlashMode('off')
    } else {
      setFlashMode('torch')
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={flashMode}>
      </Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleTorch}>
          <Text style={styles.text}>Toggle Flashlight</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

