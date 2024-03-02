import React from "react";
import { getData } from "../Service/request";

export default function Home() {
  const testdd = async () => {
    const a = await getData();
    console.log("====================================");
    console.log(a);
    console.log("====================================");
  };
  return (
    <>
      <div>Home</div>
      <button onClick={() => testdd()}>press</button>
    </>
  );
}
