import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FromElements/Input";
import { Link } from "react-router-dom";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FromElements/ImageUpload";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./NewPlace.css";

const NewAd = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();
  const placeSubmitHandler = async (event) => {
    console.log("Clicked");
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("rent", formState.inputs.rent.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value); //ye image bkend se routes wali jagahs  name lia

      await sendRequest("http://localhost:5000/api/ads", "POST", formData);
      console.log(formState.inputs);
      history.push("/");
    } catch (err) {} // send this to the backend!
  };

  return (
    <form className="place-form">
      {isLoading && <LoadingSpiner asOverlay />}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please add a valid Title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        // element="input"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please add a valid description"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please add a valid address"
        onInput={inputHandler}
      />
      <Input
        id="rent"
        element="input"
        type="number"
        label="Rent"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please add a valid address"
        onInput={inputHandler}
      />
      {
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
      }
      <Link>
        <button
          onClick={placeSubmitHandler}
          disabled={!formState.isValid}
          class="btn btn-primary"
        >
          Create Ad
        </button>
      </Link>
    </form>
  );
};
export default NewAd;
