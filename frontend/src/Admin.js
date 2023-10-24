import {useEffect, useState} from "react";
import axios from "axios";
import User from "./User";

function Admin() {
    const [tableData, setTableData] = useState([]);
    const [changeRole, setChangeRole] = useState(0);
    const [deleteCount, setDeleteCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8801/admin')
            .then(res => {
                setTableData(res.data);
            })
            .catch(err => console.log(err))
    }, [changeRole, deleteCount]);

    const handleRoleChange = (userId, userRole) => {
        // Відправити запит до сервера для зміни ролі користувача
        axios.post(`http://localhost:8801/admin/changeRole`, { id: userId, role: userRole })
            .then((res) => {
                setChangeRole(changeRole + 1);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (userId) => {
        axios.post(`http://localhost:8801/admin/delete`, { id: userId })
            .then((res) => {
                setDeleteCount(deleteCount + 1);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <User />
            <h3>Information about all users</h3>
            <table className="table table-success">
                <thead>
                <tr className="">
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Change button</th>
                    <th scope="col">Delete button</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((item) => (
                    <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                            <button className="btn btn-secondary" onClick={() => handleRoleChange(item.id, item.role)}>Change role</button>
                        </td>
                        <td>
                            <button className="btn btn-secondary" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Admin;