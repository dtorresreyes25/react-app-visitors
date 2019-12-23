import {
	REQUEST_VISITS_PENDING,
	REQUEST_VISITS_SUCCESS,
	REQUEST_VISITS_FAILED
} from "./constants.js";

const initialState={
	isPending: false,
	visits: [],
	error: ''
}

export const requestVisits =(state=initialState, action={})=>{
	switch(action.type){
		case REQUEST_VISITS_PENDING:
			return {...state, isPending: true} 
		case REQUEST_VISITS_SUCCESS:
			return {...state, isPending: false, visits: action.payload}
		case REQUEST_VISITS_FAILED:
			return {...state, isPending: false, error: action.payload}	
		default:
			return state		
	}
}