import React from "react";
import styled from "styled-components";
import Link from "../Link";
import Pad from "../Pad";
import Home from "../Icons/Home";
import Clock from "../Icons/Clock";
import Search from "../Icons/Search";
import Options from "../Icons/Options";
import FolderOpen from "../Icons/FolderOpen";

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
`;

export default ({ ...props }) => (
  <Pad bg={"#111"} {...props}>
    <Nav>
      <Link href="/">
        <Home width={24} />
      </Link>
      <Link href="/recent">
        <Clock width={24} />
      </Link>
      <Link href="/search">
        <Search size={2} />
      </Link>
      <Link href="/settings">
        <Options width={24} />
      </Link>
      <Link href="/library">
        <FolderOpen width={24} />
      </Link>
    </Nav>
  </Pad>
);
