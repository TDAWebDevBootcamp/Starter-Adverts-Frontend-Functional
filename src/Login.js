import React, { useState } from "react";

function Login(props) {
  const [disabled, changeDisabled] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    changeDisabled(true);
    try {
      const res = await props.client.login(
        e.target.username.value,
        e.target.password.value
      );
      // take the response token in the child component
      // hoist up to the parent component
      // stores the auth token in App.js state
      props.loggedIn(res.data.token);
    } catch (error) {
      alert("an error occurred, please try again");
    }
    changeDisabled(false);
  };

  return (
    <>
      Login
      <br />
      <form onSubmit={(e) => submitHandler(e)}>
        username
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        password
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Login;
