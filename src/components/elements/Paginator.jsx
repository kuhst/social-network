import React from "react";
import s from './Paginator.module.css';

export const Paginator = ({ itemsCount, itemsCountOnPage, currentPage, onPageChanged }) => {
	let pageCount = Math.ceil(itemsCount / itemsCountOnPage);
	pageCount = pageCount > 20 ? 20 : pageCount;

	let pages = [];
	if (currentPage) {
		for (let i = 1; i <= pageCount; i++) {
			pages.push(i)
		}
	}
	pages = pages.map(p => <span className={p === currentPage ? s.currentPage : ''}
		onClick={() => { onPageChanged(p) }} key={p}>{p}</span>)
	return <>
		{pages}
	</>
}

export default Paginator;