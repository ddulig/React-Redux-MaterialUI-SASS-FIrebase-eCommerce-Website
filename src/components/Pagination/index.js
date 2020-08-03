import React, { useState, useEffect } from 'react';

//styles
import './styles.scss';
import { Pagination as MUIPagination } from '@material-ui/lab';

const Pagination = props => {
	const { itemsPerPage } = props;
	const items = props.children;

	const [renderItems, setRenderItems] = useState([]);
	const [renderPagination, setRenderPagination] = useState();

	useEffect(
		() => {
			setDisplay(1);
		},
		// eslint-disable-next-line
		[items]
	);

	const handleClick = id => {
		setDisplay(id);
	};

	const setDisplay = currentPage => {
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

		setRenderItems(currentItems);

		const totalPages = Math.ceil(items.length / itemsPerPage);
		setRenderPagination(
			<MUIPagination
				count={totalPages}
				page={currentPage}
				color='secondary'
				onChange={(event, value) => handleClick(value)}
				showFirstButton
				showLastButton
			/>
		);
	};

	return (
		<>
			{renderItems}
			<div className='pagination'>{renderPagination}</div>
		</>
	);
};

export default Pagination;
