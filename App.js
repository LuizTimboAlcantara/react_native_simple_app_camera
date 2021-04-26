/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default function App() {
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [open, setOpen] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  async function takePicture(camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    setCapturedPhoto(data.uri);
    setOpen(true);
    console.log(data.uri);
  }

  function toggleCam() {
    setType(
      type === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <RNCamera
        style={styles.preview}
        type={type}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a câmera',
          message: 'Nós precisamos usar a sua câmera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar',
        }}>
        {({camera, status, recordAndroidPermissionStatus}) => {
          if (status !== 'READY') {
            return <View />;
          }

          return (
            <View
              style={{
                marginBottom: 35,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text>Tirar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} style={styles.capture}>
                <Text>Álbum de Foto</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>

      <View style={styles.camPosition}>
        <TouchableOpacity onPress={toggleCam}>
          <Text>Trocar</Text>
        </TouchableOpacity>
      </View>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 20,
            }}>
            <TouchableOpacity
              style={{margin: 10}}
              onPress={() => setOpen(false)}>
              <Text style={{fontSize: 24}}>Fechar</Text>
            </TouchableOpacity>
            <Image
              resizeMode="contain"
              style={{width: 350, height: 450, borderRadius: 15}}
              source={{uri: capturedPhoto}}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    marginTop: '130%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignSelf: 'center',
    margin: 20,
  },
  camPosition: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    height: 40,
    position: 'absolute',
    right: 25,
    top: 60,
  },
});
