import React from "react";
import Card from "../../shared/components/UIElements/Card";

import "./UsersList.css";

import UsersItem from "./UserItem";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>NO USERS FOUND</Card>;
      </div>
    );
  }

  return (
    <ul className="users-list">
      {console.log(props.items)}
      {props.items.map((user) => {
        return (
          <UsersItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            adCount={user.ads.length}
          />
        );
      })}
    </ul>
  );
};
export default UsersList;
