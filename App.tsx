import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Animated,
  TouchableOpacity,
  Text,
  PanResponder,
  StyleSheet,
} from 'react-native';
import {MotiView} from 'moti';

const _size = 100;
const _color = '#6E01EF';

const PanTest = () => {
  const pan = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      // onPanResponderGrant: () => {
      //   pan.setOffset({
      //     x: pan.x?._value,
      //     y: pan.y?._value,
      //   });
      // },
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          width: 100,
          height: 100,
          backgroundColor: 'purple',
          borderRadius: 100 / 2,
          transform: [
            {
              translateX: pan.x,
            },
            {
              translateY: pan.y,
            },
          ],
        },
        // pan.getLayout(),
      ]}></Animated.View>
  );
};

const AnimatedBalls = () => {
  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const rightValue = useState(new Animated.Value(0))[0];
  const opacity = useState(new Animated.Value(1))[0];
  const moveBall = () => {
    Animated.timing(value, {
      toValue: {x: 100, y: 100},
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {});
  };
  const moveRight = () => {
    Animated.timing(rightValue, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeInBall = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutBall = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Animated.View style={value.getLayout()}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: 'red',
          }}></View>
        <TouchableOpacity onPress={moveBall}>
          <Text>Move Ball</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          transform: [{translateX: rightValue}],
          borderRadius: 100,
          backgroundColor: 'blue',
        }}></Animated.View>
      <TouchableOpacity onPress={moveRight}>
        <Text>Move Right</Text>
      </TouchableOpacity>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          opacity: opacity,
          borderRadius: 100,
          backgroundColor: 'pink',
        }}></Animated.View>
      <TouchableOpacity onPress={fadeInBall}>
        <Text>Fade in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={fadeOutBall}>
        <Text>Fade out</Text>
      </TouchableOpacity>
    </>
  );
};

const Waves = () => {
  return (
    <>
      {[...Array(3).keys()].map(idx => {
        return (
          <MotiView
            from={{opacity: 1, scale: 1}}
            animate={{opacity: 0, scale: 4}}
            key={idx}
            style={[StyleSheet.absoluteFillObject, styles.dot]}
          />
        );
      })}
      <View style={styles.icon}></View>
    </>
  );
};

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <AnimatedBalls /> */}
      {/* <PanTest /> */}
      <Waves />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  icon: {
    color: '#fff',
    backgroundColor: _color,
    borderRadius: 100 / 2,
    width: _size,
    height: _size,
  },
  dot: {
    backgroundColor: _color,
    borderRadius: _size,
    width: _size,
    height: _size,
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
