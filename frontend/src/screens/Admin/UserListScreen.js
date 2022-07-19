import { useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  listUsers,
  deleteUser,
  updateUser,
} from "../../store/Users/userActions";
const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get users list
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  //get user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //delete user
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const toggleAdminHandler = (id, isAdmin) => {
    if (userInfo._id === id) {
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: isAdmin
          ? "You gonna delete this user from admin credentials"
          : "You gonna make this user admin",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${
          isAdmin ? "Delete him from being an admin" : "Make him admin"
        }!`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Success!",
            `The user ${isAdmin ? "isn`t" : "is"} admin now.`,
            "success"
          );
          dispatch(
            updateUser({
              _id: id,
              isAdmin: !isAdmin,
            })
          );
          dispatch(listUsers());
          dispatch(listUsers());
        }
      });
    }
  };

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The user will deleted from the server!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        dispatch(deleteUser(id));
      }
    });
  };

  useEffect(() => {
    document.title = "TennisWorld|Users List";
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  return (
    <Fragment>
      <h1>
        Users <i className="fa fa-users" aria-hidden="true"></i>
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped borders hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        onClick={() =>
                          toggleAdminHandler(user._id, user.isAdmin)
                        }
                        style={{ color: "green" }}
                        className="fas fa-check"
                      ></i>
                    ) : (
                      <i
                        onClick={() =>
                          toggleAdminHandler(user._id, user.isAdmin)
                        }
                        style={{ color: "red" }}
                        className="fas fa-times"
                      ></i>
                    )}
                  </td>
                  <td>
                    <Button
                      disabled={user._id === userInfo._id}
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};
export default UserListScreen;
