/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
import  { useEffect,useState } from 'react';
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
//     const { width, height } = Dimensions.get('window');
//     console.log('w:'+ width, 'h:' +height)

useEffect(() => {
   const subscription = ({ window }) => {
      const width = window.width;
      const height = window.height;
      console.log('w:'+ width, 'h:' +height)
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
      <View style={{ height: dimensions.height, width: dimensions.width, backgroundColor: '#fff', }}>
         <WebView
           source={{
             uri: 'http://tv.smartup.tv',
             headers: {
               'User-Agent': 'sandroid'
              }
           }}
           style={{ height: dimensions.height, width: dimensions.width }}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    height:390,
//      flex: 1,
   backgroundColor: '#fff',
  },
   webView: {
//        height:400,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
