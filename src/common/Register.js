import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage,TouchableOpacity,ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Login extends Component {
  constructor(){
    super();
    this.state = {
        username:'',
        pwd:'',
        pwd1:'',
        isloading:false
    }
  }
  userhandle = (text)=>{
    this.setState({username:text})
  }
  pwdhandle = (text)=>{
      this.setState({pwd:text})
  }
  pwdhandle1 = (text)=>{
    this.setState({pwd1:text})
  }
  register = ()=>{
    if(this.state.username!=''&&this.state.pwd!=''&&this.state.pwd1!=''){
        if(this.state.pwd1!=this.state.pwd){
            ToastAndroid.show("两次密码输入不一致！",100);
          }else{
            myFetch.post('/register',{
              username:this.state.username,
              pwd:this.state.pwd
            }).then(res=>{
              if(res.data.token=='1'){
                ToastAndroid.show("用户名已存在！",100);
              }else{
                this.setState({isloading:true})
                AsyncStorage.setItem('user1',JSON.stringify(res.data)).then(()=>{
                Actions.login();
            })
            }
            })
          }
        }else{
          ToastAndroid.show("不能为空！请检查下再来！",100);
        }
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
            <TextInput onChangeText={this.pwdhandle1} placeholder="请重新输入密码"  secureTextEntry={true}/>
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
                onPress={this.register}>
                <Text>注册</Text>
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
                onPress={()=>Actions.login()}>
                <Text>返回登录</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.isloading
            ?<View style={{ alignItems: 'center'}}><Text>注册成功...正在跳转...</Text></View>
            :null
        }
      </View>
    );
  }
}