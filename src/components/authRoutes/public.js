import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {useAuth} from '../../context/auth'

export default function PublicRoute(props){

	const {component:Comp,...rest} = props
	const { authTokens } = useAuth();

	return(
			<Route {...rest} component={(props)=>(

				rest.restricted?

					authTokens?

						<Redirect to='/' />
					: 
					<Comp {...props}  /> 
				:
				<Comp {...props}  />
			)}/>
		)
}
