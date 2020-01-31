import * as actionTypes from './actionTypes'

const requestVisitsPending = ()=>({ type: actionTypes.REQUEST_VISITS_PENDING })
const requestVisitsFailed = (err)=>({type: actionTypes.REQUEST_VISITS_FAILED,payload: err})
const requestVisitsSuccess = (data)=>({type: actionTypes.REQUEST_VISITS_SUCCESS, payload: data.visitors })


export const requestVisits = token => dispatch => {
	dispatch(requestVisitsPending());
	fetch("https://api.ict.cu/visitors/api/v1/visitors", {
		headers: {
			"x-access-token": token
		}
	})
		.then(response => response.json())
		.then(data => {
			if(data.message){
				throw Error(data.message)
			}
			dispatch(requestVisitsSuccess(data))
		})
		.catch(err => dispatch(requestVisitsFailed(err)));
};

const saveVisitsEditedPending = ()=>({type: actionTypes.SAVE_VISITS_EDITED_PENDING})
const saveVisitsEditedFailed = (err)=>({type: actionTypes.SAVE_VISITS_EDITED_FAIL, payload: err.message})
const saveVisitsEditedSuccess = (data)=>({type: actionTypes.SAVE_VISITS_EDITED_SUCCESS, payload: data.modificados === "1" ? true : false})

export const saveVisits = (token,visits) => dispatch=>{
	dispatch(saveVisitsEditedPending())
	fetch("https://api.ict.cu/visitors/api/v1/visitors", {
		method: 'PUT',
		headers: {
			"x-access-token": token,
			"Content-Type":"application/json"
		},
		body: JSON.stringify(visits)

	})
		.then(response => response.json())
		.then(data => {
			dispatch(saveVisitsEditedSuccess(data))
		})
		.catch(err => dispatch(saveVisitsEditedFailed(err)));
}

const addVisitPending = ()=>({type: actionTypes.ADD_VISIT_PENDING})
const addVisitFailed = (err)=>({type: actionTypes.ADD_VISIT_FAIL, payload: err.message})
const addVisitSuccess = (data)=>({type: actionTypes.ADD_VISIT_SUCCESS,payload: data._id ? true: false})


const postVisitToApi = (token, visits) =>{
		return fetch("https://api.ict.cu/visitors/api/v1/visitors", {
		method: 'POST',
		headers: {
			"x-access-token": token,
			"Content-Type":"application/json"
		},
		body: JSON.stringify(visits)
	})
}

export const addVisits = (token, visits) => dispatch =>{
	dispatch(addVisitPending())
	postVisitToApi(token, visits)
		.then(response => response.json())
		.then(data => {
			dispatch(addVisitSuccess(data))
		})
		.catch(err => dispatch(addVisitFailed(err)));
}

const cloneVisitPending = () =>({type: actionTypes.CLONE_VISIT_PENDING})
const cloneVisitFailed = (err) =>({type: actionTypes.CLONE_VISIT_FAIL, payload: err.message})
const cloneVisitSuccess = (data) =>({type: actionTypes.CLONE_VISIT_SUCCESS, payload: data._id ? true: false})

export const cloneVisit = (token, visit)=> dispatch =>{
	dispatch(cloneVisitPending())
	postVisitToApi(token, visit)
		.then(response => response.json())
		.then(data => {
			dispatch(cloneVisitSuccess(data))
		})
		.catch(err => dispatch(cloneVisitFailed(err)));
}



const removeVisitPending = ()=>({type: actionTypes.REMOVE_VISIT_PENDING})
const removeVisitFailed = (err)=>({type: actionTypes.REMOVE_VISIT_FAIL, payload: err.message})
const removeVisitSuccess = (data)=>({type: actionTypes.REMOVE_VISIT_SUCCESS, payload: (data.borrados ? true: false)})

export const removeVisits = (token,visitId) => dispatch =>{
	dispatch(removeVisitPending())
	fetch(`https://api.ict.cu/visitors/api/v1/visitors?id=${visitId}`, {
		method: 'DELETE',
		headers: {
			"x-access-token": token,
		},
	})
		.then(response => response.json())
		.then(data => {
			dispatch(removeVisitSuccess(data))
		})
		.catch(err => dispatch(removeVisitFailed(err)));
}
