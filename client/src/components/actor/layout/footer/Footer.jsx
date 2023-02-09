const Footer = () => {
  const divStyle = {
    textAlign: "center",
    marginTop: "6rem",
    marginBottom: "1rem",
    color: "black",
  };
  return (
    <div style={divStyle}>
      Copyright &copy; <small>{new Date().getFullYear()}</small> Sports Entity
      Management
    </div>
  );
};

export default Footer;
