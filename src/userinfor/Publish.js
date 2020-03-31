import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import { Icon, Button } from '@ant-design/react-native';
const {width} = Dimensions.get('window');
const s = width / 640;
export default class Publish extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            page:1,
            reply:['已回复','待回复'],
            isLoad: false,
        }
    }
    componentDidMount(){

        let page = this.state.page;
        fetch('https://cnodejs.org/api/v1/topics?page='+page+'&limit=15')
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                    data: res.data,
                    isLoad: true,
                });
            })
    }
    componentDidUpdate(prevProps,prevState){
        if(prevState.page!=this.state.page){
            let page = this.state.page;
            fetch('https://cnodejs.org/api/v1/topics?page='+page+'&limit=15')
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({
                        data: res.data,
                        isLoad: true,
                    });
                })
            }
    }
    handleClickNext = () => { 
        const idx = this.state.page + 1;
        this.setState({page:idx});
    };
    handleClickPrev = () => {
        if(this.state.page === 1){
            ToastAndroid.show('已经是第一页了！',100);
        }else{
            const idx = this.state.page - 1;
            this.setState({page:idx});
        }
    };
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoad?(
                       this.state.data.map((item)=>(
                    <View style={styles.list}>
                        <Text style={styles.txt1}>{item.title.length>15?item.title.substring(0,15)+"...":item.title}</Text>
                        <Text style={styles.txt2}>{item.create_at.slice(0,10)}</Text>
                        {
                            this.state.reply[parseInt(Math.random()*this.state.reply.length)]=="已回复"?
                            <Text style={styles.txt3}>已回复</Text>:<Text style={styles.txt4}>待回复</Text>
                        }
                        
                    </View>
                    )) 
                    ):<ActivityIndicator color="red" size='large'/>
                    
                }
                <View style={styles.buttonList}>
                    <Button style={styles.button1} onPress={this.handleClickPrev}><Text style={{color:'#fff'}}>上一页</Text></Button>
                    <Text style={{fontSize:18}}>第{this.state.page}页</Text>
                    <Button style={styles.button2} onPress={this.handleClickNext}><Text style={{color:'#fff'}}>下一页</Text></Button>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'#fff',
      height:'100%'
      
    },
    list:{
        flexDirection:'row',
        height:60*s,
        marginLeft:10*s,
        borderBottomColor:'#eee',
        // alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1
    },
    txt1:{
        width:380*s,
        lineHeight:25*s
    },
    txt2:{
        marginLeft:20*s,
        lineHeight:25*s,
    },
    txt3:{
        marginLeft:20*s,
        lineHeight:25*s,
    },
    txt4:{
        marginLeft:20*s,
        lineHeight:25*s,
        color:'red'
    },
    buttonList:{
      flexDirection:'row',
      alignItems:'center',
    //   justifyContent:'center',
      marginTop:30,
      backgroundColor:'#fff'
    },
    button1:{
        marginLeft:30*s,
        marginRight:90*s,
        width:"25%",
        height:40,
        borderRadius:25,
        backgroundColor:'#f23030',
        color:'red'
    },
    button2:{
        marginLeft:90*s,
        width:"25%",
        height:40,
        borderRadius:25,
        backgroundColor:'#f23030',
        color:'red'
    }
  });