import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View, Text, Button, type TextStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from 'react-native-scrollable-bottom-sheet';
//import textfile from "@/app/assets/terms.txt";



// Do not forget to wrap your app in GestureHandlerRootView
export default function App() {
    

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
      <ExampleBottomSheet />
    </GestureHandlerRootView>
  );
}




function getTerms() {
  const [text, setText] = React.useState();
  const [terms, setTerms] = useState('');

  fetch("@/app/assets/terms.txt")
    .then((response) => response.text())
    .then((textContent) => {
        setTerms(textContent);
    });
  return text || "Loading...";
}



const ExampleBottomSheet = () => {
  const [visible, setVisible] = React.useState<boolean>(true);
  const [terms, setTerms] = useState('');

  const onVisibilityChange = (visible: boolean) => {
    setVisible(visible);
  };
  return (
        <View style={styles.container}>
        <Button
        title="Open Bottom Sheet"
        onPress={() => {
            setVisible(true);
        }}
        />


      <BottomSheet onVisibilityChange={onVisibilityChange} visible={visible}>
        <Text style={headerTextStyle}>Terms and Conditions</Text>
        <Text style={headerTextStyle}>
                {terms}
        </Text>
        <View style={{ height: 20 }} />
        <Button
          title="Close Sheet"
          onPress={() => {
            setVisible(false);
          }}
        />
        <View style={{ height: 20 }} />
      </BottomSheet>
    </View>
  );
};

const headerTextStyle: TextStyle = {
  textAlign: 'center',
  fontSize: 24,
  fontWeight: 'bold',
  padding: 20,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});