import React from 'react';
import { connect } from 'react-redux';
import { getPost } from 'mattermost-redux/selectors/entities/posts';
import {} from './actions';

const DragToTiddlywiki = ({ wik }) => {
  // if (!wik) {
  //   return null;
  // }
  
  return (
    <span onClick={(e)=>console.log('lllllllllllllllllllllllllllllllllllll',e)}>Pwamly is the king</span>
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

export default connect(
  mapStateToProps,
  null
)(DragToTiddlywiki);
