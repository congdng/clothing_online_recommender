import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../../pieces/Message/Message';
import Loader from '../../../../pieces/Loader/Loader';
import { listUsers, deleteUser } from '../../../../actions/userActions';

const AdminUserListScreen = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history('/');
        }
    }, [dispatch, userInfo, history, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this user?')) {
            dispatch(deleteUser(id));
        }
    };
    return (
        <div className="grid">
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className="fas fa-check"></i>
                                    ) : (
                                        <i className="fa fa-times"></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}
                                    >
                                        <Button
                                            variant="primary"
                                            className="btn-sm"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => {
                                            deleteHandler(user._id);
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default AdminUserListScreen;
