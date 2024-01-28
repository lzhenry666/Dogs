import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const userId = data?.id;
  console.log(`🚀 ~ file: UserContext.jsx:14 ~ UserStorage ~ userId:`, userId);

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
    console.log('logout');
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    return json;
  }

  async function userLogin(username, password) {

    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      console.log(`🚀 ~ file: UserContext.jsx:31 ~ userLogin ~ password:`, password);
       console.log(`🚀 ~ file: UserContext.jsx:31 ~ userLogin ~ username:`, username);
      const tokenRes = await fetch(url, options);
      //console.log(`🚀 ~ file: UserContext.jsx:36 ~ userLogin ~ tokenRes:`, tokenRes);
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      //console.log(`🚀 ~ file: UserContext.jsx:39 ~ userLogin ~ token:`, token);
      window.localStorage.setItem('token', token);

     let a = await getUser(token);
     ///console.log(`🚀 ~ file: UserContext.jsx:42 ~ userLogin ~ a:`, a);
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  const updateUser = (newData) => {
    setData(newData);
  };

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login,userId,updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
