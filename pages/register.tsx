import React, { useState } from "react";
import Register from "@/components/User/Register";
import { User } from '../types/index';

const RegisterPage = () => {
  const [user, setUser] = useState<User>();
   

  return (
    <div>
      <Register />
    </div>
  );
};

export default RegisterPage;
