import React from "react";
import { Suspense } from "react";


const withSuspense = (Component) => {
	return (props) => {
		return (
			<Suspense fallback={<div>Загрузка...</div>}>
				<Component {...props} />
			</Suspense>
		)
	}
}

export default withSuspense;