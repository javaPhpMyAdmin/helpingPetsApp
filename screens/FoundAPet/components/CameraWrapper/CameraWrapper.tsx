/* eslint-disable import/order */
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { CameraView, useCameraPermissions } from 'expo-camera';

const facing = 'back';

interface CameraWapperProps {
  setShowCamera: (value: boolean) => void;
  setImage: (value: string | null | undefined) => void;
}

const CameraWrapper = ({ setShowCamera, setImage }: CameraWapperProps) => {
  const [permission, setPermission] = useCameraPermissions();
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
      setImage(photo?.uri);
      setShowCamera(false);
    }
  };

  const handleZoom = (value: number) => {
    setZoom(value);
  };

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
        <Pressable
          style={styles(width, height).cancelTakePhoto}
          onPress={() => setShowCamera(false)}
        >
          <Ionicons name="arrow-undo-sharp" size={85} color="white" />
        </Pressable>
        <Pressable style={styles(width, height).takePhoto} onPress={takePhoto}>
          <Ionicons name="camera" size={100} color="gray" />
        </Pressable>
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
      top: height! * 0.79,
      left: width! * 0.6,
    },
    cancelTakePhoto: {
      width: width! * 0.25,
      height: width! * 0.25,
      position: 'absolute',
      top: height! * 0.799,
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
