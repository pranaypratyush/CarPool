import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import {Actions } from 'react-native-router-flux';

const USERNAME = 'USERNAME'
const USER_EMAIL = 'USER_EMAIL'
const USER_RIDE_OR_DRIVE = 'USER_RIDE_OR_DRIVE'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            userName: 'Guest',
            email: '',
            rideOrDrive: '',
            textName: '',
            textEmail: '',
            textRideOrDrive: ''
        }
  }

  componentWillMount(){
      this.load()
  }

  load = async() => {
      try{
          const userName = await AsyncStorage.getItem(USERNAME)
          const email = await AsyncStorage.getItem(USER_EMAIL)
          const rideOrDrive = await AsyncStorage.getItem(USER_RIDE_OR_DRIVE)
          if(userName && email && rideOrDrive){
              this.setState({userName, email, rideOrDrive})
          }
      } catch(error){
          console.error(`Couldnt get it ${error}`)
      }
  }

  saveName = async(userName) => {
      try{
          await AsyncStorage.setItem(USERNAME, userName)
          this.setState({userName})
      } catch(error){
          console.error('nope did not save name')
      }
  }

  saveEmail = async(email) => {
    try{
        await AsyncStorage.setItem(USER_EMAIL, email)
        this.setState({email})
    } catch(error){
        console.error('nope did not save email')
    }
  }

  saveRideOrDrive = async(rideOrDrive) => {
    try{
        await AsyncStorage.setItem(USER_RIDE_OR_DRIVE, rideOrDrive)
        this.setState({rideOrDrive})
    } catch(error){
        console.error('nope did not save ride or drive')
    }
  }

  onChangeTextName = (textName) => this.setState({textName, name: textName})
  onChangeTextEmail = (textEmail) => this.setState({textEmail})
  onChangeTextRideOrDrive = (textRideOrDrive) => this.setState({textRideOrDrive})

  onSubmitEditing = () => {
      const {textName} = this.state
      const {textEmail} = this.state
      const {textRideOrDrive} = this.state
      if(!textName || !textEmail || !textRideOrDrive) return
      if(textName) {
          this.saveName(textName)
          this.setState({textName: ''})
      } 
      if(textEmail){
          this.saveEmail(textEmail)
          this.setState({textEmail: ''})
      } 
      if(textRideOrDrive){
          this.saveRideOrDrive(textRideOrDrive)
          this.setState({textRideOrDrive: ''})
      }
  }

  render() {
    const {userName, email, rideOrDrive, textName, textEmail, textRideOrDrive} = this.state

    return (
        <View style={styles.container}>
            {
                userName ? 
                <Text style={styles.subtext}> Let's ride together {userName}!</Text>
                :
                <View style={styles.reset}>
                    <Text style={styles.maintext}> Welcome to CarPool! </Text>
                    <Text style={styles.subtext}>Please Login / Signup</Text>
                </View>
            }
            <KeyboardAvoidingView
                style={styles.reset}
                behavior="padding"
                >
                <TextInput 
                    style={styles.input} 
                    value={textName}
                    placeholder={'Enter your name here'}
                    placeholderTextColor='purple'
                    onChangeText={this.onChangeTextName}
                    onSubmitEditing={this.onSubmitEditing}
                />
                <TextInput 
                    style={styles.input} 
                    value={textEmail}
                    placeholder={'email'}
                    placeholderTextColor='purple'
                    onChangeText={this.onChangeTextEmail}
                    onSubmitEditing={this.onSubmitEditing}
                />
                <TextInput 
                    style={styles.input} 
                    value={textRideOrDrive}
                    placeholder={'driver, rider, or both?'}
                    placeholderTextColor='purple'
                    onChangeText={this.onChangeTextRideOrDrive}
                    onSubmitEditing={this.onSubmitEditing}
                />
                <Button
                    onPress={() => Actions.profile({userName})}
                    title='Lets ride!'
                    color="#841584"
                    accessibilityLabel='Tap here to join or sign up'
                    style={styles.reset}
                />
            </KeyboardAvoidingView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 'bold',
    margin: 5,
  },
  subtext: {
    fontSize: 30,
    margin: 8,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  reset: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});