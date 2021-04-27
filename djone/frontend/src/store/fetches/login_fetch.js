
import { baseUrlLocal, baseUrlServer, headers } from "../constants";



const loginFetch = async (email, password, history, dispatch, action) => {
    const config = {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {
          'Content-type': 'application/json',
        }
      }; 
    
    const data = await fetch(`${ baseUrlServer }auth/token/`, config);
    const response = await data.json();
    const token = response.access;
    dispatch(action(token));
    localStorage.setItem("token", token);
    history.push('/demo/start');
}

export default loginFetch;
