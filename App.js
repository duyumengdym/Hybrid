import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text, Image,BackHandler,ToastAndroid,AsyncStorage} from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import {Icon} from '@ant-design/react-native' ;import SplashScreen from 'react-native-splash-screen'
import Server from './src/home/Server';
import Publish from './src/userinfor/Publish';
import User from './src/userinfor/User';
import List from './src/goods/List';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import Register from './src/common/Register';
console.disableYellowBox = true;
const App = () => {
  let [isLogin,setLogin] = useState(false);
  let [isInstall,setInstall] = useState(true);
	let now = 0;
	let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			console.log('isinstall',res)
			if(res){
				setInstall(false);
			}
		})
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user);
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
        setLogin(true);
				SplashScreen.hide();
			}
    })
  }
	useEffect(()=>{
    init();
	},[])
	let afterInstall = ()=>{
		console.log('after install');
		setInstall(false);
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
  return (                                                       
    <Router
      backAndroidHandler={()=>{
        if(Actions.currentScene==='home'){
          console.log(Actions.currentScene);
          if(new Date().getTime()-now<2000){
              BackHandler.exitApp();
          }
          else{
              ToastAndroid.show("确定退出吗",100);
              now =new Date().getTime();
              return true;
          }
      }
        else if(Actions.currentScene==='login'){
            console.log(Actions.currentScene);
            if(new Date().getTime()-now<2000){
                BackHandler.exitApp();
            }
            else{
                ToastAndroid.show("确定退出吗",100);
                now =new Date().getTime();
                return true;
            }
        }
        else{
            console.log(Actions.currentScene);
            Actions.pop();
            return true;
        }
          
    }}
    >
      <Overlay>
        <Modal key="modal" hideNavBar>
				    <Lightbox key="lightbox">
                <Scene key="root" >
                    <Tabs key='tabbar'
                      hideNavBar
                      activeTintColor='red'
                      inactiveTintColor='gray'
                      tabBarStyle={{backgroundColor:'#fff'}}
                      >
                      <Scene 
                        title='首页'
                        hideNavBar
                        key='homePage'
                        icon={
                          ({focused})=><Icon 
                            color={focused?'red':'gray'} 
                            name="home"
                          />
                        }
                        >
                        <Scene hideNavBar key='home' component={Server} />
                      </Scene>
                      <Scene 
                        key='goods'
                        title='商品分类'
                        icon={
                          ({focused})=><Icon 
                            color={focused?'red':'gray'} 
                            name="appstore"
                          />
                        }
                        >
                        <Scene hideNavBar key='list' component={List}/>
                      </Scene>
                      <Scene 
              title='个人中心'
              key='person'
              icon={
                ({focused})=><Icon 
                  color={focused?'red':'gray'} 
                  name="user"
                />
              }
              >
              <Scene hideNavBar key='user' component={User}/>
              
            </Scene>
                    </Tabs>
        
                <Scene
                  navigationBarStyle={{backgroundColor:'#f23030',color:'#fff'}}
              navBarButtonColor='#fff'
              renderRightButton={<Icon 
                name="ellipsis"
                size='lg'
                style={{color:'#fff'}}
              />}
              rightButtonStyle={{marginRight:10}}
              titleStyle={{flex:1,textAlign:'center',color:'#fff'}}
              title='我的发布'
              key='publish' 
                  component={Publish}/>
                </Scene>	
            </Lightbox>
            <Scene initial={!isLogin} key="login" component={Login}/>
            <Scene initial={false} key="register"component={Register}/>
        </Modal>
      </Overlay>  
    </Router>
  );
};

const styles = StyleSheet.create({
  publish:{
    backgroundColor: '#f23030',
}
});

export default App;