import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import VideoControls from './VideoControls';
import ChapterButtons from './ChapterButtons';

const hlsVideoSource = 'https://expo-video-poc-output.s3.eu-west-3.amazonaws.com/WhatsApp+Video+2024-10-30+at+22.14.31.m3u8';
// const hlsVideoSource = 'https://expo-video-poc-output.s3.eu-west-3.amazonaws.com/WhatsApp+Video+2024-10-30+at+22.14.311080+(+haute+qualit%C3%A9)_00001.ts';

const chapters = [
  { title: "Chapitre 1 (0:00 à 1 min)", startTime: 0 },
  { title: "Chapitre 2 (1:00 à 2:00)", startTime: 60 },
  { title: "Chapitre 3 (2:00 à 3:00)", startTime: 120 },
  { title: "Chapitre 4 (3:00 à 4:00)", startTime: 180 },
  { title: "Chapitre 5 (4:00 à 5:00)", startTime: 240 },
  { title: "Chapitre 6 (5:00 à 6:00)", startTime: 300 },
  { title: "Chapitre 7 (6:00 à 7:00)", startTime: 360 },
  { title: "Chapitre 8 (7:00 à 8:00)", startTime: 420 },
  { title: "Chapitre 9 (8:00 à 9:00)", startTime: 480 },
  { title: "Chapitre 10 (9:00 à 10:00)", startTime: 540 },
];

export default function VideoScreen() {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const netInfo = useNetInfo();
  const [videoSource, setVideoSource] = useState(hlsVideoSource);

  // useEffect(() => {
  //   if (netInfo.isConnected && netInfo.details) {
  //     const { downlink } = netInfo.details;
  //     if (downlink < 1.5) {
  //       setVideoSource('https://expo-video-poc-output.s3.eu-west-3.amazonaws.com/WhatsApp+Video+2024-10-30+at+22.14.31.m3u8');
  //       // setVideoSource('https://path-to-your-hls-video/low/playlist.m3u8');
  //     } else if (downlink < 3) {
  //       setVideoSource('https://expo-video-poc-output.s3.eu-west-3.amazonaws.com/WhatsApp+Video+2024-10-30+at+22.14.31.m3u8');
  //     } else {
  //       setVideoSource('https://expo-video-poc-output.s3.eu-west-3.amazonaws.com/WhatsApp+Video+2024-10-30+at+22.14.31.m3u8');
  //     }
  //   }
  // }, [netInfo]);

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.staysActiveInBackground = true;
    player.play();
  });

  useEffect(() => {
    player.staysActiveInBackground = true;
  }, [player]);

  useEffect(() => {
    player.staysActiveInBackground = true;

    const interval = setInterval(() => {
      setCurrentTime(player.currentTime);
      setDuration(player.duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handleChapterJump = async (timeInSeconds: number) => {
    player.seekBy(timeInSeconds - player.currentTime);
    player.play();
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          startsPictureInPictureAutomatically
          onPictureInPictureStart={() => console.log('onPictureInPictureStart')}
          onPictureInPictureStop={() => console.log('onPictureInPictureStop')}
          contentFit='cover'
          showsTimecodes={true}
        />
      </View>
      <VideoControls isPlaying={isPlaying} player={player} />
      <ChapterButtons chapters={chapters} handleChapterJump={handleChapterJump} />
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  videoContainer: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: 280,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});