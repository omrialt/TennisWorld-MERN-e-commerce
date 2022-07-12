import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listArticlesDetails,
  updateArticle,
} from "../store/Articles/articleActions";
import { ARTICLE_UPDATE_RESET } from "../store/Articles/articleConstants";
import UseValid from "../hooks/use-valid";
import Input from "../utils/Input";

const ArticleEditScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState("");

  const { id } = useParams();

  const {
    value: enteredTitle,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    isValid: enteredTitleIsValid,
    inputBlurHandler: titleInputBlurHandler,
    setEnteredValue: setTitleValueHandler,
  } = UseValid((value) => value.length >= 3);

  const {
    value: enteredSummary,
    hasError: summaryInputHasError,
    valueChangeHandler: summaryChangeHandler,
    isValid: enteredSummaryIsValid,
    inputBlurHandler: summaryInputBlurHandler,
    setEnteredValue: setSummaryValueHandler,
  } = UseValid((value) => value.length >= 15);

  const {
    value: enteredText,
    hasError: textInputHasError,
    valueChangeHandler: textChangeHandler,
    isValid: enteredTextIsValid,
    inputBlurHandler: textInputBlurHandler,
    setEnteredValue: setTextValueHandler,
  } = UseValid((value) => value.length >= 30);

  const {
    value: enteredCreatedBy,
    hasError: createdByInputHasError,
    valueChangeHandler: createdByChangeHandler,
    isValid: enteredCreatedByIsValid,
    inputBlurHandler: createdByInputBlurHandler,
    setEnteredValue: setCreatedByValueHandler,
  } = UseValid((value) => value.length >= 3);

  //get product detail
  const articleDetail = useSelector((state) => state.articleDetail);
  const { loading, error, article } = articleDetail;

  //update product detail
  const articleUpdate = useSelector((state) => state.articleUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = articleUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateArticle({
        _id: id,
        title: enteredTitle,
        summary: enteredSummary,
        image,
        text: enteredText,
        createdBy: enteredCreatedBy,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (err) {
      setUploading(false);
    }
  };

  const titleInputClasses = titleInputHasError ? "invalid" : "";
  const summaryInputClasses = summaryInputHasError ? "invalid" : "";
  const textInputClasses = textInputHasError ? "invalid" : "";
  const createdByInputClasses = createdByInputHasError ? "invalid" : "";

  let isValid = false;

  if (
    enteredTitleIsValid &&
    enteredSummaryIsValid &&
    enteredTextIsValid &&
    enteredCreatedByIsValid
  ) {
    isValid = true;
  }

  useEffect(() => {
    document.title = "Proshop|Edit Article";
    if (successUpdate) {
      dispatch({ type: ARTICLE_UPDATE_RESET });
      navigate("/admin/articlelist");
    } else {
      if (!article.title || article._id !== id) {
        dispatch(listArticlesDetails(id));
      } else {
        setTitleValueHandler(article.title);
        setSummaryValueHandler(article.summary);
        setTextValueHandler(article.text);
        setCreatedByValueHandler(article.createdBy);

        setImage(article.image);
      }
    }
  }, [
    dispatch,
    id,
    article,
    successUpdate,
    navigate,
    setCreatedByValueHandler,
    setSummaryValueHandler,
    setTextValueHandler,
    setTitleValueHandler,
  ]);

  return (
    <Fragment>
      <Link to="/admin/articlelist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit {article.title} Details</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Input
              className={titleInputClasses}
              controlId="title"
              label="Title"
              type="text"
              value={enteredTitle}
              onInputFn={titleChangeHandler}
              onBlurFn={titleInputBlurHandler}
              errorTernary={titleInputHasError}
              errorText="must be at least 3 characters"
            />

            <FormGroup controlId="image">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              ></FormControl>
              <FormControl
                controlId="image"
                type="file"
                label="Choose file"
                accept=".jpg,.jpeg,.png"
                onChange={uploadFileHandler}
              ></FormControl>
              {uploading && <Loader />}
            </FormGroup>
            <Input
              className={summaryInputClasses}
              controlId="summary"
              label="Summary"
              type="text"
              value={enteredSummary}
              onInputFn={summaryChangeHandler}
              onBlurFn={summaryInputBlurHandler}
              errorTernary={summaryInputHasError}
              errorText="must be at least 15 characters"
              controlType="textarea"
            />
            <Input
              className={createdByInputClasses}
              controlId="createdBy"
              label="Created By"
              type="text"
              value={enteredCreatedBy}
              onInputFn={createdByChangeHandler}
              onBlurFn={createdByInputBlurHandler}
              errorTernary={createdByInputHasError}
              errorText="must be at least 3 characters"
            />
            <Input
              className={textInputClasses}
              controlId="text"
              label="Text"
              type="text"
              value={enteredText}
              onInputFn={textChangeHandler}
              onBlurFn={textInputBlurHandler}
              errorTernary={textInputHasError}
              errorText="must be at least 30 characters"
              controlType="textarea"
            />
            <Button
              disabled={!isValid}
              className="my-3"
              type="submit"
              variant="primary"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};
export default ArticleEditScreen;
