import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AuthContext } from "../../shared/context/auth-context";
import Mod from "../../shared/components/UIElements/Mod";
import ImageUpload from "../../shared/components/FromElements/ImageUpload";

const AdItem = (props) => {
  const auth = useContext(AuthContext);

  return (
    <div
      class="card"
      style={{ margin: "20px", width: "300px" }}
    >
      {console.log(props.id)}
      <img
        src={`http://localhost:5000/${props.image}`}
        class="card-img-top"
        alt={props.title}
      />

      <div class="card-body">
        <h2 class="card-title center">{props.title}</h2>
        <h3 class="card-text center">{props.description}</h3>
        <p class="card-text center">{props.address}</p>
        {auth.userId === props.creatorId && (
          <Link to={`/ads/${props.id}`} class="btn center btn-primary">
            Edit
          </Link>
        )}
        {auth.userId === props.creatorId && (
          <Mod iid={props.id} del={props.onDelete} />
        )}
      </div>
    </div>
  );
};

export default AdItem;
