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
import { useEffect, useState, useRef  } from 'react';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { WebView } from 'react-native-webview';
import Video from 'react-native-video';
import shaka from 'shaka-player';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  const [url, setUrl] = useState('');
  const webViewRef = React.useRef<WebView>(null);

  useEffect(() => {
    const subscription = ({ window }) => {
      const width = window.width;
      const height = window.height;
      setDimensions({ width, height });
    };
    const windowHendler = Dimensions.addEventListener('change', subscription);
    return () => windowHendler.remove();
  }, []);

  const onWebViewMessage = (event: WebViewMessageEvent) => {
     if (event.nativeEvent.data === 'loadPlayer') {
       const player = new shaka.Player(webViewRef.current);
       player.load('https://example.com/hls/stream.m3u8');
     }
  };

  const onLoad = () => {
    webViewRef.current.postMessage('loadPlayer');
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={backgroundStyle}>
      <StatusBar
      hidden={ dimensions.height < dimensions.width? true: false}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={{ height: dimensions.height, width: dimensions.width }}>
        <WebView
          allowsInlineMediaPlayback={true}
          ref={webViewRef}
          source={{
            uri: 'http://tv.smartup.tv',
            headers: {
              'User-Agent': 'sandroid'
            }
          }}
            onMessage={onWebViewMessage}
                  onLoad={onLoad}
          style={{ width: dimensions.width}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default App;
