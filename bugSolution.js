// bugSolution.js
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        let photo = await cameraRef.takePictureAsync();
        if (photo.uri) { //check if photo uri is valid
          setPhoto(photo);
        } else {
          alert('Failed to capture image. Please try again.');
        }
      } catch (error) {
        console.error('Camera error:', error);
        alert('An error occurred while taking a picture.');
      }
    }
  };

  let cameraRef = React.createRef();

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      </Camera>
      {photo && <Image source={{ uri: photo.uri }} style={{ flex: 1 }} />}
    </View>
  );
};

export default App; 