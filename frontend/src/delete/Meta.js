import { Helmet } from "react-helmet";

const Meta = ({ title, description, keyword }) => {
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description}></meta>
    <meta name="keyword" content={keyword}></meta>
  </Helmet>;
};

export default Meta;
