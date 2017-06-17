import React , { Component , PropTypes } from 'react';

import './index.less';

const FixedButton = (props) => {
	return (
		<div>
			<div className="fixed_buttons">
				{
					props.options.map((item,i)=>(
						<span 
							key={ i }
							onClick={ item.onClick }
							className={item.light? 'fixed_buttons_items light' : 'fixed_buttons_items'} 
							style={{width: 100 / props.options.length + '%' }}
						>
							{ item.name }
						</span>
					))
				}
			</div>
			<div className="fixed_buttons_brank"></div>
		</div>
	);
};

FixedButton.PropTypes = {
	options: PropTypes.array.isRequired

}

export default FixedButton;