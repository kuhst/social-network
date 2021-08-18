export const objectsHelper = (items: any, action: any, objPropName: any, newObjProps: any) => {
	return items.map((u: any) => (u[objPropName] === action) ? { ...u, ...newObjProps } : u)
}