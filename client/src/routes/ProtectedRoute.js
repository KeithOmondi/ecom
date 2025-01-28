import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
const { loading, isAuthenticated} = useSelector((state) => state.user);
if(loading === false){
    if(!isAuthenticated){
        return <Navigate to='/login' replace />
    }

    return children;
}

  
}
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;