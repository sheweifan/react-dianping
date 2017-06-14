import React,{Component} from 'react';
import {connect} from 'react-redux';


import HomeHeader from '../../components/HomeHeader/index';
import Banner from './subpage/Banner/index';
import LinkGrid from './subpage/LinkGrid/index';
import MallList from '../../components/MallList/index';
import ListHeader from '../../components/ListHeader/index';

let Home = (props, context) =>{
    let { userInfo } = props;
    return (
        <div>
            <Banner />
            <LinkGrid />
            <MallList renderHeader={()=>'猜你喜欢'} body={{category:'guess'}}/>
            <HomeHeader 
                enterChange={(e)=> {context.router.push(`/search/all/${e}`)}}
                userInfo={userInfo}
            />
        </div>
    )
}

Home.contextTypes = {
    router: Object
}


let mapStateToProps = (state)=>{
    return {
        userInfo:state.userInfo
    }
}

let mapDispatchToProps = (dispatch)=>{
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

