import React, { useState } from 'react';
import { useUser } from '../components/Context/UserContext';
import AddShipping from '../components/User/AddShipping';


const addshipping = () => {
    const [shippingAddress, setShippingAddress] = useState();
    const { user } = useUser();
    

return (
    <AddShipping  />
  );
};

export default addshipping