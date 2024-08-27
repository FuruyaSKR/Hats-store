import React, { useState } from "react";
import { Card, Divider, Paper, Button, ButtonGroup } from "@mui/material";
import { Header, Line } from "../../styles";

interface Props {
  tab1Component: any;
  tab2Component: any;
  tab3Component?: any;
  tab1Title: string;
  tab2Title: string;
  tab3Title?: string;
  windowTitle?: any;
}

/**
 * Window Tabs: Add tabs to switch contents of a window
 * @requredProps !!!!
 * @tab1Component React component
 * @tab2Component React component
 * @tab1Title string
 * @tab2Title string
 * @windowTitle String or React component
 * @useModal boolean - if true, the window will be displayed in a modal
 * @modalProps object (optional) - props to be passed to the Dialog Mui component
 */

const WindowTabs: React.FC<Props> = ({
  tab1Component,
  tab2Component,
  tab3Component,
  tab1Title,
  tab2Title,
  tab3Title,
  windowTitle,
}: Props) => {
  const [clickedTab, setClickedTab] = useState("tab01");

  const handleTabClick = (tab: any) => {
    setClickedTab(tab);
  };

  const renderHeader = () => {
    return (
      <Header
        style={{
          height: 60,
          background: "#553C9D",
          color: "#fff",
          justifyContent: "space-between",
          minWidth: "max-content",
          display: "flex",
          width: "auto",
        }}
      >
        <Line
          data-testid="headerText"
          style={{
            marginRight: 0,
          }}
        >
          {windowTitle}
        </Line>
        <Line
          style={{
            justifyContent: "flex-end",
          }}
        >
          <ButtonGroup
            style={{
              border: `1px solid #a0a0a0`,
            }}
          >
            <Button
              data-testid={tab1Title}
              id="tab01"
              sx={{
                padding: "0 20px",
                minWidth: "max-content",
                color: "#fff",
                position: "relative",
                height: 30,
                textTransform: "none",
                fontWeight: "bold",
                opacity: 0.8,
                borderWidth: 0,
                backgroundColor: clickedTab !== "tab01" ? "#553C9D" : "#41267D",
                "&:hover": {
                  backgroundColor: "#624BB2",
                  border: "none",
                },
              }}
              onClick={() => handleTabClick("tab01")}
            >
              {tab1Title}
            </Button>

            <Button
              data-testid={tab2Title}
              id="tab02"
              sx={{
                padding: "0 20px",
                minWidth: "max-content",
                color: "#fff",
                position: "relative",
                height: 30,
                textTransform: "none",
                fontWeight: "bold",
                opacity: 0.8,
                borderWidth: 0,
                backgroundColor: clickedTab !== "tab02" ? "#553C9D" : "#41267D",
                "&:hover": {
                  backgroundColor: "#624BB2",
                  border: "none",
                },
              }}
              onClick={() => handleTabClick("tab02")}
            >
              {tab2Title}
            </Button>
            {tab3Component ? (
              <Button
                data-testid={tab3Title}
                id="tab03"
                sx={{
                  padding: "0 20px",
                  minWidth: "max-content",
                  color: "#fff",
                  position: "relative",
                  height: 30,
                  textTransform: "none",
                  fontWeight: "bold",
                  opacity: 0.8,
                  borderWidth: 0,
                  backgroundColor:
                    clickedTab !== "tab03" ? "#553C9D" : "#41267D",
                  "&:hover": {
                    backgroundColor: "#624BB2",
                    border: "none",
                  },
                }}
                onClick={() => handleTabClick("tab03")}
              >
                {tab3Title}
              </Button>
            ) : null}
          </ButtonGroup>
        </Line>
      </Header>
    );
  };

  const renderContent = () => {
    switch (clickedTab) {
      case "tab01":
        return tab1Component;
      case "tab02":
        return tab2Component;
      case "tab03":
        return tab3Component;
      default:
        break;
    }
    return null;
  };

  return (
    <Card
      style={{
        width: "100%",
      }}
    >
      {renderHeader()}
      <Paper style={{ width: "100%" }}>
        <Divider />
        <Divider />
        {renderContent()}
      </Paper>
    </Card>
  );
};

export default WindowTabs;
