import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface CreateAccountProps {
  navigation: any;
}

const Create_Account: React.FC<CreateAccountProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Create_Account;
