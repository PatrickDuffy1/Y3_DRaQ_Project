import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUserUsername, setCurrentUserUsername] = useState('');
  const [currentUserPassword, setCurrentUserPassword] = useState('');

  const setCredentials = (username, password) => {
    setCurrentUserUsername(username);
    setCurrentUserPassword(password);
  };

  return (
    <AuthContext.Provider value={{ currentUserUsername, currentUserPassword, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
