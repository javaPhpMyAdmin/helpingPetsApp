/* eslint-disable import/order */
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Camera, CameraView } from 'expo-camera';

const facing = 'back';

interface CameraWapperProps {
  setShowCamera: (value: boolean) => void;
  setImage: (value: string[] | null | undefined) => void;
}

const CameraWrapper = ({ setShowCamera, setImage }: CameraWapperProps) => {
  const [permission, setPermission] = useState(false);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef<CameraView>(null);
  const { width, height } = useWindowDimensions();

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        base64: false,
        quality: 1,
        exif: false,
      });
      setImage([photo?.uri!]);
      setShowCamera(false);
    }
  };

  const handleZoom = (value: number) => {
    setZoom(value);
  };

  const permisionFunction = async () => {
    // here is how you can get the camera permission
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setPermission(cameraPermission.granted);
  };

  useEffect(() => {
    permisionFunction();
    // permisionFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles().cameraContainer}>
      <CameraView
        ref={cameraRef}
        facing={facing}
        style={styles().cameraView}
        zoom={zoom}
      >
        <View style={styles(width, height).row}>
          <Text>
            <Feather name="zoom-in" size={40} color="white" />
          </Text>
          <Text style={styles().textZoomValue}>{zoom.toFixed(1)}</Text>
          <Slider
            style={styles(width).slider}
            value={zoom}
            onValueChange={handleZoom}
            minimumValue={0}
            maximumValue={1}
            maximumTrackTintColor="white"
            minimumTrackTintColor="white"
          />
        </View>
        <TouchableOpacity
          style={styles(width, height).cancelTakePhoto}
          onPress={() => setShowCamera(false)}
        >
          <Ionicons name="arrow-undo-sharp" size={85} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(width, height).takePhoto}
          onPress={takePhoto}
        >
          <Ionicons name="camera" size={100} color="gray" />
        </TouchableOpacity>
      </CameraView>
    </View>
  );
};

export default CameraWrapper;

const styles = (width?: number, height?: number) =>
  StyleSheet.create({
    cameraView: {
      position: 'relative',
      flex: 1,
    },
    takePhoto: {
      width: width! * 0.25,
      height: width! * 0.25,
      position: 'absolute',
      top: height! * 0.77,
      left: width! * 0.6,
    },
    cancelTakePhoto: {
      width: width! * 0.25,
      height: width! * 0.25,
      position: 'absolute',
      top: height! * 0.78,
      left: width! * 0.09,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: height! * 0.18,
      left: width! * 0.046,
    },
    textZoom: {
      fontSize: 20,
      color: 'white',
    },
    slider: {
      width: width! * 0.7,
      height: 40,
      marginHorizontal: 10,
    },
    cameraContainer: {
      width: '100%',
      height: '100%',
      zIndex: 10,
      position: 'relative',
    },
    textZoomValue: { color: 'white', left: 10, fontSize: 20 },
  });
