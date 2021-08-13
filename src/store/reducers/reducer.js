import  * as actionTypes  from '../actions/'
import {updateObject} from '../../helpers/'

// My initial state
const initialState={
	isPending: false,
	visits: [],
	error: '',
	isUpdatingVisit: false,
	isVisitUpdated: false,
	errorOnUpdate:'',
	isAddingVisit:'false',
	errorOnAdd:'',
	isVisitAdded: false,
	isVisitRemoved: false,
	errorOnRemove:'',
	isRemovingVisit:false,
	isVisitCloned: false,
	isCloningVisit: false,
	errorOnClone: '',

}

export const visitsReducer =(state=initialState, action={})=>{
	switch(action.type){
			//request visits
		case actionTypes.REQUEST_VISITS_PENDING:
			return updateObject(state,{isPending: true, isVisitAdded: false, isVisitUpdated:false , isVisitRemoved: false, isVisitCloned: false}) 
		case actionTypes.REQUEST_VISITS_SUCCESS:
			return updateObject(state,{isPending: false, visits: action.payload})
		case actionTypes.REQUEST_VISITS_FAILED:
			return updateObject(state,{isPending: false, error: action.payload})	
			//save visit
		case actionTypes.SAVE_VISITS_EDITED_PENDING:
			return updateObject(state,{isUpdatingVisit: true})	
		case actionTypes.SAVE_VISITS_EDITED_SUCCESS:
			return updateObject(state,{isUpdatingVisit: false, errorOnUpdate: false, isVisitUpdated: action.payload})	
		case actionTypes.SAVE_VISITS_EDITED_FAIL:
			return updateObject(state,{isUpdatingVisit: false, errorOnUpdate: action.payload})	
			//add visit
		case actionTypes.ADD_VISIT_PENDING:
			return updateObject(state,{isAddingVisit: true})	
		case actionTypes.ADD_VISIT_SUCCESS:
			return updateObject(state,{isAddingVisit: false, errorOnAdd: '', isVisitAdded: action.payload})	
		case actionTypes.ADD_VISIT_FAIL:
			return updateObject(state,{isAddingVisit: false, errorOnAdd: action.payload})
				//add visit
		case actionTypes.CLONE_VISIT_PENDING:
			return updateObject(state,{isCloningVisit: true})	
		case actionTypes.CLONE_VISIT_SUCCESS:
			return updateObject(state,{isCloningVisit: false, errorOnClone: '', isVisitCloned: action.payload})	
		case actionTypes.CLONE_VISIT_FAIL:
			return updateObject(state,{isCloningVisit: false, errorOnClone: action.payload})			
			//remove visit
		case actionTypes.REMOVE_VISIT_PENDING:
			return updateObject(state,{isRemovingVisit: true })	
		case actionTypes.REMOVE_VISIT_SUCCESS:
			return updateObject(state,{isRemovingVisit: false, errorOnRemove: false, isVisitRemoved: action.payload})	
		case actionTypes.REMOVE_VISIT_FAIL:
			return updateObject(state,{isRemovingVisit: false, errorOnRemove: action.payload})	
		default:
			return state		
	}
}


