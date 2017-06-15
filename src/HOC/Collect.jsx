import React,{ Component , PropTypes } from 'react';


const CollectHOC = ( WrappedComponent ) => {
	return class extends Component {
		constructor(props){
			super(props);
			console.log(this.props);
		}
		verify(){
		}
		render() {
			const { userInfo } = this.props;
			let logined = Object.keys(userInfo).length !== 0;
			console.log('logined',logined)
			return (
				<WrappedComponent />
			) 
		}
	}
}

export default CollectHOC;