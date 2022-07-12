import { useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { LinkContainer } from "react-router-bootstrap";
import {
  listArticles,
  deleteArticle,
  createArticle,
} from "../store/Articles/articleActions";
import { ARTICLE_CREATE_RESET } from "../store/Articles/articleConstants";

const ArticleListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get article list
  const articlesList = useSelector((state) => state.articlesList);
  const { loading, error, articles } = articlesList;

  //get article delete
  const articleDelete = useSelector((state) => state.articleDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = articleDelete;

  //get article create
  const articleCreate = useSelector((state) => state.articleCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    article: createdArticle,
  } = articleCreate;

  //get user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "The article will delete from the server!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "The Article has been deleted.", "success");
        dispatch(deleteArticle(id));
      }
    });
  };

  const createProductHandler = () => {
    dispatch(createArticle());
  };

  useEffect(() => {
    document.title = "Proshop|Article List";
    dispatch({ type: ARTICLE_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/article/${createdArticle._id}/edit`);
    } else {
      dispatch(listArticles());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdArticle,
  ]);

  return (
    <Fragment>
      <Row>
        <Col md={9}>
          <h1>Articles</h1>
        </Col>
        <Col md={3}>
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Article
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped borders hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => {
              return (
                <tr key={article._id}>
                  <td>{article._id}</td>
                  <td>{article.title}</td>
                  <td>{article.createdBy}</td>
                  <td>
                    {" "}
                    {article.updatedAt.substring(0, 10)}{" "}
                    {article.updatedAt.substring(11, 16)}
                  </td>

                  <td>
                    <LinkContainer to={`/admin/article/${article._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(article._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                    <LinkContainer to={`/magazine/${article._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
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
export default ArticleListScreen;
