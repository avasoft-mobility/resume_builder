import { useMsal } from "@azure/msal-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../authConfig";
import Text from "./Text.wrapperComponent";

function Header() {
  return (
    <div>
      <div style={{ padding: "20px", backgroundColor: "#2a2a2a" }}>
        <Text
          variant="h5"
          color={"#FFFFFF"}
          style={{
            fontFamily: "Urbanist",
            fontWeight: 700,
            color: "#FFFFFF",
            userSelect: "none",
            marginLeft: "5px",
          }}
        >
          Resume Builder
        </Text>
      </div>
    </div>
  );
}

export default Header;
