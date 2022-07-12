import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../styles/article.css";

const Article = ({ article }) => {
  //user info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let widthPort = window.innerWidth;

  const imgAnimation = (id) => {
    document.querySelector(`.img_${id}`).classList.toggle("img_animation");
  };

  return (
    <Card className="my-3 p-3 rounded article_card">
      <Card.Title>
        <h3>{article.title}</h3>
      </Card.Title>
      <div className="article_img_x">
        <Link to={`/magazine/${article._id}`}>
          <Card.Img
            style={
              widthPort > 1000
                ? { border: "1px solid black", height: "25vh", width: "24vw" }
                : { border: "1px solid black", height: "30vh", width: "85vw" }
            }
            src={article.image}
            variant="top"
            className={`img_${article._id}`}
            onMouseEnter={() => imgAnimation(article._id)}
            onMouseLeave={() => imgAnimation(article._id)}
          />
        </Link>
      </div>
      <Card.Body>
        <Card.Text>
          <p>{article.summary}</p>
        </Card.Text>
        <div className="center_div">
          <Link to={`/magazine/${article._id}`}>
            <Card.Text>
              <strong>Read more..</strong>
            </Card.Text>
          </Link>
        </div>
        <Card.Text>
          <strong>
            Created By:{article.createdBy},{article.updatedAt.substring(0, 10)}
          </strong>
        </Card.Text>
        <div className="center_div_btn">
          <div className={`button_${article._id} div_btn`}>
            {userInfo?.isAdmin && (
              <Link
                to={`/admin/article/${article._id}/edit`}
                className="btn btn-primary my-3"
              >
                Edit Article
              </Link>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Article;
