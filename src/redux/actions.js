import {
	REQUEST_VISITS_PENDING,
	REQUEST_VISITS_SUCCESS,
	REQUEST_VISITS_FAILED
} from "./constants.js";

export const requestVisits = token => dispatch => {
	dispatch({ type: REQUEST_VISITS_PENDING });
	fetch("https://api.ict.cu/visitors/api/v1/visitors", {
		headers: {
			"x-access-token": token
		}
	})
		.then(response => response.json())
		.then(data => {
			dispatch({
				type: REQUEST_VISITS_SUCCESS,
				payload: data.visitors
			})
		})
		.catch(err => dispatch({
			type: REQUEST_VISITS_FAILED,
			payload: err
		}));
};
