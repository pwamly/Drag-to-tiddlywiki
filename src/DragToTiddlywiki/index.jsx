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
          <h1 style={style.heading}>Pwamly is the king</h1>
          <div className="todoplugin-button-container" style={style.buttons}>
            <input
              type="text"
              placeholder="Enter Title..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              emphasis="tertiary"
              size="medium"
              onClick={() => setVisible(false)}
            >
              {"Copy to tiddly"}
            </button>
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
    color: theme.centerChannelColor,
    backgroundColor: theme.centerChannelBg,
  },
  buttons: {
    marginTop: 24,
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
