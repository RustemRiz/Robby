import React, {Component} from 'react';
import {getCommands} from './getCommands';
import {Answer} from './Answer.js';

export default class InputForm extends Component{
	constructor(){
		super();
		this.field = '';
		this.power = 0;
		console.log('constructor');
		this.state = {way: ''};
	}

	onChangeField(e){
		this.field = e.target.value;
	}

	onChangePower(e){
		this.power = e.target.value;
	}

	onBtnClick(){
		var way =  getCommands(this.field, this.power);
		if (way.length == 0){
			way = 'Нет пути';
		}
		this.setState({way : way});
	}

	render(){
		console.log('InputForm render');
		return (
			<div>
				<input type="text" onChange={this.onChangeField.bind(this)}/>				
				<input type="text" onChange={this.onChangePower.bind(this)}/>		
				<button onClick={this.onBtnClick.bind(this)}>Рассчитать</button>		
				<Answer way={this.state.way}/>
			</div>
			);
	}
}


