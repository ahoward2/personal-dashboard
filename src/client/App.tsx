import React from "react";
import axios from "axios";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import Header from "./components/Header";

const App = () => {
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    axios.get("api/details").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <HomeLayout
      header={<Header />}
      leftChild={<p>left child</p>}
      middleChild={<div>{"Github username: " + data?.github?.login}</div>}
      rightChild={<p>right child</p>}
    ></HomeLayout>
  );
};

export default App;
