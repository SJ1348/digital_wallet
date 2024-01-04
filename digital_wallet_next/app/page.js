// pages/example-ssc.js

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const session = await getServerSession(options);

const ExampleSSC = () => {
  return (
    <div>
      <h1>Server-side Component</h1>
      {session ? (
        <p>Welcome, {session.user.role}!</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default ExampleSSC;
