import React from 'react'
import { Suspense } from 'react'

function withSuspense<WSP>(Component: React.ComponentType<WSP>) {
	return (props: WSP) => {
		return (
			<Suspense fallback={<div>Loading...</div>}>
				<Component {...props} />
			</Suspense>
		)
	}
}

export default withSuspense
