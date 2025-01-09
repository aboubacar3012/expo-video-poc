import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const ChapterButtons = ({ chapters, handleChapterJump }) => {
  return (
    <View style={styles.buttonsContainer}>
      {chapters.map((chapter, index) => (
        <Button
          key={index}
          title={chapter.title}
          onPress={() => handleChapterJump(chapter.startTime)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 10,
  },
});

export default ChapterButtons;
