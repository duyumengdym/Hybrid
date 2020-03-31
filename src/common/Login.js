import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage,TouchableOpacity,ToastAndroid,} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Login extends Component {
  constructor(){
    super();
    this.state = {
        username:'',
        pwd:'',
        isloading:false
    }
  }
  userhandle = (text)=>{
    this.setState({username:text})
  }
  pwdhandle = (text)=>{
      this.setState({pwd:text})
  }
  login = ()=>{
    myFetch.post('/login',{
        username:this.state.username,
        pwd:this.state.pwd}
    ).then(res=>{
        if(res.data.username&&res.data.pwd){
          AsyncStorage.setItem('user',JSON.stringify(res.data))
            .then(()=>{
                this.setState({isloading:true})
                Actions.homePage();
        })
        }else{
          this.setState({isLoading:false});
          ToastAndroid.show("请输入正确的用户名和密码！",100);
        }
    })
  } 
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput onChangeText={this.userhandle} placeholder="请输入用户名" />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="eye" color="red"/>
            <TextInput onChangeText={this.pwdhandle} placeholder="请输入密码"  secureTextEntry={true}/>
          </View>
          <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#f23030',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={()=>Actions.register()}>
                <Text>前往注册</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.isloading
            ?<View style={{ alignItems: 'center'}}><Text>正在登录...请稍等...</Text></View>
            :null
        }
      </View>
    );
  }
}