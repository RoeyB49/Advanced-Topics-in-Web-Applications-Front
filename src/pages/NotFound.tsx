
const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <button onClick={() => (window.location.href = "/")}>Go to Home</button>
    </div>
  );
};

export default NotFound;
