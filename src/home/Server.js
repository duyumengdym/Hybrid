import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StatusBar
} from 'react-native';
import {Icon,Carousel} from '@ant-design/react-native' ;
import SplashScreen from 'react-native-splash-screen'
const {width} = Dimensions.get('window');
const s = width / 640;
const server = [
    {
        title: '居家维修保养',
        img: require('../../assets/server1.jpg')
    },
    {
        title: '住宿优惠',
        img: require('../../assets/server2.jpg')
    },
    {
        title: '出行接送',
        img: require('../../assets/server3.jpg')
    },
    {
        title: 'E族活动',
        img: require('../../assets/server4.jpg')
    },

]
export default class Server extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <View>
                <StatusBar backgroundColor="#f23030"/>
                <ScrollView>
                <View style={styles.header}>
                    <View style={styles.search}>
                    <Icon style={{color:'#fff',marginLeft:10}} size="lg" name='search' />
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            placeholderTextColor='#fff'
                            style={{
                                width: 490*s,
                                height: 50*s,
                                padding: 0,
                                fontSize:18,
                                paddingLeft: 10
                            }}
                        />
                    </View>
                    <Icon style={{color:'#fff',marginTop:5,marginLeft:10}} size='lg' name='shopping-cart' />
                </View>
                <View>
                    <Carousel
                        style={styles.wrapper}
                        selectedIndex={0}
                        autoplay
                        infinite
                        dotStyle={{backgroundColor:'#fff'}}
                        dotActiveStyle={{backgroundColor:'#fd0304'}}
                    >
                        <View style={styles.containerHorizontal}>
                            <Image style={{height:'100%',width:'100%'}}source={require('../../assets/lunbo.jpg')}/>
                        </View>
                        <View style={styles.containerHorizontal}>
                            <Image style={{height:'100%',width:'100%'}}source={require('../../assets/lunbo.jpg')}/>
                        </View>
                        <View style={styles.containerHorizontal}>
                            <Image style={{height:'100%',width:'100%'}}source={require('../../assets/lunbo.jpg')}/>
                        </View>
                    </Carousel>
                </View>
                <View>
                    <FlatList 
                        data={server}
                        numColumns={1}
                        renderItem={({item})=>(
                                <View style={styles.list}>
                                    <Image source={item.img} style={{width:100*s,height:100*s,marginLeft:20*s}}/>
                                    <Text style={{width:300*s,height:40*s,color:'#333333', marginLeft:45*s,fontSize:18}}>{item.title}</Text>
                                    <Icon style={{color:'#d5d5d5',right:0,marginLeft:100*s}} size="xs" name='right'/>
                                </View>
                        )}
                    />
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color:'#fff',fontSize:17}}>发布需求</Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center',marginTop:20*s}}>         
                    <Text style={{color:'#767676',fontSize:15}}>©E族之家 版权所有</Text>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height:90*s,
        backgroundColor:'#f23030',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    search:{
        width: 544*s,
        height: 60*s,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#fbb8b8',
        borderRadius:30
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250*s,
      },
    wrapper:{
        backgroundColor:'pink'
    },
    list:{
        width:640*s,
        height:118*s,
        marginTop:12*s,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:"#fff"
    },
    button:{
        width:'80%',
        height: 50,
        backgroundColor: '#f23030',
        marginTop: 30,
        alignItems: 'center',
        fontSize:20*s,
        borderRadius:10,
        justifyContent: 'center'
    }
})