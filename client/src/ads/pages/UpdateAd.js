import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Input from "../../shared/components/FromElements/Input";

import LoadingSpiner from "../../shared/components/UIElements/LoadingSpinner";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdateAd = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedAds, setLoadedAds] = useState();

  const history = useHistory();

  const adId = useParams().adId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/ads/${adId}`
        );
        setLoadedAds(responseData.ad);
        setFormData(
          {
            title: {
              value: responseData.ad.title,
              isValid: true,
            },
            description: {
              value: responseData.ad.description,
              isValid: true,
            },
            rent: {
              value: responseData.ad.rent,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchAds();
  }, [sendRequest, adId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/ads/${adId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          rent: formState.inputs.rent.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/" + auth.userId + "ads");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpiner />
      </div>
    );
  }

  if (!loadedAds) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find this Ad</h2>
        </Card>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please add a valid Title"
        onInput={inputHandler}
        initialValue={loadedAds.title}
        initialValid={true}
      />
      <Input
        id="description"
        // type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please add a valid description"
        onInput={inputHandler}
        initialValue={loadedAds.description}
        initialValid={true}
      />
      <Input
        id="rent"
        type="text"
        label="Rent"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please add valid rent amount"
        onInput={inputHandler}
        initialValue={loadedAds.rent}
        initialValid={true}
      />
      <Link>
        <button
          onClick={placeUpdateSubmitHandler}
          disabled={!formState.isValid}
          class="btn btn-primary"
        >
          Update PLace
        </button>
      </Link>
    </form>
  );
};
export default UpdateAd;
