import React, { Fragment } from "react";

import Title from "../components/Text/Title";
import Content from "../components/Content";
import Search from "../components/Search";
import Player from "../components/Player";
import Navigation from "../components/Navigation";
import StationList from "../components/StationList";

let Results = () => (
  <Fragment>
    <Content>
      <Title>Recently played</Title>
      <StationList />
    </Content>
    <Player />
    <Navigation />
  </Fragment>
);

Results.getInitialProps = function getInitialProps({ query }) {
  return {};
};

export default Results;
