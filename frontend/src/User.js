import {useEffect, useState} from "react";
import axios from "axios";
import Validation from "./PasswordValidation";

function User() {
    const [values, setValues] = useState({
        password: '',
    });
    const [tableData, setTableData] = useState([]);
    const [changePassword, setChangePassword] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.post('http://localhost:8801/user')
            .then(res => {
                setTableData(res.data);
            })
            .catch(err => console.log(err))
    }, [changePassword]);

    const handlePasswordChange = (userId, newPassword) => {
        setErrors(Validation(values));
        console.log(errors)
        if(errors.password === "") {
            axios.post(`http://localhost:8801/admin/changePassword`, {id: userId, newPassword: newPassword})
                .then((res) => {
                    setChangePassword(changePassword + 1);
                })
                .catch((err) => console.log(err));
        }
    }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <h3>Information about current user</h3>
            <table className="table table-success">
                <thead>
                <tr className="">
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Password</th>
                    <th scope="col">Change Input</th>
                    <th scope="col">Change button</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((item) => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>{item.password}</td>
                        <td>
                            <input type="password" placeholder="Enter new password" id="password" name="password"
                                   onChange={(e) => setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))}
                                   className="form-control"/>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </td>
                        <td>
                            <button className="btn btn-secondary"
                                    onClick={() => handlePasswordChange(item.id, values.password)}>Change password
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default User;