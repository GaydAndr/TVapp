/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { WebView } from 'react-native-webview';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  const [url, setUrl] = useState('');

  useEffect(() => {
    const subscription = ({ window }) => {
      const width = window.width;
      const height = window.height;
      setDimensions({ width, height });
    };
    const windowHendler = Dimensions.addEventListener('change', subscription);
    return () => windowHendler.remove();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={{ height: dimensions.height- 20, width: dimensions.width }}>
        <WebView
          source={{
            uri: 'http://tv.smartup.tv',
            headers: {
              'User-Agent': 'sandroid'
            }
          }}

          style={{ width: dimensions.width}}
        />
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default App;
