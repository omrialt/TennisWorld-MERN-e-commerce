import { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listArticles } from "../store/Articles/articleActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Article from "../components/Article";

const MagazineScreen = () => {
  const dispatch = useDispatch();

  const articlesList = useSelector((state) => state.articlesList);
  let { loading, error, articles } = articlesList;
  console.log(articlesList);

  useEffect(() => {
    document.title = "Proshop|Magazine";
    dispatch(listArticles());
  }, [dispatch]);

  return (
    <Fragment>
      <h1>Latest articles</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {articles.map((article) => (
            <Col key={article._id} sm={12} md={12} lg={12} xl={12}>
              <Article article={article} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};
export default MagazineScreen;
