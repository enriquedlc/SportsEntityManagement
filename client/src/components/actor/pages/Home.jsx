const Home = () => {
  const divStyle = {
    textAlign: "center",
    marginTop: "3rem",
    marginBottom: "1rem",
    color: "black",
  };

  const h1Style = {
    textAlign: "center",
    marginTop: "3rem",
    marginBottom: "4rem",
    color: "black",
    fontSize: "1.5rem",
  };

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>
        Welcome to the Sports Entity Management Application
      </h1>
      <p>Log in to the app to continue.</p>
      <form action="">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
};

export default Home;
