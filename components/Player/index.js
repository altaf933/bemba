import React, { PureComponent } from "react";
import styled from "styled-components";
import nprogress from "nprogress";
// store
import { connect } from "react-redux";
import * as actions from "../../store/player/actions";
import {
  add as addToLibrary,
  remove as removeFromLibrary
} from "../../store/library/actions";
import {
  hideNotification,
  showErrorNotification
} from "../../store/app/actions";
// components
import Add from "../Button/Add";
import Remove from "../Button/Remove";
import Play from "../Button/Play";
import Pause from "../Button/Pause";
import Station from "../Station/index";
import { opacity } from "../../lib/animations";

const ERROR_MESSAGE = "Sorry! We couldn't play this radio";

export class Player extends PureComponent {
  play = () => {
    let { error, showErrorNotification } = this.props;
    this.audio
      .play()
      .then(() => nprogress.done())
      .catch(() => {
        error();
        showErrorNotification({
          message: ERROR_MESSAGE
        });
      });
  };

  pause = () => this.audio.pause();

  componentDidMount() {
    let player = this.audio;
    let {
      play,
      pause,
      error,
      ready,
      hideNotification,
      showErrorNotification
    } = this.props;

    player.addEventListener("loadstart", () => {
      ready();
      nprogress.start();
      hideNotification();
    });

    player.addEventListener("canplay", () => {
      this.play();
    });

    player.addEventListener("error", err => {
      error();
      nprogress.done();
      showErrorNotification({
        message: ERROR_MESSAGE
      });
    });

    player.addEventListener("playing", () => play());
    player.addEventListener("pause", () => pause());
  }

  render() {
    let {
      playing,
      station,
      library,
      className,
      addToLibrary,
      removeFromLibrary
    } = this.props;

    return (
      <div className={className}>
        <Station {...station} />
        {library[station.id] ? (
          <Remove onClick={() => removeFromLibrary(station.id)} />
        ) : (
          <Add onClick={() => addToLibrary(station)} />
        )}

        {playing ? (
          <Pause onClick={this.pause} />
        ) : (
          <Play filled="true" onClick={this.play} />
        )}
        <audio
          autoPlay={false}
          ref={e => {
            this.audio = e;
          }}
          src={station.url}
        />
      </div>
    );
  }
}

let hide = ({ hidden }) => (hidden ? "none" : "flex");
let mapProps = ({ player, library }) => ({
  ...player,
  library: library.stations
});
export default connect(mapProps, {
  ...actions,
  addToLibrary,
  removeFromLibrary,
  hideNotification,
  showErrorNotification
})(styled(Player)`
  display: ${hide};
  padding: 15px;
  background: #333;
  flex: 0 1 auto;
  will-change: opacity;
  animation: ${opacity} 0.3s ease-in-out;

  > div {
    flex: 1;
  }
`);
