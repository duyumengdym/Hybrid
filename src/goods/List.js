import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    TextInput
} from 'react-native';
import { Icon } from '@ant-design/react-native';
const {width} = Dimensions.get('window');
const s = width / 640;
const goods = [
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/1.jpg')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '88.00',
        img: require('../../assets/2.jpg')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/1.jpg')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '88.00',
        img: require('../../assets/2.jpg')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '36.00',
        img: require('../../assets/1.jpg')
    },
    {
        title: 'Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳',
        price: '88.00',
        img: require('../../assets/2.jpg')
    },
]
export default class List extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style={{justifyContent:'center',flexDirection:'row',backgroundColor:'#fff'}}>
                <View style={styles.header}>
                    <TextInput
                        placeholder="请输入商品名称"
                        placeholderTextColor='#999999'
                        style={{
                            fontSize:16,
                            height:50,
                            width:'85%'
                        }}
                    />
                    <Icon style={{marginTop:5,marginLeft:10}} size="lg" name='search' />
                </View>
            </View>
            <View style={{
            justifyContent:'center',
            height:50,
            flexDirection:'row', 
            alignItems:'center',
            backgroundColor:'#fff',
            justifyContent:'space-around'}}>
            <View><Text style={{fontSize:20,color:'#f23030'}}>综合</Text></View>
            <View><Text style={{fontSize:20,color:'#494949'}}>销量</Text></View>
            <View><Text style={{fontSize:20,color:'#494949'}}>新品</Text></View>
            <View><Text style={{fontSize:20,color:'#494949'}}>价格</Text></View>
            <View><Text style={{fontSize:20,color:'#494949'}}>信用</Text></View>
            </View>
            <FlatList  
                style={{backgroundColor: '#F4F4F4'}}
                data={goods}
                numColumns={2}
                renderItem={({item})=>(
                    <View style={styles.good}>
                        <Image 
                            resizeMode="contain"
                            source={item.img}
                            style={{height:180*s,marginTop: 60*s}}
                        />
                        <Text
                            style={{marginTop: 20,color:'#747474',fontSize:16}}
                        >{item.title}</Text>
                        <Text 
                            style={{width:'100%',color:'red',fontSize:20,marginTop:10}}
                        >{item.price}</Text>
                    </View>
                )}
            />
      </View> 
        )
    }
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'#f4f4f4',
      height:'100%'
    },
    header:{
        backgroundColor: '#f4f4f4',
        height:50,
        color:'red',
        marginTop:10,
        marginBottom:10,
        flexDirection:'row',
        width:'80%'
    },
    box:{
      width:"45%",
      height:300,
      marginTop:20,
      backgroundColor:'#fff',
      justifyContent:'center'
    },
    good:{
        width: 290*s,
        backgroundColor: '#fff',
        marginLeft: 20*s,
        marginTop: 20*s,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20,
        alignItems: 'center'
    }
  });