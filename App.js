import React, { useEffect,useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';




export default function App() {

const [secondsLeft, setSecondsLeft] = useState(3600);
const [timerOn, setTimerOn] = useState(false);

useEffect(() => {
  if (timerOn) startTimer();
  else BackgroundTimer.stopBackgroundTimer();
  
  return () => {
    BackgroundTimer.stopBackgroundTimer();
  }
}, [timerOn]);

useEffect(() => {
  if (secondsLeft === 0) {
    BackgroundTimer.stopBackgroundTimer()
  };
}, [secondsLeft]);

const startTimer = () => {
  BackgroundTimer.runBackgroundTimer(() => {
    setSecondsLeft((secs) => {
      if (secs > 0) return secs - 1;
      else return 0;
    });
  }, 1000);
}


const clockify = () => {
  let hours = Math.floor(secondsLeft / 60 / 60);
  let mins = Math.floor((secondsLeft / 60 )% 60);
  let seconds = Math.floor((secondsLeft % 60));

  let displayHours = hours.toString().padStart(2, '0');
  let displayMins = mins.toString().padStart(2, '0');
  let displaySeconds = seconds.toString().padStart(2, '0');

  return `${displayHours}:${displayMins}:${displaySeconds}`;
}
  
  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{clockify()}</Text>
      <Button style={styles.button} title="Start/Stop" onPress={()=>setTimerOn((timerOn => !timerOn)) } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 50,
  },
  button: {
    borderRadius: 10,
    height: 20,
    width: 20,
  },
});
