import * as actionTypes from './actionTypes'

export const requestVisits = token => dispatch => {
	dispatch({ type: actionTypes.REQUEST_VISITS_PENDING });
	fetch("https://api.ict.cu/visitors/api/v1/visitors", {
		headers: {
			"x-access-token": token
		}
	})
		.then(response => response.json())
		.then(data => {
			dispatch({
				type: actionTypes.REQUEST_VISITS_SUCCESS,
				payload: data.visitors
			})
		})
		.catch(err => dispatch({
			type: actionTypes.REQUEST_VISITS_FAILED,
			payload: err
		}));
};


export const saveVisits = (visits,token) => dispatch=>{
	dispatch({type: actionTypes.SAVE_VISITS_EDITED_PENDING})
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
			console.log(data)
			dispatch({
				type: actionTypes.SAVE_VISITS_EDITED_SUCCESS,
				payload: data.modificados
			})
		})
		.catch(err => dispatch({
			type: actionTypes.SAVE_VISITS_EDITED_FAIL,
			payload: err
		}));
}
