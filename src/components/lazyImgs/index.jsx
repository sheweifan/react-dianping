import React,{ Component , PropTypes , cloneElement ,Children  } from 'react';

const privateProps = {}
class LazyImg extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: true
		};
	}
	render(){
		const { loading } = this.state;
    	const { children } = this.props;
    	let props = {
    		
    	};
		Object.keys(this.props).forEach(function (i) {
			if (!privateProps[i]) {
				props[i] = this.props[i];
			}
		}, this);

		props.ref = (target) =>{
			if (this.props.ref) {
				this.props.ref(target);
			}
			this.target = target;
		};
       	return cloneElement(Children.only(children), props)
	}
	componentDidMount(){
    	const { children } = this.props;

    	Children.map(children,(item)=>{
    		console.log(children)
    	})
	}
}

export default LazyImg;