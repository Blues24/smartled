export const metadata = {
  title: "Smart LED",
  description: "Control your lamp with internet and ESP8266",
};

export default function RootLayout({ children }) {
  return(
    <html lang ="en">
       <body style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#1a1b26",
        color: "#c0caf5", 
       }}>
        <header style={{
          padding: "10px 20px",
          backgroundColor: "#16161e",
          color: "#7aa2f7",
          textAlign: "center",
        }}>
          <h1>Smart LED Demo</h1>
        </header>
        <main style={{padding: "20px"}}>{children}</main>
        <footer style={{
          padding: "10px 20px",
          backgroundColor: "#16161e",
          textAlign: "center",
        }}>
          © 2024 Smart LED by Blues24 
        </footer>
       </body>
    </html>
  )
}