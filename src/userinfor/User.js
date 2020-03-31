import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {Icon} from '@ant-design/react-native' ;
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

const {width} = Dimensions.get('window');
const s = width / 640;
const fun1 = [
    {
        title: '账户管理',
        img: 'setting'
    },
    {
        title: '收货地址',
        img: 'unordered-list'
    },
    {
        title: '我的信息',
        img: 'audit'
    },
    {
        title: '我的订单',
        img:'profile'
    },
    {
        title: '我的二维码',
        img: 'qrcode'
    },
    {
        title: '我的积分',
        img: 'trophy'
    },
    {
        title: '我的收藏',
        img: 'star'
    },
]
const fun2 = [
    {
        title: '居家维修保养',
        img: 'tool'
    },
    {
        title: '出行接送',
        img: 'car' 
    },
    {
        title: '我的受赠人',
        img: 'user'
    },
    {
        title: '我的住宿优惠',
        img:'transaction'
    },
    {
        title: '我的活动',
        img: 'flag'
    },
    {
        title: '我的发布',
        img: 'form'
    },

]
const options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '相机',
    chooseFromLibraryButtonTitle: '从相册中选择',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
export default class User extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:''
        }
    }
    componentDidMount(){  
        AsyncStorage.getItem('userImage').then((res)=>{
            // console.log(res);
            if(res==null) {
                this.setState({
                    imageUrl:require('../../assets/rn.jpg')
                })
            }else{
                this.setState({
                    imageUrl: JSON.parse(res)
                });
            }
            console.log(this.state.imageUrl);
        });
    }
    takephoto=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else { 
                const source = { uri: response.uri };
                this.setState({
                    imageUrl: source,
                });
                AsyncStorage.setItem('userImage',JSON.stringify(source))
            }
        })
    }
    exit=()=>{
        AsyncStorage.removeItem('user');
        Actions.login();
    }
    render() {
        return (
            <View >
                <StatusBar backgroundColor="#f23030"/>
                <ScrollView>
                    <View style={styles.header} >
                        <TouchableOpacity onPress={()=>{this.takephoto()}}>
                            <Image style={styles.img} source={this.state.imageUrl}/>
                        </TouchableOpacity> 
                    <Text style={{marginTop:20*s,fontSize:20,color:'#fff'}}>BINNU DHILLON</Text>
                    </View>
                <View style={styles.main}>
                    <Icon style={{color:'#c3c3c3',marginLeft:10*s,marginRight:12*s}} size="lg" name='user' />
                    <Text style={styles.font}>我的个人中心</Text>
                </View>
                <View style={{backgroundColor:'#fff'}}>
                    <FlatList
                        contentContainerStyle={{justifyContent:'space-evenly'}}
                        data={fun1}
                        numColumns={3}
                        renderItem={({item})=>(
                            <View style={styles.list}>
                                <Icon style={{color:'#d5d5d5'}} size="lg" name={item.img}/>
                                <Text style={styles.font}>{item.title}</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={styles.main1}>
                    <Icon style={{color:'#c3c3c3',marginLeft:10*s,marginRight:12*s}} size="lg" name='tag' />
                    <Text style={styles.font}>E族活动</Text>
                </View>
                <View style={{justifyContent:'space-evenly',backgroundColor:'#fff'}}>
                    <FlatList
                        contentContainerStyle={{justifyContent:'space-evenly'}}
                        data={fun2}
                        numColumns={3}
                        renderItem={({item})=>{
                            if(item.title=="我的发布"){
                                return<Button onPress={()=>{Actions.publish()}}>
                                    <View style={styles.list}>
                                        <Icon style={{color:'#d5d5d5'}} size="lg" name={item.img}/>
                                        <Text style={styles.font}>{item.title}</Text>
                                    </View>
                                </Button>
                            }else{
                                return<View style={styles.list}>
                                        <Icon style={{color:'#d5d5d5'}} size="lg" name={item.img}/>
                                        <Text style={styles.font}>{item.title}</Text>
                                </View>
                            }
                        }

                    }
                    />
                </View>
                <View style={{alignItems: 'center',marginTop:30*s,marginBottom:30*s}}>         
                    <Text style={{color:'#767676',fontSize:15}}>BINNU DHILLON</Text>
                </View>
                <Button style={{color:'#f23030',fontSize:15}} onPress={this.exit}>(退出登录)</Button>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height:350*s,
        backgroundColor:'#f23030',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
        width: 100,
        height: 100,
        borderColor:'#fff',
        borderWidth:2,
        borderRadius:60,
    },
    main: {
        height: 60*s,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    main1: {
        height: 60*s,
        backgroundColor:'#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:1,
        marginTop:5,
        borderBottomColor:'#eee'
    },
    font:{
        color:'#4f4e4e',
        fontSize:16,
        alignItems: 'center',
    },
    list:{
        width:180*s,
        height:125*s,
        alignItems: 'center',
        backgroundColor:"#fff",
        justifyContent:'center',
        marginLeft:30*s
    }
})