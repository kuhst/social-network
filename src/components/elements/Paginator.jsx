import React, { useState } from "react";
import s from './Paginator.module.css';

export const Paginator = ({ itemsCount, itemsCountOnPage, currentPage, onPageChanged }) => {
	let pageCount = Math.ceil(itemsCount / itemsCountOnPage);

	let pages = [];
	if (currentPage) {
		for (let i = 1; i <= pageCount; i++) {
			pages.push(i)
		}
	}
	let portionSize = 20;
	let portionCount = Math.ceil(pageCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	return <>
		{portionNumber > 1 &&
			<button onClick={() => setPortionNumber(--portionNumber)}>back</button>}
		{pages
			.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
			.map(p => <span className={p === currentPage ? s.currentPage : ''}
				onClick={() => { onPageChanged(p) }} key={p}>{p}</span>)}
		{portionNumber < portionCount &&
			<button onClick={() => setPortionNumber(++portionNumber)}>forward</button>}
	</>
}

export default Paginator;