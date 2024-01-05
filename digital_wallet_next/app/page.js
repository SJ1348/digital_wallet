// pages/example-ssc.js

import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const ExampleSSC = async () => {
  const session = await getServerSession(options);
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
