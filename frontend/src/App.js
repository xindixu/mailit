import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // TODO: create a api-fetch module to DRY fetching
    axios
      .get("/api/v1/users")
      .then((resp) => {
        const { data } = resp;
        setUsers(data.users);
      })
      .catch((error) => console.log(error));

    return () => {};
  }, []);
  return (
    <div className="App">
      <ul>
        {users.map(({ first_name: firstName, last_name: lastName }) => (
          <li>
            {firstName} {lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
