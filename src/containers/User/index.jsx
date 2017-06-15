import React,{ Component , PropTypes } from 'react';
import {connect} from 'react-redux';

import { Button , WingBlank , WhiteSpace} from 'antd-mobile';

import Header from '../../components/Header/index';
import UserTop from './subpage/UserTop/index'

import { updateUserInfo } from '../../actions/userinfo';
import { removeItem } from '../../until/localStorage';

// let User = (props, context) =>{
//     let { userInfo,updateUserInfo } = props;
//     console.log(userInfo)
//     let { router } = context;
//     if(!userInfo || Object.keys(userInfo).length === 0){
//         router.push('/login');
//         return null
//     }
//     return (
//         <div>
//             <UserTop userInfo={ userInfo }/>
//             <WingBlank size='md'>
//                 <WhiteSpace size='md' />
//                 <Button 
//                     onClick={ ()=>{
//                         removeItem('userInfo');
//                         updateUserInfo({});
//                         router.push('/login');
//                     } }
//                 >
//                     退出登陆
//                 </Button>
//                 <WhiteSpace size='md' />
//             </WingBlank>
//             <Header title="个人中心" />
//         </div>
//     )
// }

class User extends Component{
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props, context){
        super(props, context);
    }
    render(){
        let { userInfo , updateUserInfo} = this.props;
        let { router } = this.context;
        console.log(router);
        return (
            !userInfo || Object.keys(userInfo).length === 0
            ? <div>未登录</div>
            : <div>
                <UserTop userInfo={ userInfo }/>
                <WingBlank size='md'>
                    <WhiteSpace size='md' />
                    <Button 
                        onClick={ ()=>{
                            removeItem('userInfo');
                            updateUserInfo({});
                            router.replace('/');
                        } }
                    >
                        退出登陆
                    </Button>
                    <WhiteSpace size='md' />
                </WingBlank>
                <Header title="个人中心" />
            </div>
        )
    }
    componentDidMount(){
        let { userInfo,updateUserInfo } = this.props;
        let { router } = this.context;
        if(!userInfo || Object.keys(userInfo).length === 0){
            router.replace('/login');
        }
    }
}

let mapStateToProps = (state)=>{
    return {
        userInfo:state.userInfo
    }
}

let mapDispatchToProps = (dispatch)=>{
    return {
        updateUserInfo:(data)=>dispatch(updateUserInfo(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);

