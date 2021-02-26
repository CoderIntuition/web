import React from "react";
import Image from "next/image";
import { Header } from "semantic-ui-react";

function NotFound() {
  return (
    <div
      style={{
        position: "fixed",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <Image src="/images/notfound.png" width="500px" height="500px" />
      <Header as="h1" style={{ fontSize: "42px" }}>
        404 Not Found
      </Header>
    </div>
  );
}

export default NotFound;
