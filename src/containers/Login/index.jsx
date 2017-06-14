import React,{ Component , PropTypes } from 'react';
import { connect } from 'react-redux' 
import { Link } from 'react-router'
import { Button ,InputItem,WingBlank ,WhiteSpace ,Toast,Icon,List} from 'antd-mobile';

import { appClassNameupdateUpdate } from '../../actions/appClassName';
import { updateUserInfo } from '../../actions/userinfo';

import { loginUrl } from '../../config/index';
import postData from '../../until/postData';
import { setItem } from '../../until/localStorage';

import icon_password_hide from '../../static/icons/password_hide.svg';
import icon_password_show from '../../static/icons/password_show.svg';

import './index.less';

class Login extends Component {
    static contextTypes = {
        router: Object
    }
    
    constructor(props,context) {
        super(props,context);

        this.state={
            phonenum:'15521036763',
            phoneError:false,
            password:'123456',
            passwordDisplay:false
        }
    }
    componentWillMount(){
        var { clearAppClassName } = this.props;
        clearAppClassName();
    }
    handleChange(e,_state){
        this.setState({
            [_state]:e
        });
    }
    phonenumVerify(e){
        if(e.replace(/\s/g, '').length < 11){
            this.setState({
                phoneError:true
            });
        }else{
            this.setState({
                phoneError:false
            });
        }
    }
    handleSubmit(){
        let { phonenum , password } = this.state;
        let {router} = this.context;
        let {updateUserInfo} = this.props;
        console.log(router)
        if(phonenum.replace(/\s/g, '').length < 11 ){
            Toast.info('请输入正确的手机号码',2);       
            return;
        }
        if(password.length < 6 || password.length > 15){
            Toast.info('请输入6-15位密码');
            return;
        }
        Toast.loading('登陆中',0)
        postData(loginUrl,{
                phonenum,password
            })
            .then(data=>{
                console.log(data);
                let {isOk,verified} = data;
                Toast.hide();
                if(isOk){
                    if(verified){
                        setItem('userInfo',JSON.stringify(data.data));
                        updateUserInfo(data.data);
                        Toast.success('登陆成功',2,()=>{
                           router.goBack();
                        })
                    }else{
                        Toast.fail('密码错误',2)
                    }
                }else{
                    Toast.fail('请求失败',2)
                }
            })
    }
    render() {
        let {phonenum,phoneError,passwordDisplay,password} = this.state;

        return (
        	<div>
                <img src="http://wx3.sinaimg.cn/mw1024/7ed477c8gy1fgib9y1lzyj20b40b4756.jpg" className="login_img"/>
                <List className="login_form">
                    <InputItem 
                        placeholder="请输入手机号码"  
                        type="phone" 
                        onChange={(e)=>{this.handleChange(e,'phonenum');this.phonenumVerify(e)}} 
                        value={phonenum}
                        error={phoneError}
                        onErrorClick={()=>Toast.info('请输入正确的手机号码',2)}
                    >
                        手机号码
                    </InputItem>
                    <InputItem
                        placeholder="请输入手机密码" 
                        type={ passwordDisplay? 'text':'password' }
                        onChange={(e)=>{this.handleChange(e,'password')}}
                        value={password}
                        extra={<Icon onClick={ ()=>this.setState({passwordDisplay:!passwordDisplay}) } 
                                     type={ passwordDisplay?icon_password_show:icon_password_hide }
                                />}
                    >
                        密码
                    </InputItem>
                </List>
                <WhiteSpace size="md" />
                <WingBlank size="lg">
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                        登陆
                    </Button>
                    <Link className="goRegister">还没账号？去注册一个吧</Link>
                </WingBlank>
                <WhiteSpace size="md" />   
            </div>
        )
    }
    componentWillUnmount(){
        var { resetAppClassName } = this.props;
        resetAppClassName();
    }
}


let mapStateToProps = (state)=>{
    return {}
}

let mapDispatchToProps = (dispatch)=>{
    return {
        clearAppClassName:()=>dispatch(appClassNameupdateUpdate('')),      
        resetAppClassName:()=>dispatch(appClassNameupdateUpdate('has_head')),
        updateUserInfo:(data)=>dispatch(updateUserInfo(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
