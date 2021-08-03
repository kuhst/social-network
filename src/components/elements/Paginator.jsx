import React, { useState } from "react";
import s from './Paginator.module.css';
import rightArrow from '../../assets/images/angleRightSolid.svg';
import leftArrow from '../../assets/images/angleLeftSolid.svg';

export const Paginator = ({ itemsCount, itemsCountOnPage, currentPage, onPageChanged }) => {
	let pageCount = Math.ceil(itemsCount / itemsCountOnPage);

	let pages = [];
	if (currentPage) {
		for (let i = 1; i <= pageCount; i++) {
			pages.push(i)
		}
	}
	let portionSize = 10;
	let portionCount = Math.ceil(pageCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(3);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	return <div className={s.container}>

		<button onClick={() => setPortionNumber(--portionNumber)} className={s.button}>
			{portionNumber > 1 && <img src={leftArrow} alt='leftArrow' />}
		</button>
		<div className={s.pages}>
			{pages
				.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
				.map(p => <span className={p === currentPage ? s.currentPage : ''}
					onClick={() => { onPageChanged(p) }} key={p}>{p}</span>)}
		</div>
		<button onClick={() => setPortionNumber(++portionNumber)} className={s.button}>
			{portionNumber < portionCount && <img src={rightArrow} alt='rightArrow' />}
		</button>
	</div>
}

export default Paginator;