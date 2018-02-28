import React,{Component} from 'react';

export class Field extends Component{
	render(){
		var s = this.props.field;
		var l = Math.sqrt(s.length);
		var matrix = [];
		for(let i = 0; i < l; i++){
			matrix[i] = s.slice(i * l, i *l + l ).split('');
		}
		console.log(this.props.paint);
		return (
			<div>
				<table className="table-bordered table-dark">
					<tbody>
						{matrix.map((row, ind) => <tr key={ind}>{row.map((cell,i) => <td key={i} className={'text-center ' + (this.props.paint && this.props.paint[ind][i] ? 'green' : '')}>{cell}</td> )}</tr>)}
					</tbody>					
				</table>
			</div>
			);

	}
}


