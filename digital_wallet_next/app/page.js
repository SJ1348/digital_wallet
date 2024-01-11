import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const ExampleSSC = async () => {
  const session = await getServerSession(options);
  return (
    <div>
      <h1>Server-side Component</h1>
      {session ? (
        <div>
          <p>Welcome</p>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default ExampleSSC;
