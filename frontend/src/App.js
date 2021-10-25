import { useEffect, useState } from "react";
import axios from "axios";
import { List, Typography } from "antd";

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
      <List
        bordered
        dataSource={users}
        renderItem={({ first_name: firstName, last_name: lastName }) => (
          <List.Item>
            <Typography.Text>
              {firstName} {lastName}
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
