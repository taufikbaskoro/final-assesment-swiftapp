/* eslint-disable max-len */
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import {Colors, Mixins} from '@app/styles';
import styles from '@app/components/WebViewContent/styles';
import NavBar from '@app/components/NavBar';
import RenderIf from '@app/components/RenderIf';

const WebViewContent = ({
  htmlBlock,
  title = null,
  contentBackgroundColor = Colors.PRIMARY,
  contentTextColor = Colors.BLACK,
  contentFontSize = 30,
  styleProp = {},
}) => {
  console.log(htmlBlock);
  let finalHtmlBlock =
    '<!DOCTYPE html><html lang="en"><body style="background-color: ' +
    contentBackgroundColor +
    ';color:' +
    contentTextColor +
    ';font-size: ' +
    contentFontSize.toString() +
    'px;">' +
    htmlBlock +
    '</body></html>';

  const [webheight, setWebheight] = useState(400);

  // this is from `ReactNativeWebView.postMessage`
  const onWebViewMessage = event => {
    let dynamicHeight = htmlBlock.length * 0.75;
    setWebheight(dynamicHeight);
  };

  return (
    <>
      <RenderIf condition={title}>
        <NavBar title={title} />
      </RenderIf>
      <ScrollView style={[styles.mainContainer, styleProp]}>
        <View style={{height: webheight, width: Mixins.MAX_WIDTH}}>
          <WebView
            style={[styles.content]}
            originWhitelist={['*']}
            source={{html: finalHtmlBlock}}
            automaticallyAdjustContentInsets={false}
            useWebKit={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={onWebViewMessage}
            injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight))"
          />
        </View>
      </ScrollView>
    </>
  );
};

export default WebViewContent;
