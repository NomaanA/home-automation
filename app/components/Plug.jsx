import React, { Component } from "react";
var PropTypes = require("prop-types");
var request = require("superagent-bluebird-promise");
const styles = {
  border: "1px solid black",
  fontFamily: "sans-serif",
  textAlign: "center",
  height: "100%",
  margin: "30px",
  padding: "10px",
  borderRadius: "20px"
};

class Plug extends Component {
  handleClick() {
    request.post(`/api/relay/${this.props.pin}/toggle`).then((err, res) => {
      console.log(err, res);
    });
  }

  render() {
    return (
      <div style={styles}>
        <div className="box">
          <h2> {this.props.name}</h2>
          <button
            type="button"
            className="button-xl"
            onClick={() => this.handleClick(this.props.pin)}
          >
            Button
          </button>
        </div>
      </div>
    );
  }
}

Plug.propTypes = {
  name: PropTypes.string,
  pin: PropTypes.any
};

export default Plug;
