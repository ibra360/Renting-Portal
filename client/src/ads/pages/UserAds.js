import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpiner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import AdList from "../components/AdList";

const UserAds = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedAds, setLoadedAds] = useState();

  const userId = useParams().userId;
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/ads/user/${userId}`
        );
        setLoadedAds(responseData.ads);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAds();
  }, [sendRequest, userId]);

  const adDeletedHandler = (deletedAdId) => {
    setLoadedAds((prevAds) => prevAds.filter((ad) => ad.id !== deletedAdId));
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpiner />
        </div>
      )}
      {!isLoading && loadedAds && (
        <AdList items={loadedAds} onDeleteAd={adDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserAds;
