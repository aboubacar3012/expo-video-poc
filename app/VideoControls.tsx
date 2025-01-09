import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const VideoControls = ({ isPlaying, player }) => {
  return (
    <View style={styles.controlsContainer}>
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={() => {
          if (isPlaying) {
            player.pause();
          } else {
            player.play();
          }
        }}
      />
      <Button
        title='Seek to 10s'
        onPress={() => {
          player.seekBy(10);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    padding: 10,
  },
});

export default VideoControls;
