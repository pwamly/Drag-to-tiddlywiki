import React, { useState } from "react";
import { connect } from "react-redux";

const DragToTiddlywiki = ({ wik, theme, close }) => {
  const [visible, setVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  // if (!wik) {
  //   return null;
  // }
  const style = getStyle(theme);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    visible && (
      <div style={style.backdrop}>
        <div style={style.modal}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={style.heading}>Dragg to tiddlywiki</h1>
            <div style={{ display: "flex", flexDirection: "column",gap:10 }}>
              <input
                type="text"
                placeholder="Enter tiddlywiki Title..."
                value={inputValue}
                onChange={handleInputChange}
                required
              />
              <div
                className="todoplugin-button-container"
                style={style.buttons}
              >
                <button
                  emphasis="tertiary"
                  size="medium"
                  onClick={() => setVisible(false)}
                >
                  {"Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state, ownProps) => {
  // const postId = ownProps.postId.replace("user-activity-", "");
  // const post = getPost(state, postId);

  try {
    // if (post.props && post.props.wik) {
    //   return { wik: post.props.wik };
    // }
  } catch (e) {}

  return {};
};

const getStyle = (theme) => ({
  backdrop: {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.50)",
    // background: "red",
    zIndex: 2000,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    position: "relative",
    width: 600,
    padding: 24,
    borderRadius: 8,
    maxWidth: "100%",
    background: "yellow",
    // color: theme.centerChannelColor,
    backgroundColor: theme.centerChannelBg,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: 600,
    margin: "0 0 24px 0",
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});

export default connect(mapStateToProps, null)(DragToTiddlywiki);
