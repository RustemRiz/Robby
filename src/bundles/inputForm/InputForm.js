import React, {Component} from 'react';
import {getCommands} from './getCommands';
import {Answer} from './Answer';
import {Field} from './Field';
import {WelcomeText} from './WelcomeText';

export default class InputForm extends Component{
	constructor(){
		super();
		this.field = '.S..##.T.';
		this.power = 10;
		this.state = {way: '', field : ''};

	}

	onChangeField(e){
		this.field = e.target.value;
	}

	onChangePower(e){
		this.power = e.target.value;
	}

	isFieldValid(){
		var r1=/^[.#]*S[.#]*T[.#]*$/;
		var r2=/^[.#]*T[.#]*S[.#]*$/;
		var l = Math.sqrt(this.field.length);
		return this.field.length == l*l && (this.field.match(r1) || this.field.match(r2));
	}

	isPowerValid(){
		return !(isNaN(this.power) || this.power < 0);
	}

	onBtnClick(){
		if(!this.isFieldValid()){
			alert('Карта должно содержать один символ "S", один символ "T", символы "." и "#". Также длина должна быть квадратом целого числа. Пожалуйста, введите корректные данные');
			return;
		}
		if(!this.isPowerValid()){
			alert('Количество топлива должно быть натуральным числом. Пожалуйста, введите корректные данные');
			return;
		}
		var way =  getCommands(this.field, this.power);
		if (way.length == 0){
			this.setState({way : 'Нет пути', field : this.field, paint: null});
		}
		else{
			this.setState({way : 'Команды для робота : ' + way[0].join(''), field : this.field, paint : way[1]});
			
		}
	}

	render(){
		return (
			<div>
				<WelcomeText/>
				<label>Карта<input type="text" onChange={this.onChangeField.bind(this)} defaultValue='' /></label> 
				<br/>				
				<label>Топливо<input type="text" onChange={this.onChangePower.bind(this)} defaultValue='10' /></label>
				<br/>		
				<button onClick={this.onBtnClick.bind(this)}>Рассчитать</button>
				<Field field={this.state.field} paint={this.state.paint} />		
				<Answer way={this.state.way}/>
			</div>
			);
	}
}


