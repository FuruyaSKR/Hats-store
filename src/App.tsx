import React from "react";
import "./App.css";
import { Column } from "./styles";
import WindowTabs from "./components/WindowTabs";
import Hats from "./Pages/Hats";
import Collections from "./Pages/Collections";
import Users from "./Pages/Users";

const App: React.FC = () => {
  const renderTab1 = () => <Hats />;
  const renderTab2 = () => <Collections />;
  const renderTab3 = () => <Users />;

  return (
    <div className="App">
      <Column
        style={{
          width: "760px",
          height: "100%",
          padding: "35px 25px",
        }}
      >
        <WindowTabs
          windowTitle={"Gerenciador da Loja"}
          tab1Component={renderTab1()}
          tab2Component={renderTab2()}
          tab3Component={renderTab3()}
          tab1Title={"Chapéus"}
          tab2Title={"Coleções"}
          tab3Title={"Usuários"}
        />
      </Column>
    </div>
  );
};

export default App;
