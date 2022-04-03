import {useState} from "react";
import * as service from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [newUser, setNewUser] = useState({});
    const navigate = useNavigate();
    const signup = () =>
        service.register(newUser)
            .then(() => navigate('/home'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Signup</h1>
            <input className="mb-2 form-control"
                   placeholder="username"
                   onChange={(e) =>
                       setNewUser({...newUser,
                                      username: e.target.value})}/>
            <input className="mb-2 form-control"
                   placeholder="password"
                   onChange={(e) =>
                       setNewUser({...newUser,
                                      password: e.target.value})}/>
            <input className="mb-2 form-control"
                   placeholder="email"
                   onChange={(e) =>
                       setNewUser({...newUser,
                                      email: e.target.value})}/>
            <button className="btn btn-primary mb-5"
                    onClick={signup}>
                Signup</button>
        </div>
    );
}
export default Signup;