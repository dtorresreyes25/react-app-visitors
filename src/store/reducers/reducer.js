import  * as actionTypes  from '../actions/'

const initialState={
	isPending: false,
	visits: [],
	error: '',
	isUpdatingVisit: false,
	isVisitUpdated: '',
	errorOnUpdate:''
}

export const visitsReducer =(state=initialState, action={})=>{
	switch(action.type){
		case actionTypes.REQUEST_VISITS_PENDING:
			return {...state, isPending: true} 
		case actionTypes.REQUEST_VISITS_SUCCESS:
			return {...state, isPending: false, visits: action.payload}
		case actionTypes.REQUEST_VISITS_FAILED:
			return {...state, isPending: false, error: action.payload}	
		case actionTypes.SAVE_VISITS_EDITED_PENDING:
			return {...state, isUpdatingVisit: true}	
		case actionTypes.SAVE_VISITS_EDITED_SUCCESS:
			return {...state, isUpdatingVisit: false, errorOnUpdate: false, isVisitUpdated: action.payload}	
		case actionTypes.SAVE_VISITS_EDITED_FAIL:
			return {...state, isUpdatingVisit: false, errorOnUpdate: action.payload}	
		default:
			return state		
	}
}


