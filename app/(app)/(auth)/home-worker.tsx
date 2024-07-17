import { View, Text, Pressable } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import Colors from '@/app/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonGroup } from '@rneui/themed';
import Events from '@/app/Components/EventSummary';


const Home = () => {
 // const { user } = useUser();
 const [role, setRole] = useState('');

 //I guess this is how I have to do it?
 const[workerString, setWorkerString] = useState('');

 const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    

    if(role == "MEDICAL") {
     setWorkerString("YOU ARE A MEDICAL WORKER");
    }
    
  });

  function handleWorkerType(value: string) {
    

    setRole(value);

    /*
    if(role == "MEDICAL") {
     setWorkerString("YOU ARE A MEDICAL WORKER");
    }
    */

  };



  return (
    <SafeAreaView style={styles.container}>
        

       
        <ButtonGroup
          buttons={['MEDICAL', 'SECURITY', 'DISPATCHER']}
          selectedIndex={selectedIndex}
          onPress={(value) => {
            handleWorkerType(value);
          }}
          containerStyle={{ marginBottom: 40 }}
        />

        <TextInput value={values.dispa}
         />
         <Button onPress={handleSubmit} title="Submit" />


      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* <Categories />  */}
        <Text style={styles.header}>What event are you working?</Text>
        <Events/>
        
       
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    top: 50,
    backgroundColor: Colors.RMABG,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.RMABG,
  },
});

export default Home;
