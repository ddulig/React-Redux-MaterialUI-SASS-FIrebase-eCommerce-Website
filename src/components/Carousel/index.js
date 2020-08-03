import React, { Component } from 'react';

//styles
import './styles.scss';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class Carousel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isDown: false,
			didMove: false,
			startX: null,
			transLeftOffset: null
		};
		this.cRef = React.createRef();
	}

	componentDidMount() {
		const carouselContainer = this.cRef.current;
		const carousel = carouselContainer.children[1];
		const firstChild = carousel.firstChild.children[0];
		this.handleSnap(firstChild.offsetLeft);
	}

	//Mouse Up
	handleMouseUp = e => {
		this.handleSnap();
	};

	//Mouse Leave
	handleMouseLeave = e => {
		this.handleSnap();
	};

	// mouse Down
	handleMouseDown = e => {
		const carousel = this.cRef.current.children[1];

		e.persist();

		const _startX = e.pageX - carousel.offsetLeft;
		const _transLeftOffset = this.giveMeIntValOf(
			carousel.firstChild.style.transform
		);

		this.setState({
			isDown: true,
			startX: _startX,
			transLeftOffset: _transLeftOffset
		});
	};

	// mouse Move
	handleMouseMove = e => {
		const { isDown, startX, transLeftOffset } = this.state;
		const carousel = this.cRef.current.children[1];

		if (!isDown) return;

		e.preventDefault();

		this.setState({ didMove: true });
		const walk = e.pageX - startX;

		carousel.firstChild.style.cssText = `
			transform: translateX(${transLeftOffset + walk}px);
			transition: transform 0.5s cubic-bezier(.1, .5, 0.90, 1);
		`;
	};

	//On mouse up or leave
	handleSnap = threshold => {
		const carouselContainer = this.cRef.current;
		const carousel = carouselContainer.children[1];
		const buttonContainer = carouselContainer.firstChild.firstChild;
		const { didMove } = this.state;
		const marginEdges = carousel.offsetWidth * 0.15;
		let tempThresholdOffset = threshold;

		if (!tempThresholdOffset) {
			this.setState({ isDown: false });
			if (!didMove) return;
			this.setState({ didMove: false });

			tempThresholdOffset = this.giveMeIntValOf(
				carousel.firstChild.style.transform
			);
		}

		let xCoordinate = 0;
		const wrapperWidth = carousel.firstChild.offsetWidth;
		let children = [...carousel.firstChild.children];

		//if at the end of the carousel
		if (tempThresholdOffset * -1 > wrapperWidth - carousel.offsetWidth) {
			xCoordinate = (wrapperWidth - carousel.offsetWidth + marginEdges) * -1;

			//set forward arrow to disable
			this.enableDisableButtons([buttonContainer.children[1]], false);
		} else {
			const fullWidth = children[0].offsetWidth;
			const halfWidth = fullWidth / 2;

			for (let i = 0; i < children.length; i++) {
				xCoordinate = (children[i].offsetLeft - marginEdges) * -1;

				if (tempThresholdOffset + halfWidth > xCoordinate) {
					if (i === 0) {
						//set backward arrow to disable
						this.enableDisableButtons([buttonContainer.firstChild], false);
					} else {
						//set forward & backward arrow to enable
						this.enableDisableButtons([...buttonContainer.children], true);
					}

					break;
				}
			}
		}

		carousel.firstChild.style.cssText = `
        	transform: translateX(${xCoordinate}px);
			transition: transform 0.5s cubic-bezier(.1, .5, 0.90, 1);
		  `;
	};

	backwardClick = () => {
		this.arrowClick(false);
	};

	forwardClick = () => {
		this.arrowClick(true);
	};

	//arrow click
	arrowClick = forward => {
		console.log('click');

		const carousel = this.cRef.current.children[1];
		const children = [...carousel.firstChild.children];
		const fullWidth = children[0].offsetWidth;

		let threshold = this.giveMeIntValOf(carousel.firstChild.style.transform);
		threshold = forward ? threshold - fullWidth : threshold + fullWidth;

		this.handleSnap(threshold);
	};

	//helper functions
	giveMeIntValOf = el => {
		// extracting 20 from translateX(20px) and converting it to integer with parsInt
		return parseInt(el.replace('translateX(', '').replace('px)', ''), 10);
	};

	enableDisableButtons = (buttons, toEnable) => {
		buttons.forEach(button => {
			if (toEnable) {
				button.disabled = false;
				button.className = button.className.replace(' Mui-disabled', '');
			} else {
				button.disabled = true;
				button.className += ' Mui-disabled';
			}
		});
	};

	render() {
		return (
			<Box className='carouselContainer' ref={this.cRef}>
				<Box className='buttonContainer'>
					<Box className='buttons'>
						<IconButton color='primary' onClick={this.backwardClick}>
							<ArrowBackIosIcon />
						</IconButton>
						<IconButton color='primary' onClick={this.forwardClick}>
							<ArrowForwardIosIcon />
						</IconButton>
					</Box>
				</Box>
				<Box
					className='carousel'
					onMouseDown={this.handleMouseDown}
					onMouseUp={this.handleMouseUp}
					onMouseMove={this.handleMouseMove}
					onMouseLeave={this.handleMouseLeave}
				>
					<Box className='cWrapper'>{this.props.children}</Box>
				</Box>
			</Box>
		);
	}
}

export default Carousel;
