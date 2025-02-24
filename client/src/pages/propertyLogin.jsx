import React from 'react'
import PropertyLoginPage from '../components/Property/PropertyLoginPage'
import { useSelector } from 'react-redux';

const propertyLogin = () => {

    const navigate = useNavigate();
    const { isAgent,isLoading } = useSelector((state) => state.agent);
  
    useEffect(() => {
      if(isAgent === true){
        navigate(`/dashboard`);
      }
    }, [isLoading,isAgent])

  return (
    <div>
        <PropertyLoginPage />
    </div>
  )
}

export default propertyLogin