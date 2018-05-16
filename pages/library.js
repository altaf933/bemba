import React from "react";
import { connect } from "react-redux";
// store
import * as actions from "../store/library/actions";
import { load } from "../store/player/actions";
// components
import Seo from "../components/Seo";
import Title from "../components/Text/Title";
import Content from "../components/Content";
import StationList from "../components/StationList";

export let Library = ({ add, ...props }) => (
  <Content>
    <Seo description={"Save favorite radio stations to library"} />
    <Title>My library</Title>
    <StationList add={e => e} {...props} />
  </Content>
);

let mapProps = ({ library }) => ({
  stations: library.stations,
  library: library.stations
});
export default connect(mapProps, { ...actions, load })(Library);
