export default function HomePage(){
  return (
    <div style={{ textAlign: "center"}}>
      <h2>Welcome to my App</h2>
      <p>Made with ♥  </p>
      <a href="/auth"
         style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#7aa2f7",
          color: "#1a1b26",
          textDecoration: "none",
          borderRadius: "5px"
         }} >
          Go to Control Panel
         </a>
    </div>
  );
}