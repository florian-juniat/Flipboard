import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth";

function PrivateRoute({ component: Component,layout: Layout,...rest }) {
  const { authToken } = useAuth();
  return(
    <Route {...rest} render={(props) => (
      authToken ? (
        <Layout {...props}>
            <Component {...props} />
        </Layout>
        ) : (
          <Redirect to="/auth" />
        )
    )}
    />
  );
}

export default PrivateRoute;