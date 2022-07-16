import Message from "../components/Message";
import { Link } from "react-router-dom";
const NotFound = () => {
  document.title = "TennisWorld|Page Not Found";
  return (
    <Message variant="danger">
      The page you are looking for not found! <Link to="/">Go Back</Link>
    </Message>
  );
};
export default NotFound;
