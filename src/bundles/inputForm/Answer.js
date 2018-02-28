import React, {Component} from 'react';

export class Answer extends Component{
	render(){
		console.log(this.props.way);
		return(
			<div>
				{this.props.way}
			</div>
			);
	}
}

