
const updateObject=(state,newData)=>{
	return{
		...state,
		...newData
	}
}

export default updateObject