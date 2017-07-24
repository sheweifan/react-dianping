import React,{ Component , PropTypes } from 'react';
import { connect } from 'react-redux' 
import { Link } from 'react-router'
import { Button , InputItem , WingBlank , WhiteSpace , Toast , Icon , List } from 'antd-mobile';

import { appClassNameupdateUpdate } from '../../actions/appClassName';
import { updateUserInfo } from '../../actions/userinfo';

import { registeUrl , getVerifyCode } from '../../config/index';
import postData from '../../until/postData';

import icon_password_hide from '../../static/icons/password_hide.svg';
import icon_password_show from '../../static/icons/password_show.svg';

import './index.less';

const TIMEOUT = 10;

class Registe extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    constructor(props,context) {
        super(props);
        this.state={
            phonenum: '',
            phoneError: false,
            password:'',
            passwordRepeat:'',
            passwordDisplay:true,
            verifyCode:'',
            verifyCodeTimeout:0
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
    getVerifyCode(){
        let { phoneError , phonenum } = this.state;
        if(phoneError || phonenum === ''){
            Toast.info('请输入正确的手机号码',2);
            return;
        }
        postData(getVerifyCode,{
                phonenum
            })
            .then(data=>{
                // 模拟发送短信
                if(data.isOk){
                    Toast.info('发送成功',2);

                    // setTimeout(function(){
                        alert('模拟发送短信：您的验证码是'+data.verifyCode);
                    // },2000);
                    
                    this.setState({
                        verifyCodeTimeout:TIMEOUT
                    })
                    // 倒计时
                    this.timer = setInterval(function(){
                        let now = this.state.verifyCodeTimeout -1 ;
                        if(now === -1){
                            return;
                        }
                        this.setState({
                            verifyCodeTimeout: now
                        })
                    }.bind(this),1000);
                }
            })
    }
    handleSubmit(){
        let { phonenum , password , passwordRepeat , verifyCode } = this.state;
        let {router} = this.context;
        let {updateUserInfo} = this.props;
        if(phonenum.replace(/\s/g, '').length < 11 ){
            Toast.info('请输入正确的手机号码',2);       
            return;
        }

        if(verifyCode.length < 4 ){
            Toast.info('验证码错误',2);       
            return;
        }

        if(password !== passwordRepeat){
            Toast.info('密码和确认密码不一致，请重新输入');
            return;
        }

        if(password.length < 6 || password.length > 15){
            Toast.info('请输入6-15位密码');
            return;
        }
        Toast.loading('提交中',0)
        postData(registeUrl,{
                phonenum,password
            })
            .then(data=>{
                let {isOk,registerSuccess} = data;
                Toast.hide();
                if(isOk){
                    if(registerSuccess){
                        Toast.success('注册成功',2,()=>{
                            router.push({ pathname : '/login', state:{ phonenum } });
                        })
                    }else{
                        Toast.fail('注册失败，请稍后重试',2)
                    }
                }else{
                    Toast.fail('请求失败',2)
                }
            })
    }
    render() {
        let {phonenum,
            phoneError,
            passwordDisplay,
            password,
            passwordRepeat,
            verifyCode,
            verifyCodeTimeout} = this.state;
      
        return (
        	<div>
                <WhiteSpace size="md" />
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
                        maxLength="4"
                        className="verify_code_inputitem"
                        placeholder="请输入验证码"  
                        type="number" 
                        onChange={(e)=>{this.handleChange(e,'verifyCode');}} 
                        value={ verifyCode }
                        extra={ 
                            <Button 
                                type="primary"
                                size="small"
                                onClick={this.getVerifyCode.bind(this)}
                                disabled={verifyCodeTimeout !== 0}
                            >
                                {   
                                    verifyCodeTimeout === 0
                                    ? '获取验证码'
                                    : verifyCodeTimeout+'s'
                                }
                            </Button>
                        }
                    >
                        验证码
                    </InputItem>
                    <InputItem
                        placeholder="请设置密码" 
                        type={ passwordDisplay? 'text':'password' }
                        onChange={(e)=>{this.handleChange(e,'password')}}
                        value={password}
                        extra={<Icon onClick={ ()=>this.setState({passwordDisplay:!passwordDisplay}) } 
                                     type={ passwordDisplay?icon_password_show:icon_password_hide }
                                />}
                    >
                        密码
                    </InputItem>
                    <InputItem
                        placeholder="请设置密码" 
                        type={ passwordDisplay? 'text':'password' }
                        onChange={(e)=>{this.handleChange(e,'passwordRepeat')}}
                        value={passwordRepeat}
                        extra={<Icon onClick={ ()=>this.setState({passwordDisplay:!passwordDisplay}) } 
                                     type={ passwordDisplay?icon_password_show:icon_password_hide }
                                />}
                    >
                        确认密码
                    </InputItem>
                </List>
                <WhiteSpace size="md" />
                <WingBlank size="lg">
                    <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                        登陆
                    </Button>
                    <Link className="goRegister" to="/login">已有帐号？去登录</Link>
                </WingBlank>
                <WhiteSpace size="md" />   
            </div>
        )
    }
    componentWillUnmount(){
        var { resetAppClassName } = this.props;
        resetAppClassName();
        if(this.timer){
            clearInterval(this.timer);
        }
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
)(Registe);
