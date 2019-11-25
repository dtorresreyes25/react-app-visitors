import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useAuth} from '../../context/auth'



const RouteWithLayout = props => {
  const auth = useAuth()
  const { layout: Layout, component: Component, privateRoute , publicRoute, ...rest } = props;

  return (
    <>
    <Route
      {...rest}

      render={matchProps =>
           
      privateRoute ? auth.authSession ? 
                              (<Layout userSession={auth} >
                                <Component {...matchProps}  userSession={auth} />
                              </Layout>)
                             : <Redirect to="/sign-in" />
          : publicRoute
                   ? rest.restricted ? (
                                          auth.authSession ? <Redirect to="/" />
                                          
                                                           : (
                                                                <Layout>
                                                                    <Component {...matchProps} userSession={auth} />
                                                                </Layout>
                                                             )
                                       ) 
                                      : (
                                          <Layout>
                                              <Component {...matchProps} userSession={auth}/>
                                          </Layout>
                                        )
                   : (
                       <Redirect to="/sign-in" />
                      )
       
          
      }
    />
        
        </>
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string

};

export default RouteWithLayout;
