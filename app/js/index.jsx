import React from 'react';
import ReactDom from 'react-dom';
import '../style/style.scss'
var BoardBuilder = React.createClass({
	setActive:function(i){
		var refID = this.refs['item'+i];
		if(refID.classList.contains('live')){
			refID.classList.remove('live');
			refID.classList.add('dead');
		} else {
			refID.classList.remove('dead');
			refID.classList.add('live')
		}
		// console.log(this.state.start);
	},
	render:function(){
		var width = this.props.width;
		var height = this.props.height;
		var cells = [];
		// console.log('is set = ',this.props.SetC);
		if(this.props.SetC){
			for (var i=1;i<=(width*height);i++){
				var click=this.setActive.bind(this,i);
				var classAdd;
				if(this.refs['item'+i].classList.contains('live')){
					//for live cell
					if(i%width==1){
						//cell needed to clear
						classAdd = 'live clear'
					} else {
						//cell not needed to clear
						classAdd = 'live'
					}
				} else {
					//for dead cell
					if(i%width==1){
						//cell needed to clear
						classAdd = 'dead clear'
					} else {
						//cell not needed to clear
						classAdd = 'dead'
					}
				}
				cells.push(
					<div className={classAdd} ref={'item'+i} onClick={click}></div>
				);
			}
		} else {
		if(this.props.Step){
			for(var i=1;i<=width*height;i++){
				// var click=this.setActive.bind(this,i);
				var classAdd;
				var i = Number(i);
				var width = Number(width);
				var height = Number(height);
				var liveNeigh=0;
				var row=[];
				row[0] = i-width <= 0 ? (width*height)+(i-width):i-width;
				row[1] = i;
				row[2] = i+width > width*height ? (i+width)-(width*height): i+width;
					for(var j=0;j<3;j++){
						if(j!==1){
							//if j=0 || 2
							if(row[j]%width<2){
								if(row[j]%width==1){
									var first = row[j]+(width-1);
									var second = row[j];
									var third = row[j]+1;
									this.refs['item'+first].classList.contains('live') ? liveNeigh++:liveNeigh;
									this.refs['item'+second].classList.contains('live') ? liveNeigh++:liveNeigh;
									this.refs['item'+third].classList.contains('live') ? liveNeigh++:liveNeigh;
									// console.log(first,second,third);
								} else {
									//right edge
									var third = row[j]-(width-1);
									var second = row[j];
									var first = row[j]-1;
									this.refs['item'+first].classList.contains('live') ? liveNeigh++:liveNeigh;
									this.refs['item'+second].classList.contains('live') ? liveNeigh++:liveNeigh;									
									this.refs['item'+third].classList.contains('live') ? liveNeigh++:liveNeigh;
									// console.log(first,second,third);
								}
							} else {
								var first = row[j]-1;
								var second = row[j];
								var third = row[j]+1;
								this.refs['item'+first].classList.contains('live') ? liveNeigh++:liveNeigh;
								this.refs['item'+second].classList.contains('live') ? liveNeigh++:liveNeigh;
								this.refs['item'+third].classList.contains('live') ? liveNeigh++:liveNeigh;
								// console.log(first,third);
							}
						} else {
							//if j=1 
							if(row[j]%width<2){
								if(row[j]%width==1){
									var first = row[j]+(width-1);
									var third = row[j]+1;
									this.refs['item'+first].classList.contains('live') ? liveNeigh++:null;
									this.refs['item'+third].classList.contains('live') ? liveNeigh++:null;
									// console.log(first,third);
								} else {
									//right edge
									var third = row[j]-(width-1);
									var first = row[j]-1;
									this.refs['item'+first].classList.contains('live') ? liveNeigh++:null;
									this.refs['item'+third].classList.contains('live') ? liveNeigh++:null;
									// console.log(first,third);
								}
							} else {
								var first = row[j]-1
								var third = row[j]+1;
								this.refs['item'+first].classList.contains('live') ? liveNeigh++:null;
								this.refs['item'+third].classList.contains('live') ? liveNeigh++:null;
								// console.log(first,third);
							}
						}
					}
				if(this.refs['item'+i]!==undefined && this.refs['item'+i].classList.contains('live')){
					//populated cell
					if(liveNeigh==2 || liveNeigh==3){
						if(i%width==1){
							classAdd='live clear';
							// this.refs['item'+i].className='live clear';
						} else {
							classAdd='live';
							// this.refs['item'+i].className='live';
						}
					} else {
						// console.log('populated to remove',liveNeigh,i);
						// console.log(this.refs['item'+i].classList);
						if(i%width==1){
							classAdd='dead clear';
							// this.refs['item'+i].className='dead clear';
						} else {
							classAdd='dead';
							// this.refs['item'+i].className='dead';
							// console.log(liveNeigh,'is to be dead');
							// console.log(this.refs['item'+i].className);
						}						
					}
				} else {
					//unpopulated cell
					if(liveNeigh==3){
						if(i%width==1){
							classAdd='live clear';
							// this.refs['item'+i].className='live clear';
						} else {
							classAdd='live';
							// this.refs['item'+i].className='live';
						}
					} else {
						if(i%width==1){
							classAdd='dead clear';
							// this.refs['item'+i].className='dead clear';
						} else {
							classAdd='dead';
							// this.refs['item'+i].className='dead';
						}								
					}
				}
				cells.push(
					<div className={classAdd} ref={'item'+i}></div>
				);
			}
		} else {
			if(this.props.Random){
				for (var i=1;i<=(width*height);i++){
					var click=this.setActive.bind(this,i);
					var classAdd;
					if(Math.random()<=0.2){
						if(i%width==1){
							classAdd='live clear';
						} else {
							classAdd='live';
						}
					} else {
						if(i%width==1){
							classAdd='dead clear';
						} else {
							classAdd='dead';
						}
					}
					cells.push(
						<div className={classAdd} ref={'item'+i} onClick={click}></div>
					);
				}
			} else {
				for (var i=1;i<=(width*height);i++){
					var click=this.setActive.bind(this,i);
					var classAdd = i%width==1 ? 'dead clear' : 'dead';
					if(this.refs['item'+i]!==undefined){
						this.refs['item'+i].classList.add('dead');
						this.refs['item'+i].classList.remove('live');
					}
					cells.push(
						<div className={classAdd} ref={'item'+i} onClick={click}></div>
					);
				}
			}
		}			
		} 	
		return (
			<div>
				<div className='board'>
					{this.props.SetC ? cells:cells}
				</div>
			</div>
		);
	}
});
var GameOfLife = React.createClass({
	getInitialState() {
	    return {
	        width:100,
	        height:22,  
	        speed:-1,
	        gen:0,
	        isRandom:true,
	        step:false,
	        isSet:false,
	    };
	},
	componentDidMount() {
	    this.start();
	},
	changeSize:function(){
		this.setState({
			width:this.refs.width.value<=100 && this.refs.width.value>=10 ? this.refs.width.value : 10,
			height:this.refs.height.value<=100 && this.refs.height.value>=10 ? this.refs.height.value :10,
		});
	},
	changeSpeed:function(){
		this.setState({
			speed:this.refs.speed.value,
			isRandom:false,
			isSet:false,
		});
		clearInterval(this.interval);
	},
	random:function(){
		this.setState({
			isRandom:true,
			step:false,
			gen:0,
			isSet:false,
		});
		clearInterval(this.interval);	
	},
	clear:function(){
		this.setState({
			isRandom:false,
			step:false,
			isSet:false,
		});
		clearInterval(this.interval);
	},
	step:function(){
		this.setState({
			step:true,
			isRandom:false,
			gen:this.state.gen+1,
			isSet:false,
		});
	},
	stop:function(){
		this.setState({
			step:false,
			isRandom:false,
			gen:0,
			isStarted:false,
			isSet:false,
		});
		clearInterval(this.interval);
	},
	start:function(){
		clearInterval(this.interval);
		this.setState({isSet:true});
		this.interval = setInterval(this.step,-this.state.speed);
	},
	pause:function(){
		clearInterval(this.interval);
		this.setState({isSet:false});
	},
	render:function(){
		return (
			<div>
				<h1><a href="./">Game of Life</a></h1>
				<p className='gen'>{this.state.gen}</p>
				<BoardBuilder width={this.state.width} height={this.state.height} Random={this.state.isRandom} Step={this.state.step} SetC={this.state.isSet}/>
				<div className='control'>
					<button onClick={this.start}>Start</button>
					<button onClick={this.stop}>Stop</button>
					<button onClick={this.clear}>Clear</button>
					<button onClick={this.pause}>Pause</button>
					<button onClick={this.random}>Random</button>
				</div>
				<div className='control'>
					<input type="number" min='10' max='100' ref='width' value={this.state.width} onChange={this.changeSize}/>
					<input type="number" min='10' max='100' ref='height' value={this.state.height} onChange={this.changeSize}/>
				</div>
				<div className="control">
					<input type="range" min='-1000' max='1' ref='speed' value={this.state.speed} step='1' onChange={this.changeSpeed}/>
				</div>
			</div>
		);
	}
});
ReactDom.render(<GameOfLife/>,document.body);