import React,{ Component , PropTypes } from 'react';
import { connect } from 'react-redux' 
import { Link } from 'react-router'
import { Button ,InputItem,WingBlank ,WhiteSpace ,Toast,Icon,List} from 'antd-mobile';

import { appClassNameupdateUpdate } from '../../actions/appClassName';
import { updateUserInfo } from '../../actions/userinfo';

import { registeUrl } from '../../config/index';
import postData from '../../until/postData';

import icon_password_hide from '../../static/icons/password_hide.svg';
import icon_password_show from '../../static/icons/password_show.svg';

import './index.less';

class Registe extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    constructor(props,context) {
        super(props);
        this.state={
            phonenum: '',
            phoneError:false,
            password:'',
            passwordRepeat:'',
            passwordDisplay:true
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
        let { phonenum , password , passwordRepeat } = this.state;
        let {router} = this.context;
        let {updateUserInfo} = this.props;
        if(phonenum.replace(/\s/g, '').length < 11 ){
            Toast.info('请输入正确的手机号码',2);       
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
        postData(registerUrl,{
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
            passwordRepeat} = this.state;

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
