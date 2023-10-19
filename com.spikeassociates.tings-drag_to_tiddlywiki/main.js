/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = _interopRequireDefault(__webpack_require__(2));
var _copyToClipboard = _interopRequireDefault(__webpack_require__(3));
var _posts = __webpack_require__(5);
var _DragToTiddlywiki = _interopRequireDefault(__webpack_require__(39));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class TingsDragToTiddlyWiki {
  initialize(registry, store) {
    const copyToClipboard = async post => {
      try {
        // Create the tiddlerData object
        if (post) {
          const tiddlerData = {
            title: "example 4",
            text: post
          };
          console.log('..................................................', post);
          // Encode the tiddlerData object as a URL
          const encodedData = 'data:text/vnd.tiddler,' + encodeURIComponent(JSON.stringify(tiddlerData));
          // Copy with options
          (0, _copyToClipboard.default)(encodedData, {
            debug: true,
            format: 'URL'
          });
        }

        // Provide user feedback (console log or display a message)
        console.log('Data copied to clipboard');
      } catch (error) {
        // Handle any errors that may occur during clipboard access
        console.error('Failed to copy to clipboard:', error);
      }
    };
    registry.registerPostDropdownMenuAction('Drag to Tiddly Wiki', postId => {
      const {
        message
      } = (0, _posts.getPost)(store.getState(), postId);
      copyToClipboard(message);
      registry.registerRootComponent(_DragToTiddlywiki.default);
      // Verify the structure of 'post' and access the correct property
      console.log('Post:', message);
    }, () => true);
  }
  uninitialize() {
    // No cleanup required.
  }
}
window.registerPlugin('com.spikeassociates.tings-drag_to_tiddlywiki', new TingsDragToTiddlyWiki());

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__(4);

var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
}

var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true"
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") { // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"]
          window.clipboardData.setData(format, text);
        } else { // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection.addRange(range);

    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;


/***/ }),
/* 4 */
/***/ (function(module, exports) {


module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpandedLink = exports.makeIsPostCommentMention = exports.isPostIdSending = exports.getUnreadPostsChunk = exports.getPostsChunkInChannelAroundTime = exports.getPostIdsInChannel = exports.getOldestPostsChunkInChannel = exports.getRecentPostsChunkInChannel = exports.getCurrentUsersLatestPost = exports.getLatestReplyablePostId = exports.getMostRecentPostIdInChannel = exports.getLastPostPerChannel = exports.makeGetPostsForIds = exports.makeGetMessageInHistoryItem = exports.getSearchMatches = exports.getSearchResults = exports.makeGetCommentCountForPost = exports.makeGetProfilesForThread = exports.makeGetPostsForThread = exports.makeGetPostsAroundPost = exports.makeGetPostsInChannel = exports.makeGetPostIdsAroundPost = exports.makeGetPostsChunkAroundPost = exports.makeGetPostIdsForThread = exports.getPostsInCurrentChannel = exports.getPostIdsInCurrentChannel = exports.getOpenGraphMetadataForUrl = exports.getOpenGraphMetadata = exports.makeGetReactionsForPost = exports.getReactionsForPosts = exports.getPostsInThread = exports.getPostRepliesCount = exports.getPost = exports.getAllPosts = void 0;
var tslib_1 = __webpack_require__(6);
var reselect_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(8);
var common_1 = __webpack_require__(25);
var preferences_1 = __webpack_require__(26);
var users_1 = __webpack_require__(36);
var helpers_1 = __webpack_require__(28);
var post_utils_1 = __webpack_require__(37);
var preference_utils_1 = __webpack_require__(35);
function getAllPosts(state) {
    return state.entities.posts.posts;
}
exports.getAllPosts = getAllPosts;
function getPost(state, postId) {
    return getAllPosts(state)[postId];
}
exports.getPost = getPost;
function getPostRepliesCount(state, postId) {
    return state.entities.posts.postsReplies[postId] || 0;
}
exports.getPostRepliesCount = getPostRepliesCount;
function getPostsInThread(state) {
    return state.entities.posts.postsInThread;
}
exports.getPostsInThread = getPostsInThread;
function getReactionsForPosts(state) {
    return state.entities.posts.reactions;
}
exports.getReactionsForPosts = getReactionsForPosts;
function makeGetReactionsForPost() {
    return reselect_1.createSelector(getReactionsForPosts, function (state, postId) { return postId; }, function (reactions, postId) {
        if (reactions[postId]) {
            return reactions[postId];
        }
        return null;
    });
}
exports.makeGetReactionsForPost = makeGetReactionsForPost;
function getOpenGraphMetadata(state) {
    return state.entities.posts.openGraph;
}
exports.getOpenGraphMetadata = getOpenGraphMetadata;
function getOpenGraphMetadataForUrl(state, postId, url) {
    var openGraphForPost = state.entities.posts.openGraph[postId];
    return openGraphForPost ? openGraphForPost[url] : undefined;
}
exports.getOpenGraphMetadataForUrl = getOpenGraphMetadataForUrl;
// getPostIdsInCurrentChannel returns the IDs of posts loaded at the bottom of the channel. It does not include older
// posts such as those loaded by viewing a thread or a permalink.
function getPostIdsInCurrentChannel(state) {
    return getPostIdsInChannel(state, state.entities.channels.currentChannelId);
}
exports.getPostIdsInCurrentChannel = getPostIdsInCurrentChannel;
// getPostsInCurrentChannel returns the posts loaded at the bottom of the channel. It does not include older posts
// such as those loaded by viewing a thread or a permalink.
exports.getPostsInCurrentChannel = (function () {
    var getPostsInChannel = makeGetPostsInChannel();
    return function (state) { return getPostsInChannel(state, state.entities.channels.currentChannelId, -1); };
})();
function makeGetPostIdsForThread() {
    return helpers_1.createIdsSelector(getAllPosts, function (state, rootId) { return state.entities.posts.postsInThread[rootId] || []; }, function (state, rootId) { return state.entities.posts.posts[rootId]; }, function (posts, postsForThread, rootPost) {
        var thread = [];
        if (rootPost) {
            thread.push(rootPost);
        }
        postsForThread.forEach(function (id) {
            var post = posts[id];
            if (post) {
                thread.push(post);
            }
        });
        thread.sort(post_utils_1.comparePosts);
        return thread.map(function (post) { return post.id; });
    });
}
exports.makeGetPostIdsForThread = makeGetPostIdsForThread;
function makeGetPostsChunkAroundPost() {
    return helpers_1.createIdsSelector(function (state, postId, channelId) { return state.entities.posts.postsInChannel[channelId]; }, function (state, postId) { return postId; }, function (postsForChannel, postId) {
        var e_1, _a;
        if (!postsForChannel) {
            return null;
        }
        var postChunk;
        try {
            for (var postsForChannel_1 = tslib_1.__values(postsForChannel), postsForChannel_1_1 = postsForChannel_1.next(); !postsForChannel_1_1.done; postsForChannel_1_1 = postsForChannel_1.next()) {
                var block = postsForChannel_1_1.value;
                var index = block.order.indexOf(postId);
                if (index === -1) {
                    continue;
                }
                postChunk = block;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (postsForChannel_1_1 && !postsForChannel_1_1.done && (_a = postsForChannel_1.return)) _a.call(postsForChannel_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return postChunk;
    });
}
exports.makeGetPostsChunkAroundPost = makeGetPostsChunkAroundPost;
function makeGetPostIdsAroundPost() {
    var getPostsChunkAroundPost = makeGetPostsChunkAroundPost();
    return helpers_1.createIdsSelector(function (state, postId, channelId) { return getPostsChunkAroundPost(state, postId, channelId); }, function (state, postId) { return postId; }, function (state, postId, channelId, options) { return options && options.postsBeforeCount; }, function (state, postId, channelId, options) { return options && options.postsAfterCount; }, function (postsChunk, postId, postsBeforeCount, postsAfterCount) {
        if (postsBeforeCount === void 0) { postsBeforeCount = constants_1.Posts.POST_CHUNK_SIZE / 2; }
        if (postsAfterCount === void 0) { postsAfterCount = constants_1.Posts.POST_CHUNK_SIZE / 2; }
        if (!postsChunk || !postsChunk.order) {
            return null;
        }
        var postIds = postsChunk.order;
        var index = postIds.indexOf(postId);
        // Remember that posts that come after the post have a smaller index
        var minPostIndex = postsAfterCount === -1 ? 0 : Math.max(index - postsAfterCount, 0);
        var maxPostIndex = postsBeforeCount === -1 ? postIds.length : Math.min(index + postsBeforeCount + 1, postIds.length); // Needs the extra 1 to include the focused post
        return postIds.slice(minPostIndex, maxPostIndex);
    });
}
exports.makeGetPostIdsAroundPost = makeGetPostIdsAroundPost;
function formatPostInChannel(post, previousPost, index, allPosts, postsInThread, postIds, currentUser, focusedPostId) {
    var e_2, _a;
    var isFirstReply = false;
    var isLastReply = false;
    var highlight = false;
    var commentedOnPost;
    if (post.id === focusedPostId) {
        highlight = true;
    }
    if (post.root_id) {
        if (previousPost && previousPost.root_id !== post.root_id) {
            // Post is the first reply in a list of consecutive replies
            isFirstReply = true;
            if (previousPost && previousPost.id !== post.root_id) {
                commentedOnPost = allPosts[post.root_id];
            }
        }
        if (index - 1 < 0 || allPosts[postIds[index - 1]].root_id !== post.root_id) {
            // Post is the last reply in a list of consecutive replies
            isLastReply = true;
        }
    }
    var previousPostIsComment = false;
    if (previousPost && previousPost.root_id) {
        previousPostIsComment = true;
    }
    var postFromWebhook = Boolean(post.props && post.props.from_webhook);
    var prevPostFromWebhook = Boolean(previousPost && previousPost.props && previousPost.props.from_webhook);
    var consecutivePostByUser = false;
    if (previousPost &&
        previousPost.user_id === post.user_id &&
        post.create_at - previousPost.create_at <= constants_1.Posts.POST_COLLAPSE_TIMEOUT &&
        !postFromWebhook && !prevPostFromWebhook &&
        !post_utils_1.isSystemMessage(post) && !post_utils_1.isSystemMessage(previousPost)) {
        // The last post and this post were made by the same user within some time
        consecutivePostByUser = true;
    }
    var threadRepliedToByCurrentUser = false;
    var replyCount = 0;
    var isCommentMention = false;
    if (currentUser) {
        var rootId = post.root_id || post.id;
        var threadIds = postsInThread[rootId] || [];
        try {
            for (var threadIds_1 = tslib_1.__values(threadIds), threadIds_1_1 = threadIds_1.next(); !threadIds_1_1.done; threadIds_1_1 = threadIds_1.next()) {
                var pid = threadIds_1_1.value;
                var p = allPosts[pid];
                if (!p) {
                    continue;
                }
                if (p.user_id === currentUser.id) {
                    threadRepliedToByCurrentUser = true;
                }
                if (!post_utils_1.isPostEphemeral(p)) {
                    replyCount += 1;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (threadIds_1_1 && !threadIds_1_1.done && (_a = threadIds_1.return)) _a.call(threadIds_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var rootPost = allPosts[rootId];
        isCommentMention = post_utils_1.isPostCommentMention({ post: post, currentUser: currentUser, threadRepliedToByCurrentUser: threadRepliedToByCurrentUser, rootPost: rootPost });
    }
    return tslib_1.__assign(tslib_1.__assign({}, post), { isFirstReply: isFirstReply,
        isLastReply: isLastReply,
        previousPostIsComment: previousPostIsComment,
        commentedOnPost: commentedOnPost,
        consecutivePostByUser: consecutivePostByUser,
        replyCount: replyCount,
        isCommentMention: isCommentMention,
        highlight: highlight });
}
// makeGetPostsInChannel creates a selector that returns up to the given number of posts loaded at the bottom of the
// given channel. It does not include older posts such as those loaded by viewing a thread or a permalink.
function makeGetPostsInChannel() {
    return reselect_1.createSelector(getAllPosts, getPostsInThread, function (state, channelId) { return getPostIdsInChannel(state, channelId); }, common_1.getCurrentUser, preferences_1.getMyPreferences, function (state, channelId, numPosts) { return numPosts || constants_1.Posts.POST_CHUNK_SIZE; }, function (allPosts, postsInThread, allPostIds, currentUser, myPreferences, numPosts) {
        if (!allPostIds) {
            return null;
        }
        var posts = [];
        var joinLeavePref = myPreferences[preference_utils_1.getPreferenceKey(constants_1.Preferences.CATEGORY_ADVANCED_SETTINGS, constants_1.Preferences.ADVANCED_FILTER_JOIN_LEAVE)];
        var showJoinLeave = joinLeavePref ? joinLeavePref.value !== 'false' : true;
        var postIds = numPosts === -1 ? allPostIds : allPostIds.slice(0, numPosts);
        for (var i = 0; i < postIds.length; i++) {
            var post = allPosts[postIds[i]];
            if (post_utils_1.shouldFilterJoinLeavePost(post, showJoinLeave, currentUser ? currentUser.username : '')) {
                continue;
            }
            var previousPost = allPosts[postIds[i + 1]] || null;
            posts.push(formatPostInChannel(post, previousPost, i, allPosts, postsInThread, postIds, currentUser, ''));
        }
        return posts;
    });
}
exports.makeGetPostsInChannel = makeGetPostsInChannel;
function makeGetPostsAroundPost() {
    var getPostIdsAroundPost = makeGetPostIdsAroundPost();
    var options = {
        postsBeforeCount: -1,
        postsAfterCount: constants_1.Posts.POST_CHUNK_SIZE / 2,
    };
    return reselect_1.createSelector(function (state, focusedPostId, channelId) { return getPostIdsAroundPost(state, focusedPostId, channelId, options); }, getAllPosts, getPostsInThread, function (state, focusedPostId) { return focusedPostId; }, common_1.getCurrentUser, preferences_1.getMyPreferences, function (postIds, allPosts, postsInThread, focusedPostId, currentUser, myPreferences) {
        if (!postIds || !currentUser) {
            return null;
        }
        var posts = [];
        var joinLeavePref = myPreferences[preference_utils_1.getPreferenceKey(constants_1.Preferences.CATEGORY_ADVANCED_SETTINGS, constants_1.Preferences.ADVANCED_FILTER_JOIN_LEAVE)];
        var showJoinLeave = joinLeavePref ? joinLeavePref.value !== 'false' : true;
        for (var i = 0; i < postIds.length; i++) {
            var post = allPosts[postIds[i]];
            if (post_utils_1.shouldFilterJoinLeavePost(post, showJoinLeave, currentUser.username)) {
                continue;
            }
            var previousPost = allPosts[postIds[i + 1]] || null;
            var formattedPost = formatPostInChannel(post, previousPost, i, allPosts, postsInThread, postIds, currentUser, focusedPostId);
            posts.push(formattedPost);
        }
        return posts;
    });
}
exports.makeGetPostsAroundPost = makeGetPostsAroundPost;
// Returns a function that creates a creates a selector that will get the posts for a given thread.
// That selector will take a props object (containing a rootId field) as its
// only argument and will be memoized based on that argument.
function makeGetPostsForThread() {
    return reselect_1.createSelector(getAllPosts, function (state, props) { return state.entities.posts.postsInThread[props.rootId] || []; }, function (state, props) { return state.entities.posts.posts[props.rootId]; }, function (posts, postsForThread, rootPost) {
        var thread = [];
        if (rootPost) {
            thread.push(rootPost);
        }
        postsForThread.forEach(function (id) {
            var post = posts[id];
            if (post) {
                thread.push(post);
            }
        });
        thread.sort(post_utils_1.comparePosts);
        return thread;
    });
}
exports.makeGetPostsForThread = makeGetPostsForThread;
// The selector below filters current user if it exists. Excluding currentUser is just for convinience
function makeGetProfilesForThread() {
    var getPostsForThread = makeGetPostsForThread();
    return reselect_1.createSelector(users_1.getUsers, users_1.getCurrentUserId, getPostsForThread, function (allUsers, currentUserId, posts) {
        var profileIds = posts.map(function (post) { return post.user_id; });
        var uniqueIds = tslib_1.__spread(new Set(profileIds));
        return uniqueIds.reduce(function (acc, id) {
            if (allUsers[id] && currentUserId !== id) {
                return tslib_1.__spread(acc, [
                    allUsers[id],
                ]);
            }
            return acc;
        }, []);
    });
}
exports.makeGetProfilesForThread = makeGetProfilesForThread;
function makeGetCommentCountForPost() {
    return reselect_1.createSelector(getAllPosts, function (state, _a) {
        var post = _a.post;
        return state.entities.posts.postsInThread[post ? post.id : ''] || [];
    }, function (state, props) { return props; }, function (posts, postsForThread, _a) {
        var currentPost = _a.post;
        if (!currentPost) {
            return 0;
        }
        var count = 0;
        postsForThread.forEach(function (id) {
            var post = posts[id];
            if (post && post.state !== constants_1.Posts.POST_DELETED && !post_utils_1.isPostEphemeral(post)) {
                count += 1;
            }
        });
        return count;
    });
}
exports.makeGetCommentCountForPost = makeGetCommentCountForPost;
exports.getSearchResults = reselect_1.createSelector(getAllPosts, function (state) { return state.entities.search.results; }, function (posts, postIds) {
    if (!postIds) {
        return [];
    }
    return postIds.map(function (id) { return posts[id]; });
});
// Returns the matched text from the search results, if the server has provided them.
// These matches will only be present if the server is running Mattermost 5.1 or higher
// with Elasticsearch enabled to search posts. Otherwise, null will be returned.
function getSearchMatches(state) {
    return state.entities.search.matches;
}
exports.getSearchMatches = getSearchMatches;
function makeGetMessageInHistoryItem(type) {
    return reselect_1.createSelector(function (state) { return state.entities.posts.messagesHistory; }, function (messagesHistory) {
        var idx = messagesHistory.index[type];
        var messages = messagesHistory.messages;
        if (idx >= 0 && messages && messages.length > idx) {
            return messages[idx];
        }
        return '';
    });
}
exports.makeGetMessageInHistoryItem = makeGetMessageInHistoryItem;
function makeGetPostsForIds() {
    return helpers_1.createIdsSelector(getAllPosts, function (state, postIds) { return postIds; }, function (allPosts, postIds) {
        if (!postIds) {
            return [];
        }
        return postIds.map(function (id) { return allPosts[id]; });
    });
}
exports.makeGetPostsForIds = makeGetPostsForIds;
exports.getLastPostPerChannel = reselect_1.createSelector(getAllPosts, function (state) { return state.entities.posts.postsInChannel; }, function (allPosts, postsInChannel) {
    var e_3, _a;
    var ret = {};
    try {
        for (var _b = tslib_1.__values(Object.entries(postsInChannel)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = tslib_1.__read(_c.value, 2), channelId = _d[0], postsForChannel = _d[1];
            var recentBlock = (postsForChannel).find(function (block) { return block.recent; });
            if (!recentBlock) {
                continue;
            }
            var postId = recentBlock.order[0];
            if (allPosts.hasOwnProperty(postId)) {
                ret[channelId] = allPosts[postId];
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return ret;
});
exports.getMostRecentPostIdInChannel = reselect_1.createSelector(getAllPosts, function (state, channelId) { return getPostIdsInChannel(state, channelId); }, preferences_1.getMyPreferences, function (posts, postIdsInChannel, preferences) {
    if (!postIdsInChannel) {
        return '';
    }
    var key = preference_utils_1.getPreferenceKey(constants_1.Preferences.CATEGORY_ADVANCED_SETTINGS, constants_1.Preferences.ADVANCED_FILTER_JOIN_LEAVE);
    var allowSystemMessages = preferences[key] ? preferences[key].value === 'true' : true;
    if (!allowSystemMessages) {
        // return the most recent non-system message in the channel
        var postId = void 0;
        for (var i = 0; i < postIdsInChannel.length; i++) {
            var p = posts[postIdsInChannel[i]];
            if (!p.type || !p.type.startsWith(constants_1.Posts.SYSTEM_MESSAGE_PREFIX)) {
                postId = p.id;
                break;
            }
        }
        return postId;
    }
    // return the most recent message in the channel
    return postIdsInChannel[0];
});
exports.getLatestReplyablePostId = reselect_1.createSelector(exports.getPostsInCurrentChannel, function (posts) {
    if (!posts) {
        return '';
    }
    var latestReplyablePost = posts.find(function (post) { return post.state !== constants_1.Posts.POST_DELETED && !post_utils_1.isSystemMessage(post) && !post_utils_1.isPostEphemeral(post); });
    if (!latestReplyablePost) {
        return '';
    }
    return latestReplyablePost.id;
});
exports.getCurrentUsersLatestPost = reselect_1.createSelector(exports.getPostsInCurrentChannel, common_1.getCurrentUser, function (state, rootId) { return rootId; }, function (posts, currentUser, rootId) {
    if (!posts) {
        return null;
    }
    var lastPost = posts.find(function (post) {
        // don't edit webhook posts, deleted posts, or system messages
        if (post.user_id !== currentUser.id || (post.props && post.props.from_webhook) || post.state === constants_1.Posts.POST_DELETED || post_utils_1.isSystemMessage(post) || post_utils_1.isPostEphemeral(post) || post_utils_1.isPostPendingOrFailed(post)) {
            return false;
        }
        if (rootId) {
            return post.root_id === rootId || post.id === rootId;
        }
        return true;
    });
    return lastPost;
});
function getRecentPostsChunkInChannel(state, channelId) {
    var postsForChannel = state.entities.posts.postsInChannel[channelId];
    if (!postsForChannel) {
        return null;
    }
    return postsForChannel.find(function (block) { return block.recent; });
}
exports.getRecentPostsChunkInChannel = getRecentPostsChunkInChannel;
function getOldestPostsChunkInChannel(state, channelId) {
    var postsForChannel = state.entities.posts.postsInChannel[channelId];
    if (!postsForChannel) {
        return null;
    }
    return postsForChannel.find(function (block) { return block.oldest; });
}
exports.getOldestPostsChunkInChannel = getOldestPostsChunkInChannel;
// getPostIdsInChannel returns the IDs of posts loaded at the bottom of the given channel. It does not include older
// posts such as those loaded by viewing a thread or a permalink.
function getPostIdsInChannel(state, channelId) {
    var recentBlock = getRecentPostsChunkInChannel(state, channelId);
    if (!recentBlock) {
        return null;
    }
    return recentBlock.order;
}
exports.getPostIdsInChannel = getPostIdsInChannel;
function getPostsChunkInChannelAroundTime(state, channelId, timeStamp) {
    var postsEntity = state.entities.posts;
    var postsForChannel = postsEntity.postsInChannel[channelId];
    var posts = postsEntity.posts;
    if (!postsForChannel) {
        return null;
    }
    var blockAroundTimestamp = postsForChannel.find(function (block) {
        var order = block.order;
        var recentPostInBlock = posts[order[0]];
        var oldestPostInBlock = posts[order[order.length - 1]];
        if (recentPostInBlock && oldestPostInBlock) {
            return (recentPostInBlock.create_at >= timeStamp && oldestPostInBlock.create_at <= timeStamp);
        }
        return false;
    });
    return blockAroundTimestamp;
}
exports.getPostsChunkInChannelAroundTime = getPostsChunkInChannelAroundTime;
function getUnreadPostsChunk(state, channelId, timeStamp) {
    var postsEntity = state.entities.posts;
    var posts = postsEntity.posts;
    var recentChunk = getRecentPostsChunkInChannel(state, channelId);
    /* 1. lastViewedAt can be greater than the most recent chunk in case of edited posts etc.
          * return if recent block exists and oldest post is created after the last lastViewedAt timestamp
          i.e all posts are read and the lastViewedAt is greater than the last post

       2. lastViewedAt can be less than the first post in a channel if all the last viewed posts are deleted
          * return if oldest block exist and oldest post created_at is greater than the last viewed post
          i.e all posts are unread so the lastViewedAt is lessthan the first post

      The above two exceptions are added because we cannot select the chunk based on timestamp alone as these cases are out of bounds

      3. Normal cases where there are few unreads and few reads in a chunk as that is how unread API returns data
          * return getPostsChunkInChannelAroundTime
    */
    if (recentChunk) {
        // This would happen if there are no posts in channel.
        // If the system messages are deleted by sys admin.
        // Experimental changes like hiding Join/Leave still will have recent chunk so it follows the default path based on timestamp
        if (!recentChunk.order.length) {
            return recentChunk;
        }
        var order = recentChunk.order;
        var oldestPostInBlock = posts[order[order.length - 1]];
        // check for only oldest posts because this can be higher than the latest post if the last post is edited
        if (oldestPostInBlock.create_at <= timeStamp) {
            return recentChunk;
        }
    }
    var oldestPostsChunk = getOldestPostsChunkInChannel(state, channelId);
    if (oldestPostsChunk && oldestPostsChunk.order.length) {
        var order = oldestPostsChunk.order;
        var oldestPostInBlock = posts[order[order.length - 1]];
        if (oldestPostInBlock.create_at >= timeStamp) {
            return oldestPostsChunk;
        }
    }
    return getPostsChunkInChannelAroundTime(state, channelId, timeStamp);
}
exports.getUnreadPostsChunk = getUnreadPostsChunk;
var isPostIdSending = function (state, postId) {
    return state.entities.posts.pendingPostIds.some(function (sendingPostId) { return sendingPostId === postId; });
};
exports.isPostIdSending = isPostIdSending;
var makeIsPostCommentMention = function () {
    return reselect_1.createSelector(getAllPosts, getPostsInThread, common_1.getCurrentUser, getPost, function (allPosts, postsInThread, currentUser, post) {
        var e_4, _a;
        if (!post) {
            return false;
        }
        var threadRepliedToByCurrentUser = false;
        var isCommentMention = false;
        if (currentUser) {
            var rootId = post.root_id || post.id;
            var threadIds = postsInThread[rootId] || [];
            try {
                for (var threadIds_2 = tslib_1.__values(threadIds), threadIds_2_1 = threadIds_2.next(); !threadIds_2_1.done; threadIds_2_1 = threadIds_2.next()) {
                    var pid = threadIds_2_1.value;
                    var p = allPosts[pid];
                    if (!p) {
                        continue;
                    }
                    if (p.user_id === currentUser.id) {
                        threadRepliedToByCurrentUser = true;
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (threadIds_2_1 && !threadIds_2_1.done && (_a = threadIds_2.return)) _a.call(threadIds_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            var rootPost = allPosts[rootId];
            isCommentMention = post_utils_1.isPostCommentMention({ post: post, currentUser: currentUser, threadRepliedToByCurrentUser: threadRepliedToByCurrentUser, rootPost: rootPost });
        }
        return isCommentMention;
    });
};
exports.makeIsPostCommentMention = makeIsPostCommentMention;
function getExpandedLink(state, link) {
    return state.entities.posts.expandedURLs[link];
}
exports.getExpandedLink = getExpandedLink;
//# sourceMappingURL=posts.js.map

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__esDecorate", function() { return __esDecorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__runInitializers", function() { return __runInitializers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__propKey", function() { return __propKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__setFunctionName", function() { return __setFunctionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArray", function() { return __spreadArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldIn", function() { return __classPrivateFieldIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__addDisposableResource", function() { return __addDisposableResource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__disposeResources", function() { return __disposeResources; });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};

function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};

function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while (env.stack.length) {
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
            }
            catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}

/* harmony default export */ __webpack_exports__["default"] = ({
    __extends: __extends,
    __assign: __assign,
    __rest: __rest,
    __decorate: __decorate,
    __param: __param,
    __metadata: __metadata,
    __awaiter: __awaiter,
    __generator: __generator,
    __createBinding: __createBinding,
    __exportStar: __exportStar,
    __values: __values,
    __read: __read,
    __spread: __spread,
    __spreadArrays: __spreadArrays,
    __spreadArray: __spreadArray,
    __await: __await,
    __asyncGenerator: __asyncGenerator,
    __asyncDelegator: __asyncDelegator,
    __asyncValues: __asyncValues,
    __makeTemplateObject: __makeTemplateObject,
    __importStar: __importStar,
    __importDefault: __importDefault,
    __classPrivateFieldGet: __classPrivateFieldGet,
    __classPrivateFieldSet: __classPrivateFieldSet,
    __classPrivateFieldIn: __classPrivateFieldIn,
    __addDisposableResource: __addDisposableResource,
    __disposeResources: __disposeResources,
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMemoize", function() { return defaultMemoize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSelectorCreator", function() { return createSelectorCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSelector", function() { return createSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStructuredSelector", function() { return createStructuredSelector; });
function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = memoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.dependencies = dependencies;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Threads = exports.Roles = exports.Users = exports.Groups = exports.Plugins = exports.Emoji = exports.Permissions = exports.Stats = exports.Teams = exports.WebsocketEvents = exports.RequestStatus = exports.Files = exports.Posts = exports.Preferences = exports.General = void 0;
var tslib_1 = __webpack_require__(6);
var general_1 = tslib_1.__importDefault(__webpack_require__(9));
exports.General = general_1.default;
var request_status_1 = tslib_1.__importDefault(__webpack_require__(10));
exports.RequestStatus = request_status_1.default;
var websocket_1 = tslib_1.__importDefault(__webpack_require__(11));
exports.WebsocketEvents = websocket_1.default;
var preferences_1 = tslib_1.__importDefault(__webpack_require__(12));
exports.Preferences = preferences_1.default;
var posts_1 = tslib_1.__importDefault(__webpack_require__(13));
exports.Posts = posts_1.default;
var files_1 = tslib_1.__importDefault(__webpack_require__(14));
exports.Files = files_1.default;
var teams_1 = tslib_1.__importDefault(__webpack_require__(15));
exports.Teams = teams_1.default;
var stats_1 = tslib_1.__importDefault(__webpack_require__(16));
exports.Stats = stats_1.default;
var permissions_1 = tslib_1.__importDefault(__webpack_require__(18));
exports.Permissions = permissions_1.default;
var emoji_1 = tslib_1.__importDefault(__webpack_require__(19));
exports.Emoji = emoji_1.default;
var plugins_1 = tslib_1.__importDefault(__webpack_require__(20));
exports.Plugins = plugins_1.default;
var groups_1 = tslib_1.__importDefault(__webpack_require__(21));
exports.Groups = groups_1.default;
var users_1 = tslib_1.__importDefault(__webpack_require__(22));
exports.Users = users_1.default;
var roles_1 = tslib_1.__importDefault(__webpack_require__(23));
exports.Roles = roles_1.default;
var threads_1 = tslib_1.__importDefault(__webpack_require__(24));
exports.Threads = threads_1.default;
//# sourceMappingURL=index.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
exports.default = {
    CONFIG_CHANGED: 'config_changed',
    SERVER_VERSION_CHANGED: 'server_version_changed',
    PAGE_SIZE_DEFAULT: 60,
    PAGE_SIZE_MAXIMUM: 200,
    LOGS_PAGE_SIZE_DEFAULT: 10000,
    AUDITS_CHUNK_SIZE: 100,
    PROFILE_CHUNK_SIZE: 100,
    CHANNELS_CHUNK_SIZE: 50,
    TEAMS_CHUNK_SIZE: 50,
    JOBS_CHUNK_SIZE: 50,
    SEARCH_TIMEOUT_MILLISECONDS: 100,
    STATUS_INTERVAL: 60000,
    AUTOCOMPLETE_LIMIT_DEFAULT: 25,
    AUTOCOMPLETE_SPLIT_CHARACTERS: ['.', '-', '_'],
    OUT_OF_OFFICE: 'ooo',
    OFFLINE: 'offline',
    AWAY: 'away',
    ONLINE: 'online',
    DND: 'dnd',
    PERMISSIONS_ALL: 'all',
    PERMISSIONS_CHANNEL_ADMIN: 'channel_admin',
    PERMISSIONS_TEAM_ADMIN: 'team_admin',
    PERMISSIONS_SYSTEM_ADMIN: 'system_admin',
    TEAM_GUEST_ROLE: 'team_guest',
    TEAM_USER_ROLE: 'team_user',
    TEAM_ADMIN_ROLE: 'team_admin',
    CHANNEL_GUEST_ROLE: 'channel_guest',
    CHANNEL_USER_ROLE: 'channel_user',
    CHANNEL_ADMIN_ROLE: 'channel_admin',
    SYSTEM_GUEST_ROLE: 'system_guest',
    SYSTEM_USER_ROLE: 'system_user',
    SYSTEM_ADMIN_ROLE: 'system_admin',
    SYSTEM_USER_MANAGER_ROLE: 'system_user_manager',
    SYSTEM_READ_ONLY_ADMIN_ROLE: 'system_read_only_admin',
    SYSTEM_MANAGER_ROLE: 'system_manager',
    SYSTEM_USER_ACCESS_TOKEN_ROLE: 'system_user_access_token',
    SYSTEM_POST_ALL_ROLE: 'system_post_all',
    SYSTEM_POST_ALL_PUBLIC_ROLE: 'system_post_all_public',
    ALLOW_EDIT_POST_ALWAYS: 'always',
    ALLOW_EDIT_POST_NEVER: 'never',
    ALLOW_EDIT_POST_TIME_LIMIT: 'time_limit',
    DEFAULT_POST_EDIT_TIME_LIMIT: 300,
    RESTRICT_DIRECT_MESSAGE_ANY: 'any',
    RESTRICT_DIRECT_MESSAGE_TEAM: 'team',
    SWITCH_TO_DEFAULT_CHANNEL: 'switch_to_default_channel',
    DEFAULT_CHANNEL: 'town-square',
    DM_CHANNEL: 'D',
    OPEN_CHANNEL: 'O',
    PRIVATE_CHANNEL: 'P',
    GM_CHANNEL: 'G',
    PUSH_NOTIFY_APPLE_REACT_NATIVE: 'apple_rn',
    PUSH_NOTIFY_ANDROID_REACT_NATIVE: 'android_rn',
    STORE_REHYDRATION_COMPLETE: 'store_hydation_complete',
    OFFLINE_STORE_RESET: 'offline_store_reset',
    OFFLINE_STORE_PURGE: 'offline_store_purge',
    TEAMMATE_NAME_DISPLAY: {
        SHOW_USERNAME: 'username',
        SHOW_NICKNAME_FULLNAME: 'nickname_full_name',
        SHOW_FULLNAME: 'full_name',
    },
    SPECIAL_MENTIONS: ['all', 'channel', 'here'],
    MAX_USERS_IN_GM: 8,
    MIN_USERS_IN_GM: 3,
    MAX_GROUP_CHANNELS_FOR_PROFILES: 50,
    DEFAULT_LOCALE: 'en',
    DEFAULT_AUTOLINKED_URL_SCHEMES: ['http', 'https', 'ftp', 'mailto', 'tel', 'mattermost'],
    DISABLED: 'disabled',
    DEFAULT_ON: 'default_on',
    DEFAULT_OFF: 'default_off',
    ALWAYS_ON: 'always_on',
    DEFAULT_GROUP: 'board',
};
//# sourceMappingURL=general.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var status = {
    NOT_STARTED: 'not_started',
    STARTED: 'started',
    SUCCESS: 'success',
    FAILURE: 'failure',
    CANCELLED: 'cancelled',
};
exports.default = status;
//# sourceMappingURL=request_status.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var WebsocketEvents = {
    POSTED: 'posted',
    POST_EDITED: 'post_edited',
    POST_DELETED: 'post_deleted',
    POST_UNREAD: 'post_unread',
    CHANNEL_CONVERTED: 'channel_converted',
    CHANNEL_CREATED: 'channel_created',
    CHANNEL_DELETED: 'channel_deleted',
    CHANNEL_UNARCHIVED: 'channel_restored',
    CHANNEL_UPDATED: 'channel_updated',
    CHANNEL_VIEWED: 'channel_viewed',
    CHANNEL_MEMBER_UPDATED: 'channel_member_updated',
    CHANNEL_SCHEME_UPDATED: 'channel_scheme_updated',
    DIRECT_ADDED: 'direct_added',
    ADDED_TO_TEAM: 'added_to_team',
    LEAVE_TEAM: 'leave_team',
    UPDATE_TEAM: 'update_team',
    USER_ADDED: 'user_added',
    USER_REMOVED: 'user_removed',
    USER_UPDATED: 'user_updated',
    USER_ROLE_UPDATED: 'user_role_updated',
    ROLE_ADDED: 'role_added',
    ROLE_REMOVED: 'role_removed',
    ROLE_UPDATED: 'role_updated',
    TYPING: 'typing',
    STOP_TYPING: 'stop_typing',
    PREFERENCE_CHANGED: 'preference_changed',
    PREFERENCES_CHANGED: 'preferences_changed',
    PREFERENCES_DELETED: 'preferences_deleted',
    EPHEMERAL_MESSAGE: 'ephemeral_message',
    STATUS_CHANGED: 'status_change',
    HELLO: 'hello',
    WEBRTC: 'webrtc',
    REACTION_ADDED: 'reaction_added',
    REACTION_REMOVED: 'reaction_removed',
    EMOJI_ADDED: 'emoji_added',
    LICENSE_CHANGED: 'license_changed',
    CONFIG_CHANGED: 'config_changed',
    PLUGIN_STATUSES_CHANGED: 'plugin_statuses_changed',
    OPEN_DIALOG: 'open_dialog',
    INCREASE_POST_VISIBILITY_BY_ONE: 'increase_post_visibility_by_one',
    RECEIVED_GROUP: 'received_group',
    RECEIVED_GROUP_ASSOCIATED_TO_TEAM: 'group_associated_to_team',
    RECEIVED_GROUP_NOT_ASSOCIATED_TO_TEAM: 'group_not_associated_to_team',
    RECEIVED_GROUP_ASSOCIATED_TO_CHANNEL: 'group_associated_to_channel',
    RECEIVED_GROUP_NOT_ASSOCIATED_TO_CHANNEL: 'group_not_associated_to_channel',
    WARN_METRIC_STATUS_RECEIVED: 'warn_metric_status_received',
    WARN_METRIC_STATUS_REMOVED: 'warn_metric_status_removed',
    THREAD_UPDATED: 'thread_updated',
    THREAD_FOLLOW_CHANGED: 'thread_follow_changed',
    THREAD_READ_CHANGED: 'thread_read_changed',
};
exports.default = WebsocketEvents;
//# sourceMappingURL=websocket.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var Preferences = {
    CATEGORY_CHANNEL_OPEN_TIME: 'channel_open_time',
    CATEGORY_CHANNEL_APPROXIMATE_VIEW_TIME: 'channel_approximate_view_time',
    CATEGORY_DIRECT_CHANNEL_SHOW: 'direct_channel_show',
    CATEGORY_GROUP_CHANNEL_SHOW: 'group_channel_show',
    CATEGORY_FLAGGED_POST: 'flagged_post',
    CATEGORY_FAVORITE_CHANNEL: 'favorite_channel',
    CATEGORY_AUTO_RESET_MANUAL_STATUS: 'auto_reset_manual_status',
    CATEGORY_NOTIFICATIONS: 'notifications',
    COMMENTS: 'comments',
    COMMENTS_ANY: 'any',
    COMMENTS_ROOT: 'root',
    COMMENTS_NEVER: 'never',
    EMAIL: 'email',
    EMAIL_INTERVAL: 'email_interval',
    INTERVAL_FIFTEEN_MINUTES: 15 * 60,
    INTERVAL_HOUR: 60 * 60,
    INTERVAL_IMMEDIATE: 30,
    // "immediate" is a 30 second interval
    INTERVAL_NEVER: 0,
    INTERVAL_NOT_SET: -1,
    CATEGORY_DISPLAY_SETTINGS: 'display_settings',
    NAME_NAME_FORMAT: 'name_format',
    DISPLAY_PREFER_NICKNAME: 'nickname_full_name',
    DISPLAY_PREFER_FULL_NAME: 'full_name',
    DISPLAY_PREFER_USERNAME: 'username',
    MENTION_KEYS: 'mention_keys',
    USE_MILITARY_TIME: 'use_military_time',
    CATEGORY_CUSTOM_STATUS: 'custom_status',
    NAME_CUSTOM_STATUS_TUTORIAL_STATE: 'custom_status_tutorial_state',
    NAME_RECENT_CUSTOM_STATUSES: 'recent_custom_statuses',
    CUSTOM_STATUS_MODAL_VIEWED: 'custom_status_modal_viewed',
    CATEGORY_SIDEBAR_SETTINGS: 'sidebar_settings',
    CHANNEL_SIDEBAR_ORGANIZATION: 'channel_sidebar_organization',
    CHANNEL_SIDEBAR_AUTOCLOSE_DMS: 'close_unused_direct_messages',
    AUTOCLOSE_DMS_ENABLED: 'after_seven_days',
    LIMIT_VISIBLE_DMS_GMS: 'limit_visible_dms_gms',
    SHOW_UNREAD_SECTION: 'show_unread_section',
    CATEGORY_ADVANCED_SETTINGS: 'advanced_settings',
    ADVANCED_FILTER_JOIN_LEAVE: 'join_leave',
    ADVANCED_CODE_BLOCK_ON_CTRL_ENTER: 'code_block_ctrl_enter',
    ADVANCED_SEND_ON_CTRL_ENTER: 'send_on_ctrl_enter',
    CATEGORY_WHATS_NEW_MODAL: 'whats_new_modal',
    HAS_SEEN_SIDEBAR_WHATS_NEW_MODAL: 'has_seen_sidebar_whats_new_modal',
    CATEGORY_THEME: 'theme',
    THEMES: {
        default: {
            type: 'Mattermost',
            sidebarBg: '#145dbf',
            sidebarText: '#ffffff',
            sidebarUnreadText: '#ffffff',
            sidebarTextHoverBg: '#4578bf',
            sidebarTextActiveBorder: '#579eff',
            sidebarTextActiveColor: '#ffffff',
            sidebarHeaderBg: '#1153ab',
            sidebarHeaderTextColor: '#ffffff',
            onlineIndicator: '#06d6a0',
            awayIndicator: '#ffbc42',
            dndIndicator: '#f74343',
            mentionBg: '#ffffff',
            mentionBj: '#ffffff',
            mentionColor: '#145dbf',
            centerChannelBg: '#ffffff',
            centerChannelColor: '#3d3c40',
            newMessageSeparator: '#ff8800',
            linkColor: '#2389d7',
            buttonBg: '#166de0',
            buttonColor: '#ffffff',
            errorTextColor: '#fd5960',
            mentionHighlightBg: '#ffe577',
            mentionHighlightLink: '#166de0',
            codeTheme: 'github',
        },
        organization: {
            type: 'Organization',
            sidebarBg: '#2071a7',
            sidebarText: '#ffffff',
            sidebarUnreadText: '#ffffff',
            sidebarTextHoverBg: '#136197',
            sidebarTextActiveBorder: '#7ab0d6',
            sidebarTextActiveColor: '#ffffff',
            sidebarHeaderBg: '#2f81b7',
            sidebarHeaderTextColor: '#ffffff',
            onlineIndicator: '#7dbe00',
            awayIndicator: '#dcbd4e',
            dndIndicator: '#ff6a6a',
            mentionBg: '#fbfbfb',
            mentionBj: '#fbfbfb',
            mentionColor: '#2071f7',
            centerChannelBg: '#f2f4f8',
            centerChannelColor: '#333333',
            newMessageSeparator: '#ff8800',
            linkColor: '#2f81b7',
            buttonBg: '#1dacfc',
            buttonColor: '#ffffff',
            errorTextColor: '#a94442',
            mentionHighlightBg: '#f3e197',
            mentionHighlightLink: '#2f81b7',
            codeTheme: 'github',
        },
        mattermostDark: {
            type: 'Mattermost Dark',
            sidebarBg: '#1b2c3e',
            sidebarText: '#ffffff',
            sidebarUnreadText: '#ffffff',
            sidebarTextHoverBg: '#4a5664',
            sidebarTextActiveBorder: '#66b9a7',
            sidebarTextActiveColor: '#ffffff',
            sidebarHeaderBg: '#1b2c3e',
            sidebarHeaderTextColor: '#ffffff',
            onlineIndicator: '#65dcc8',
            awayIndicator: '#c1b966',
            dndIndicator: '#e81023',
            mentionBg: '#b74a4a',
            mentionBj: '#b74a4a',
            mentionColor: '#ffffff',
            centerChannelBg: '#2f3e4e',
            centerChannelColor: '#dddddd',
            newMessageSeparator: '#5de5da',
            linkColor: '#a4ffeb',
            buttonBg: '#4cbba4',
            buttonColor: '#ffffff',
            errorTextColor: '#ff6461',
            mentionHighlightBg: '#984063',
            mentionHighlightLink: '#a4ffeb',
            codeTheme: 'solarized-dark',
        },
        windows10: {
            type: 'Windows Dark',
            sidebarBg: '#171717',
            sidebarText: '#ffffff',
            sidebarUnreadText: '#ffffff',
            sidebarTextHoverBg: '#302e30',
            sidebarTextActiveBorder: '#196caf',
            sidebarTextActiveColor: '#ffffff',
            sidebarHeaderBg: '#1f1f1f',
            sidebarHeaderTextColor: '#ffffff',
            onlineIndicator: '#399fff',
            awayIndicator: '#c1b966',
            dndIndicator: '#e81023',
            mentionBg: '#0177e7',
            mentionBj: '#0177e7',
            mentionColor: '#ffffff',
            centerChannelBg: '#1f1f1f',
            centerChannelColor: '#dddddd',
            newMessageSeparator: '#cc992d',
            linkColor: '#0d93ff',
            buttonBg: '#0177e7',
            buttonColor: '#ffffff',
            errorTextColor: '#ff6461',
            mentionHighlightBg: '#784098',
            mentionHighlightLink: '#a4ffeb',
            codeTheme: 'monokai',
        },
    },
};
exports.default = Preferences;
//# sourceMappingURL=preferences.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTypes = void 0;
exports.PostTypes = {
    CHANNEL_DELETED: 'system_channel_deleted',
    CHANNEL_UNARCHIVED: 'system_channel_restored',
    DISPLAYNAME_CHANGE: 'system_displayname_change',
    CONVERT_CHANNEL: 'system_convert_channel',
    EPHEMERAL: 'system_ephemeral',
    EPHEMERAL_ADD_TO_CHANNEL: 'system_ephemeral_add_to_channel',
    HEADER_CHANGE: 'system_header_change',
    PURPOSE_CHANGE: 'system_purpose_change',
    JOIN_LEAVE: 'system_join_leave',
    JOIN_CHANNEL: 'system_join_channel',
    GUEST_JOIN_CHANNEL: 'system_guest_join_channel',
    LEAVE_CHANNEL: 'system_leave_channel',
    ADD_REMOVE: 'system_add_remove',
    ADD_TO_CHANNEL: 'system_add_to_channel',
    ADD_GUEST_TO_CHANNEL: 'system_add_guest_to_chan',
    REMOVE_FROM_CHANNEL: 'system_remove_from_channel',
    JOIN_TEAM: 'system_join_team',
    LEAVE_TEAM: 'system_leave_team',
    ADD_TO_TEAM: 'system_add_to_team',
    REMOVE_FROM_TEAM: 'system_remove_from_team',
    COMBINED_USER_ACTIVITY: 'system_combined_user_activity',
    ME: 'me',
    ADD_BOT_TEAMS_CHANNELS: 'add_bot_teams_channels',
    SYSTEM_WARN_METRIC_STATUS: 'warn_metric_status',
};
exports.default = {
    POST_CHUNK_SIZE: 60,
    POST_DELETED: 'DELETED',
    SYSTEM_MESSAGE_PREFIX: 'system_',
    SYSTEM_AUTO_RESPONDER: 'system_auto_responder',
    POST_TYPES: exports.PostTypes,
    MESSAGE_TYPES: {
        POST: 'post',
        COMMENT: 'comment',
    },
    MAX_PREV_MSGS: 100,
    POST_COLLAPSE_TIMEOUT: 1000 * 60 * 5,
    IGNORE_POST_TYPES: [
        exports.PostTypes.ADD_REMOVE,
        exports.PostTypes.ADD_TO_CHANNEL,
        exports.PostTypes.CHANNEL_DELETED,
        exports.PostTypes.CHANNEL_UNARCHIVED,
        exports.PostTypes.JOIN_LEAVE,
        exports.PostTypes.JOIN_CHANNEL,
        exports.PostTypes.LEAVE_CHANNEL,
        exports.PostTypes.REMOVE_FROM_CHANNEL,
        exports.PostTypes.JOIN_TEAM,
        exports.PostTypes.LEAVE_TEAM,
        exports.PostTypes.ADD_TO_TEAM,
        exports.PostTypes.REMOVE_FROM_TEAM,
    ],
    USER_ACTIVITY_POST_TYPES: [
        exports.PostTypes.ADD_TO_CHANNEL,
        exports.PostTypes.JOIN_CHANNEL,
        exports.PostTypes.LEAVE_CHANNEL,
        exports.PostTypes.REMOVE_FROM_CHANNEL,
        exports.PostTypes.ADD_TO_TEAM,
        exports.PostTypes.JOIN_TEAM,
        exports.PostTypes.LEAVE_TEAM,
        exports.PostTypes.REMOVE_FROM_TEAM,
    ],
};
//# sourceMappingURL=posts.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var Files = {
    AUDIO_TYPES: ['mp3', 'wav', 'wma', 'm4a', 'flac', 'aac', 'ogg'],
    CODE_TYPES: ['as', 'applescript', 'osascript', 'scpt', 'bash', 'sh', 'zsh', 'clj', 'boot', 'cl2', 'cljc', 'cljs', 'cljs.hl', 'cljscm', 'cljx', 'hic', 'coffee', '_coffee', 'cake', 'cjsx', 'cson', 'iced', 'cpp', 'c', 'cc', 'h', 'c++', 'h++', 'hpp', 'cs', 'csharp', 'css', 'd', 'di', 'dart', 'delphi', 'dpr', 'dfm', 'pas', 'pascal', 'freepascal', 'lazarus', 'lpr', 'lfm', 'diff', 'django', 'jinja', 'dockerfile', 'docker', 'erl', 'f90', 'f95', 'fsharp', 'fs', 'gcode', 'nc', 'go', 'groovy', 'handlebars', 'hbs', 'html.hbs', 'html.handlebars', 'hs', 'hx', 'java', 'jsp', 'js', 'jsx', 'json', 'jl', 'kt', 'ktm', 'kts', 'less', 'lisp', 'lua', 'mk', 'mak', 'md', 'mkdown', 'mkd', 'matlab', 'm', 'mm', 'objc', 'obj-c', 'ml', 'perl', 'pl', 'php', 'php3', 'php4', 'php5', 'php6', 'ps', 'ps1', 'pp', 'py', 'gyp', 'r', 'ruby', 'rb', 'gemspec', 'podspec', 'thor', 'irb', 'rs', 'scala', 'scm', 'sld', 'scss', 'st', 'sql', 'swift', 'tex', 'vbnet', 'vb', 'bas', 'vbs', 'v', 'veo', 'xml', 'html', 'xhtml', 'rss', 'atom', 'xsl', 'plist', 'yaml'],
    IMAGE_TYPES: ['jpg', 'gif', 'bmp', 'png', 'jpeg', 'tiff', 'tif'],
    PATCH_TYPES: ['patch'],
    PDF_TYPES: ['pdf'],
    PRESENTATION_TYPES: ['ppt', 'pptx'],
    SPREADSHEET_TYPES: ['xlsx', 'csv'],
    TEXT_TYPES: ['txt', 'rtf'],
    VIDEO_TYPES: ['mp4', 'avi', 'webm', 'mkv', 'wmv', 'mpg', 'mov', 'flv'],
    WORD_TYPES: ['doc', 'docx'],
};
exports.default = Files;
//# sourceMappingURL=files.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
exports.default = {
    TEAM_TYPE_OPEN: 'O',
    TEAM_TYPE_INVITE: 'I',
    SORT_USERNAME_OPTION: 'Username',
};
//# sourceMappingURL=teams.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(6);
var key_mirror_1 = tslib_1.__importDefault(__webpack_require__(17));
exports.default = key_mirror_1.default({
    TOTAL_USERS: null,
    TOTAL_INACTIVE_USERS: null,
    TOTAL_PUBLIC_CHANNELS: null,
    TOTAL_PRIVATE_GROUPS: null,
    TOTAL_POSTS: null,
    TOTAL_TEAMS: null,
    TOTAL_FILE_POSTS: null,
    TOTAL_HASHTAG_POSTS: null,
    TOTAL_IHOOKS: null,
    TOTAL_OHOOKS: null,
    TOTAL_COMMANDS: null,
    TOTAL_SESSIONS: null,
    POST_PER_DAY: null,
    BOT_POST_PER_DAY: null,
    USERS_WITH_POSTS_PER_DAY: null,
    RECENTLY_ACTIVE_USERS: null,
    NEWLY_CREATED_USERS: null,
    TOTAL_WEBSOCKET_CONNECTIONS: null,
    TOTAL_MASTER_DB_CONNECTIONS: null,
    TOTAL_READ_DB_CONNECTIONS: null,
    DAILY_ACTIVE_USERS: null,
    MONTHLY_ACTIVE_USERS: null,
    REGISTERED_USERS: null,
});
//# sourceMappingURL=stats.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
/* eslint-disable header/header */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
function keyMirror(obj) {
    if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('keyMirror(...): Argument must be an object.');
    }
    var ret = {};
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        ret[key] = key;
    }
    return ret;
}
exports.default = keyMirror;
//# sourceMappingURL=key_mirror.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var values = {
    INVITE_USER: 'invite_user',
    ADD_USER_TO_TEAM: 'add_user_to_team',
    USE_SLASH_COMMANDS: 'use_slash_commands',
    MANAGE_SLASH_COMMANDS: 'manage_slash_commands',
    MANAGE_OTHERS_SLASH_COMMANDS: 'manage_others_slash_commands',
    CREATE_PUBLIC_CHANNEL: 'create_public_channel',
    CREATE_PRIVATE_CHANNEL: 'create_private_channel',
    MANAGE_PUBLIC_CHANNEL_MEMBERS: 'manage_public_channel_members',
    MANAGE_PRIVATE_CHANNEL_MEMBERS: 'manage_private_channel_members',
    READ_PUBLIC_CHANNEL_GROUPS: 'read_public_channel_groups',
    READ_PRIVATE_CHANNEL_GROUPS: 'read_private_channel_groups',
    ASSIGN_SYSTEM_ADMIN_ROLE: 'assign_system_admin_role',
    MANAGE_ROLES: 'manage_roles',
    MANAGE_TEAM_ROLES: 'manage_team_roles',
    MANAGE_CHANNEL_ROLES: 'manage_channel_roles',
    MANAGE_SYSTEM: 'manage_system',
    CREATE_DIRECT_CHANNEL: 'create_direct_channel',
    CREATE_GROUP_CHANNEL: 'create_group_channel',
    MANAGE_PUBLIC_CHANNEL_PROPERTIES: 'manage_public_channel_properties',
    MANAGE_PRIVATE_CHANNEL_PROPERTIES: 'manage_private_channel_properties',
    LIST_PUBLIC_TEAMS: 'list_public_teams',
    JOIN_PUBLIC_TEAMS: 'join_public_teams',
    LIST_PRIVATE_TEAMS: 'list_private_teams',
    JOIN_PRIVATE_TEAMS: 'join_private_teams',
    LIST_TEAM_CHANNELS: 'list_team_channels',
    JOIN_PUBLIC_CHANNELS: 'join_public_channels',
    DELETE_PUBLIC_CHANNEL: 'delete_public_channel',
    CONVERT_PUBLIC_CHANNEL_TO_PRIVATE: 'convert_public_channel_to_private',
    CONVERT_PRIVATE_CHANNEL_TO_PUBLIC: 'convert_private_channel_to_public',
    DELETE_PRIVATE_CHANNEL: 'delete_private_channel',
    EDIT_OTHER_USERS: 'edit_other_users',
    READ_CHANNEL: 'read_channel',
    READ_PUBLIC_CHANNEL: 'read_public_channel',
    ADD_REACTION: 'add_reaction',
    REMOVE_REACTION: 'remove_reaction',
    REMOVE_OTHERS_REACTIONS: 'remove_others_reactions',
    PERMANENT_DELETE_USER: 'permanent_delete_user',
    UPLOAD_FILE: 'upload_file',
    GET_PUBLIC_LINK: 'get_public_link',
    MANAGE_WEBHOOKS: 'manage_webhooks',
    MANAGE_OTHERS_WEBHOOKS: 'manage_others_webhooks',
    MANAGE_INCOMING_WEBHOOKS: 'manage_incoming_webhooks',
    MANAGE_OTHERS_INCOMING_WEBHOOKS: 'manage_others_incoming_webhooks',
    MANAGE_OUTGOING_WEBHOOKS: 'manage_outgoing_webhooks',
    MANAGE_OTHERS_OUTGOING_WEBHOOKS: 'manage_others_outgoing_webhooks',
    MANAGE_OAUTH: 'manage_oauth',
    MANAGE_SYSTEM_WIDE_OAUTH: 'manage_system_wide_oauth',
    CREATE_POST: 'create_post',
    CREATE_POST_PUBLIC: 'create_post_public',
    EDIT_POST: 'edit_post',
    EDIT_OTHERS_POSTS: 'edit_others_posts',
    DELETE_POST: 'delete_post',
    DELETE_OTHERS_POSTS: 'delete_others_posts',
    REMOVE_USER_FROM_TEAM: 'remove_user_from_team',
    CREATE_TEAM: 'create_team',
    MANAGE_TEAM: 'manage_team',
    IMPORT_TEAM: 'import_team',
    VIEW_TEAM: 'view_team',
    LIST_USERS_WITHOUT_TEAM: 'list_users_without_team',
    CREATE_USER_ACCESS_TOKEN: 'create_user_access_token',
    READ_USER_ACCESS_TOKEN: 'read_user_access_token',
    REVOKE_USER_ACCESS_TOKEN: 'revoke_user_access_token',
    MANAGE_JOBS: 'manage_jobs',
    MANAGE_EMOJIS: 'manage_emojis',
    MANAGE_OTHERS_EMOJIS: 'manage_others_emojis',
    CREATE_EMOJIS: 'create_emojis',
    DELETE_EMOJIS: 'delete_emojis',
    DELETE_OTHERS_EMOJIS: 'delete_others_emojis',
    VIEW_MEMBERS: 'view_members',
    INVITE_GUEST: 'invite_guest',
    PROMOTE_GUEST: 'promote_guest',
    DEMOTE_TO_GUEST: 'demote_to_guest',
    USE_CHANNEL_MENTIONS: 'use_channel_mentions',
    USE_GROUP_MENTIONS: 'use_group_mentions',
    READ_OTHER_USERS_TEAMS: 'read_other_users_teams',
    EDIT_BRAND: 'edit_brand',
    READ_JOBS: 'read_jobs',
    DOWNLOAD_COMPLIANCE_EXPORT_RESULT: 'download_compliance_export_result',
    SYSCONSOLE_READ_ABOUT: 'sysconsole_read_about',
    SYSCONSOLE_WRITE_ABOUT: 'sysconsole_write_about',
    SYSCONSOLE_READ_BILLING: 'sysconsole_read_billing',
    SYSCONSOLE_WRITE_BILLING: 'sysconsole_write_billing',
    SYSCONSOLE_READ_REPORTING: 'sysconsole_read_reporting',
    SYSCONSOLE_WRITE_REPORTING: 'sysconsole_write_reporting',
    SYSCONSOLE_READ_USERMANAGEMENT_USERS: 'sysconsole_read_user_management_users',
    SYSCONSOLE_WRITE_USERMANAGEMENT_USERS: 'sysconsole_write_user_management_users',
    SYSCONSOLE_READ_USERMANAGEMENT_GROUPS: 'sysconsole_read_user_management_groups',
    SYSCONSOLE_WRITE_USERMANAGEMENT_GROUPS: 'sysconsole_write_user_management_groups',
    SYSCONSOLE_READ_USERMANAGEMENT_TEAMS: 'sysconsole_read_user_management_teams',
    SYSCONSOLE_WRITE_USERMANAGEMENT_TEAMS: 'sysconsole_write_user_management_teams',
    SYSCONSOLE_READ_USERMANAGEMENT_CHANNELS: 'sysconsole_read_user_management_channels',
    SYSCONSOLE_WRITE_USERMANAGEMENT_CHANNELS: 'sysconsole_write_user_management_channels',
    SYSCONSOLE_READ_USERMANAGEMENT_PERMISSIONS: 'sysconsole_read_user_management_permissions',
    SYSCONSOLE_WRITE_USERMANAGEMENT_PERMISSIONS: 'sysconsole_write_user_management_permissions',
    SYSCONSOLE_READ_USERMANAGEMENT_SYSTEM_ROLES: 'sysconsole_read_user_management_system_roles',
    SYSCONSOLE_WRITE_USERMANAGEMENT_SYSTEM_ROLES: 'sysconsole_write_user_management_system_roles',
    SYSCONSOLE_READ_ENVIRONMENT: 'sysconsole_read_environment',
    SYSCONSOLE_WRITE_ENVIRONMENT: 'sysconsole_write_environment',
    SYSCONSOLE_READ_SITE: 'sysconsole_read_site',
    SYSCONSOLE_WRITE_SITE: 'sysconsole_write_site',
    SYSCONSOLE_READ_AUTHENTICATION: 'sysconsole_read_authentication',
    SYSCONSOLE_WRITE_AUTHENTICATION: 'sysconsole_write_authentication',
    SYSCONSOLE_READ_PLUGINS: 'sysconsole_read_plugins',
    SYSCONSOLE_WRITE_PLUGINS: 'sysconsole_write_plugins',
    SYSCONSOLE_READ_INTEGRATIONS: 'sysconsole_read_integrations',
    SYSCONSOLE_WRITE_INTEGRATIONS: 'sysconsole_write_integrations',
    SYSCONSOLE_READ_COMPLIANCE: 'sysconsole_read_compliance',
    SYSCONSOLE_WRITE_COMPLIANCE: 'sysconsole_write_compliance',
    SYSCONSOLE_READ_EXPERIMENTAL: 'sysconsole_read_experimental',
    SYSCONSOLE_WRITE_EXPERIMENTAL: 'sysconsole_write_experimental',
    CHANNEL_MODERATED_PERMISSIONS: {
        CREATE_POST: 'create_post',
        CREATE_REACTIONS: 'create_reactions',
        MANAGE_MEMBERS: 'manage_members',
        USE_CHANNEL_MENTIONS: 'use_channel_mentions',
    },
    MANAGE_BOTS: 'manage_bots',
    MANAGE_OTHERS_BOTS: 'manage_others_bots',
    SYSCONSOLE_READ_PERMISSIONS: [],
    SYSCONSOLE_WRITE_PERMISSIONS: [],
    MANAGE_SHARED_CHANNELS: 'manage_shared_channels',
    MANAGE_REMOTE_CLUSTERS: 'manage_remote_clusters',
    SYSCONSOLE_ANCILLARY_PERMISSIONS: {},
};
values.SYSCONSOLE_READ_PERMISSIONS = [
    values.SYSCONSOLE_READ_ABOUT,
    values.SYSCONSOLE_READ_BILLING,
    values.SYSCONSOLE_READ_REPORTING,
    values.SYSCONSOLE_READ_USERMANAGEMENT_USERS,
    values.SYSCONSOLE_READ_USERMANAGEMENT_GROUPS,
    values.SYSCONSOLE_READ_USERMANAGEMENT_TEAMS,
    values.SYSCONSOLE_READ_USERMANAGEMENT_CHANNELS,
    values.SYSCONSOLE_READ_USERMANAGEMENT_PERMISSIONS,
    values.SYSCONSOLE_READ_ENVIRONMENT,
    values.SYSCONSOLE_READ_SITE,
    values.SYSCONSOLE_READ_AUTHENTICATION,
    values.SYSCONSOLE_READ_PLUGINS,
    values.SYSCONSOLE_READ_INTEGRATIONS,
    values.SYSCONSOLE_READ_COMPLIANCE,
    values.SYSCONSOLE_READ_EXPERIMENTAL,
];
values.SYSCONSOLE_WRITE_PERMISSIONS = [
    values.SYSCONSOLE_WRITE_ABOUT,
    values.SYSCONSOLE_WRITE_BILLING,
    values.SYSCONSOLE_WRITE_REPORTING,
    values.SYSCONSOLE_WRITE_USERMANAGEMENT_USERS,
    values.SYSCONSOLE_WRITE_USERMANAGEMENT_GROUPS,
    values.SYSCONSOLE_WRITE_USERMANAGEMENT_TEAMS,
    values.SYSCONSOLE_WRITE_USERMANAGEMENT_CHANNELS,
    values.SYSCONSOLE_WRITE_USERMANAGEMENT_PERMISSIONS,
    values.SYSCONSOLE_WRITE_ENVIRONMENT,
    values.SYSCONSOLE_WRITE_SITE,
    values.SYSCONSOLE_WRITE_AUTHENTICATION,
    values.SYSCONSOLE_WRITE_PLUGINS,
    values.SYSCONSOLE_WRITE_INTEGRATIONS,
    values.SYSCONSOLE_WRITE_COMPLIANCE,
    values.SYSCONSOLE_WRITE_EXPERIMENTAL,
];
values.SYSCONSOLE_ANCILLARY_PERMISSIONS = (_a = {},
    _a[values.SYSCONSOLE_READ_USERMANAGEMENT_CHANNELS] = [
        values.READ_PUBLIC_CHANNEL,
        values.READ_CHANNEL,
        values.READ_PUBLIC_CHANNEL_GROUPS,
        values.READ_PRIVATE_CHANNEL_GROUPS,
    ],
    _a[values.SYSCONSOLE_READ_USERMANAGEMENT_USERS] = [
        values.READ_OTHER_USERS_TEAMS,
    ],
    _a[values.SYSCONSOLE_READ_USERMANAGEMENT_TEAMS] = [
        values.LIST_PRIVATE_TEAMS,
        values.LIST_PUBLIC_TEAMS,
        values.VIEW_TEAM,
    ],
    _a[values.SYSCONSOLE_WRITE_COMPLIANCE] = [
        values.MANAGE_JOBS,
    ],
    _a[values.SYSCONSOLE_READ_COMPLIANCE] = [
        values.READ_JOBS,
        values.DOWNLOAD_COMPLIANCE_EXPORT_RESULT,
    ],
    _a[values.SYSCONSOLE_READ_ENVIRONMENT] = [
        values.READ_JOBS,
    ],
    _a[values.SYSCONSOLE_READ_AUTHENTICATION] = [
        values.READ_JOBS,
    ],
    _a[values.SYSCONSOLE_READ_REPORTING] = [
        values.VIEW_TEAM,
    ],
    _a[values.SYSCONSOLE_WRITE_USERMANAGEMENT_USERS] = [
        values.EDIT_OTHER_USERS,
        values.DEMOTE_TO_GUEST,
        values.PROMOTE_GUEST,
    ],
    _a[values.SYSCONSOLE_WRITE_USERMANAGEMENT_CHANNELS] = [
        values.MANAGE_TEAM,
        values.MANAGE_PUBLIC_CHANNEL_PROPERTIES,
        values.MANAGE_PRIVATE_CHANNEL_PROPERTIES,
        values.MANAGE_PRIVATE_CHANNEL_MEMBERS,
        values.MANAGE_PUBLIC_CHANNEL_MEMBERS,
        values.DELETE_PRIVATE_CHANNEL,
        values.DELETE_PUBLIC_CHANNEL,
        values.MANAGE_CHANNEL_ROLES,
        values.CONVERT_PUBLIC_CHANNEL_TO_PRIVATE,
        values.CONVERT_PRIVATE_CHANNEL_TO_PUBLIC,
    ],
    _a[values.SYSCONSOLE_WRITE_USERMANAGEMENT_TEAMS] = [
        values.MANAGE_TEAM,
        values.MANAGE_TEAM_ROLES,
        values.REMOVE_USER_FROM_TEAM,
        values.JOIN_PRIVATE_TEAMS,
        values.JOIN_PUBLIC_TEAMS,
        values.ADD_USER_TO_TEAM,
    ],
    _a[values.SYSCONSOLE_WRITE_USERMANAGEMENT_GROUPS] = [
        values.MANAGE_TEAM,
        values.MANAGE_PRIVATE_CHANNEL_MEMBERS,
        values.MANAGE_PUBLIC_CHANNEL_MEMBERS,
        values.CONVERT_PUBLIC_CHANNEL_TO_PRIVATE,
        values.CONVERT_PRIVATE_CHANNEL_TO_PUBLIC,
    ],
    _a[values.SYSCONSOLE_WRITE_ENVIRONMENT] = [
        values.MANAGE_JOBS,
    ],
    _a[values.SYSCONSOLE_WRITE_SITE] = [
        values.EDIT_BRAND,
    ],
    _a);
exports.default = values;
//# sourceMappingURL=permissions.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
exports.default = {
    SORT_BY_NAME: 'name',
};
//# sourceMappingURL=emoji.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
exports.default = {
    PLUGIN_STATE_NOT_RUNNING: 0,
    PLUGIN_STATE_STARTING: 1,
    PLUGIN_STATE_RUNNING: 2,
    PLUGIN_STATE_FAILED_TO_START: 3,
    PLUGIN_STATE_FAILED_TO_STAY_RUNNING: 4,
    PLUGIN_STATE_STOPPING: 5,
};
//# sourceMappingURL=plugins.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var Groups;
(function (Groups) {
    Groups["SYNCABLE_TYPE_TEAM"] = "team";
    Groups["SYNCABLE_TYPE_CHANNEL"] = "channel";
})(Groups || (Groups = {}));
exports.default = Groups;
//# sourceMappingURL=groups.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
exports.default = {
    IGNORE_CHANNEL_MENTIONS_ON: 'on',
    IGNORE_CHANNEL_MENTIONS_OFF: 'off',
    IGNORE_CHANNEL_MENTIONS_DEFAULT: 'default',
};
//# sourceMappingURL=users.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    MEMBERS: 'members',
    GUESTS: 'guests',
    ADMINS: 'admins',
};
//# sourceMappingURL=roles.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    THREADS_CHUNK_SIZE: 20,
};
//# sourceMappingURL=threads.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getCurrentUserId = exports.getCurrentUser = exports.getMembersInTeam = exports.getMembersInChannel = exports.getMyCurrentChannelMembership = exports.getMyChannelMemberships = exports.getCurrentChannelId = void 0;
var reselect_1 = __webpack_require__(7);
// Channels
function getCurrentChannelId(state) {
    return state.entities.channels.currentChannelId;
}
exports.getCurrentChannelId = getCurrentChannelId;
function getMyChannelMemberships(state) {
    return state.entities.channels.myMembers;
}
exports.getMyChannelMemberships = getMyChannelMemberships;
exports.getMyCurrentChannelMembership = reselect_1.createSelector(getCurrentChannelId, getMyChannelMemberships, function (currentChannelId, channelMemberships) {
    return channelMemberships[currentChannelId] || null;
});
function getMembersInChannel(state, channelId) {
    var _a, _b;
    return ((_b = (_a = state.entities.channels) === null || _a === void 0 ? void 0 : _a.membersInChannel) === null || _b === void 0 ? void 0 : _b[channelId]) || {};
}
exports.getMembersInChannel = getMembersInChannel;
// Teams
function getMembersInTeam(state, teamId) {
    var _a, _b;
    return ((_b = (_a = state.entities.teams) === null || _a === void 0 ? void 0 : _a.membersInTeam) === null || _b === void 0 ? void 0 : _b[teamId]) || {};
}
exports.getMembersInTeam = getMembersInTeam;
// Users
function getCurrentUser(state) {
    return state.entities.users.profiles[getCurrentUserId(state)];
}
exports.getCurrentUser = getCurrentUser;
function getCurrentUserId(state) {
    return state.entities.users.currentUserId;
}
exports.getCurrentUserId = getCurrentUserId;
function getUsers(state) {
    return state.entities.users.profiles;
}
exports.getUsers = getUsers;
//# sourceMappingURL=common.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldAutocloseDMs = exports.shouldShowUnreadsCategory = exports.getSidebarPreferences = exports.makeGetStyleFromTheme = exports.getTheme = exports.getTeammateNameDisplaySetting = exports.getVisibleGroupIds = exports.getVisibleTeammate = exports.getFavoritesPreferences = exports.getGroupShowPreferences = exports.getDirectShowPreferences = exports.makeGetCategory = exports.getInt = exports.getBool = exports.get = exports.getMyPreferences = void 0;
var tslib_1 = __webpack_require__(6);
var reselect_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(8);
var general_1 = __webpack_require__(27);
var teams_1 = __webpack_require__(30);
var helpers_1 = __webpack_require__(28);
var preference_utils_1 = __webpack_require__(35);
function getMyPreferences(state) {
    return state.entities.preferences.myPreferences;
}
exports.getMyPreferences = getMyPreferences;
function get(state, category, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    var key = preference_utils_1.getPreferenceKey(category, name);
    var prefs = getMyPreferences(state);
    if (!(key in prefs)) {
        return defaultValue;
    }
    return prefs[key].value;
}
exports.get = get;
function getBool(state, category, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var value = get(state, category, name, String(defaultValue));
    return value !== 'false';
}
exports.getBool = getBool;
function getInt(state, category, name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = 0; }
    var value = get(state, category, name, defaultValue);
    return parseInt(value, 10);
}
exports.getInt = getInt;
function makeGetCategory() {
    return reselect_1.createSelector(getMyPreferences, function (state, category) { return category; }, function (preferences, category) {
        var prefix = category + '--';
        var prefsInCategory = [];
        for (var key in preferences) {
            if (key.startsWith(prefix)) {
                prefsInCategory.push(preferences[key]);
            }
        }
        return prefsInCategory;
    });
}
exports.makeGetCategory = makeGetCategory;
var getDirectShowCategory = makeGetCategory();
function getDirectShowPreferences(state) {
    return getDirectShowCategory(state, constants_1.Preferences.CATEGORY_DIRECT_CHANNEL_SHOW);
}
exports.getDirectShowPreferences = getDirectShowPreferences;
var getGroupShowCategory = makeGetCategory();
function getGroupShowPreferences(state) {
    return getGroupShowCategory(state, constants_1.Preferences.CATEGORY_GROUP_CHANNEL_SHOW);
}
exports.getGroupShowPreferences = getGroupShowPreferences;
var getFavoritesCategory = makeGetCategory();
function getFavoritesPreferences(state) {
    var favorites = getFavoritesCategory(state, constants_1.Preferences.CATEGORY_FAVORITE_CHANNEL);
    return favorites.filter(function (f) { return f.value === 'true'; }).map(function (f) { return f.name; });
}
exports.getFavoritesPreferences = getFavoritesPreferences;
exports.getVisibleTeammate = reselect_1.createSelector(getDirectShowPreferences, function (direct) {
    return direct.filter(function (dm) { return dm.value === 'true' && dm.name; }).map(function (dm) { return dm.name; });
});
exports.getVisibleGroupIds = reselect_1.createSelector(getGroupShowPreferences, function (groups) {
    return groups.filter(function (dm) { return dm.value === 'true' && dm.name; }).map(function (dm) { return dm.name; });
});
exports.getTeammateNameDisplaySetting = reselect_1.createSelector(general_1.getConfig, getMyPreferences, general_1.getLicense, function (config, preferences, license) {
    var useAdminTeammateNameDisplaySetting = (license && license.LockTeammateNameDisplay === 'true') && config.LockTeammateNameDisplay === 'true';
    var key = preference_utils_1.getPreferenceKey(constants_1.Preferences.CATEGORY_DISPLAY_SETTINGS, constants_1.Preferences.NAME_NAME_FORMAT);
    if (preferences[key] && !useAdminTeammateNameDisplaySetting) {
        return preferences[key].value;
    }
    else if (config.TeammateNameDisplay) {
        return config.TeammateNameDisplay;
    }
    return constants_1.General.TEAMMATE_NAME_DISPLAY.SHOW_USERNAME;
});
var getThemePreference = reselect_1.createSelector(getMyPreferences, teams_1.getCurrentTeamId, function (myPreferences, currentTeamId) {
    // Prefer the user's current team-specific theme over the user's current global theme
    var themePreference;
    if (currentTeamId) {
        themePreference = myPreferences[preference_utils_1.getPreferenceKey(constants_1.Preferences.CATEGORY_THEME, currentTeamId)];
    }
    if (!themePreference) {
        themePreference = myPreferences[preference_utils_1.getPreferenceKey(constants_1.Preferences.CATEGORY_THEME, '')];
    }
    return themePreference;
});
var getDefaultTheme = reselect_1.createSelector(general_1.getConfig, function (config) {
    if (config.DefaultTheme && config.DefaultTheme in constants_1.Preferences.THEMES) {
        var theme = constants_1.Preferences.THEMES[config.DefaultTheme];
        if (theme) {
            return theme;
        }
    }
    // If no config.DefaultTheme or value doesn't refer to a valid theme name...
    return constants_1.Preferences.THEMES.default;
});
exports.getTheme = helpers_1.createShallowSelector(getThemePreference, getDefaultTheme, function (themePreference, defaultTheme) {
    var e_1, _a;
    var _b, _c;
    var themeValue = (_b = themePreference === null || themePreference === void 0 ? void 0 : themePreference.value) !== null && _b !== void 0 ? _b : defaultTheme;
    // A custom theme will be a JSON-serialized object stored in a preference
    // At this point, the theme should be a plain object
    var theme = typeof themeValue === 'string' ? JSON.parse(themeValue) : themeValue;
    // If this is a system theme, find it in case the user's theme is missing any fields
    if (theme.type && theme.type !== 'custom') {
        var match = Object.values(constants_1.Preferences.THEMES).find(function (v) { return v.type === theme.type; });
        if (match) {
            if (!match.mentionBg) {
                match.mentionBg = match.mentionBj;
            }
            return match;
        }
    }
    try {
        for (var _d = tslib_1.__values(Object.keys(defaultTheme)), _e = _d.next(); !_e.done; _e = _d.next()) {
            var key = _e.value;
            if (theme[key]) {
                // Fix a case where upper case theme colours are rendered as black
                theme[key] = (_c = theme[key]) === null || _c === void 0 ? void 0 : _c.toLowerCase();
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // Backwards compatability with old name
    if (!theme.mentionBg) {
        theme.mentionBg = theme.mentionBj;
    }
    return Object.assign({}, defaultTheme, theme);
});
function makeGetStyleFromTheme() {
    return reselect_1.createSelector(exports.getTheme, function (state, getStyleFromTheme) { return getStyleFromTheme; }, function (theme, getStyleFromTheme) {
        return getStyleFromTheme(theme);
    });
}
exports.makeGetStyleFromTheme = makeGetStyleFromTheme;
var defaultSidebarPrefs = {
    grouping: 'by_type',
    unreads_at_top: 'true',
    favorite_at_top: 'true',
    sorting: 'alpha',
};
exports.getSidebarPreferences = reselect_1.createSelector(function (state) {
    var config = general_1.getConfig(state);
    return config.ExperimentalGroupUnreadChannels !== constants_1.General.DISABLED && getBool(state, constants_1.Preferences.CATEGORY_SIDEBAR_SETTINGS, 'show_unread_section', config.ExperimentalGroupUnreadChannels === constants_1.General.DEFAULT_ON);
}, function (state) {
    return get(state, constants_1.Preferences.CATEGORY_SIDEBAR_SETTINGS, '', null);
}, function (showUnreadSection, sidebarPreference) {
    var sidebarPrefs = JSON.parse(sidebarPreference);
    if (sidebarPrefs === null) {
        // Support unread settings for old implementation
        sidebarPrefs = tslib_1.__assign(tslib_1.__assign({}, defaultSidebarPrefs), { unreads_at_top: showUnreadSection ? 'true' : 'false' });
    }
    return sidebarPrefs;
});
// shouldShowUnreadsCategory returns true if the user has unereads grouped separately with the new sidebar enabled.
exports.shouldShowUnreadsCategory = reselect_1.createSelector(function (state) { return get(state, constants_1.Preferences.CATEGORY_SIDEBAR_SETTINGS, constants_1.Preferences.SHOW_UNREAD_SECTION); }, function (state) { return get(state, constants_1.Preferences.CATEGORY_SIDEBAR_SETTINGS, ''); }, function (state) { return general_1.getConfig(state).ExperimentalGroupUnreadChannels; }, function (userPreference, oldUserPreference, serverDefault) {
    // Prefer the show_unread_section user preference over the previous version
    if (userPreference) {
        return userPreference === 'true';
    }
    if (oldUserPreference) {
        return JSON.parse(oldUserPreference).unreads_at_top === 'true';
    }
    // The user setting is not set, so use the system default
    return serverDefault === constants_1.General.DEFAULT_ON;
});
function shouldAutocloseDMs(state) {
    var config = general_1.getConfig(state);
    if (!config.CloseUnusedDirectMessages || config.CloseUnusedDirectMessages === 'false') {
        return false;
    }
    var preference = get(state, constants_1.Preferences.CATEGORY_SIDEBAR_SETTINGS, constants_1.Preferences.CHANNEL_SIDEBAR_AUTOCLOSE_DMS, constants_1.Preferences.AUTOCLOSE_DMS_ENABLED);
    return preference === constants_1.Preferences.AUTOCLOSE_DMS_ENABLED;
}
exports.shouldAutocloseDMs = shouldAutocloseDMs;
//# sourceMappingURL=preferences.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerVersion = exports.getManagedResourcePaths = exports.getAutolinkedUrlSchemes = exports.canDownloadFilesOnMobile = exports.canUploadFilesOnMobile = exports.hasNewPermissions = exports.isCompatibleWithJoinViewTeamPermissions = exports.getSubscriptionStats = exports.warnMetricsStatus = exports.getCurrentUrl = exports.getSupportedTimezones = exports.getLicense = exports.getFeatureFlagValue = exports.getConfig = void 0;
var tslib_1 = __webpack_require__(6);
var reselect_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(8);
var helpers_1 = __webpack_require__(28);
function getConfig(state) {
    return state.entities.general.config;
}
exports.getConfig = getConfig;
/**
 * Safely get value of a specific or known FeatureFlag
 */
function getFeatureFlagValue(state, key) {
    var _a;
    return (_a = getConfig(state)) === null || _a === void 0 ? void 0 : _a["FeatureFlag" + key];
}
exports.getFeatureFlagValue = getFeatureFlagValue;
function getLicense(state) {
    return state.entities.general.license;
}
exports.getLicense = getLicense;
function getSupportedTimezones(state) {
    return state.entities.general.timezones;
}
exports.getSupportedTimezones = getSupportedTimezones;
function getCurrentUrl(state) {
    return state.entities.general.credentials.url;
}
exports.getCurrentUrl = getCurrentUrl;
function warnMetricsStatus(state) {
    return state.entities.general.warnMetricsStatus;
}
exports.warnMetricsStatus = warnMetricsStatus;
function getSubscriptionStats(state) {
    return state.entities.cloud.subscriptionStats;
}
exports.getSubscriptionStats = getSubscriptionStats;
function isCompatibleWithJoinViewTeamPermissions(state) {
    var version = state.entities.general.serverVersion;
    return helpers_1.isMinimumServerVersion(version, 5, 10, 0) ||
        (version.indexOf('dev') !== -1 && helpers_1.isMinimumServerVersion(version, 5, 8, 0)) ||
        (version.match(/^5.8.\d.\d\d\d\d.*$/) !== null && helpers_1.isMinimumServerVersion(version, 5, 8, 0));
}
exports.isCompatibleWithJoinViewTeamPermissions = isCompatibleWithJoinViewTeamPermissions;
function hasNewPermissions(state) {
    var version = state.entities.general.serverVersion;
    // FIXME This must be changed to 4, 9, 0 before we generate the 4.9.0 release
    return helpers_1.isMinimumServerVersion(version, 4, 9, 0) ||
        (version.indexOf('dev') !== -1 && helpers_1.isMinimumServerVersion(version, 4, 8, 0)) ||
        (version.match(/^4.8.\d.\d\d\d\d.*$/) !== null && helpers_1.isMinimumServerVersion(version, 4, 8, 0));
}
exports.hasNewPermissions = hasNewPermissions;
exports.canUploadFilesOnMobile = reselect_1.createSelector(getConfig, getLicense, function (config, license) {
    // Defaults to true if either setting doesn't exist
    return config.EnableFileAttachments !== 'false' &&
        (license.IsLicensed === 'false' || license.Compliance === 'false' || config.EnableMobileFileUpload !== 'false');
});
exports.canDownloadFilesOnMobile = reselect_1.createSelector(getConfig, getLicense, function (config, license) {
    // Defaults to true if the setting doesn't exist
    return license.IsLicensed === 'false' || license.Compliance === 'false' || config.EnableMobileFileDownload !== 'false';
});
exports.getAutolinkedUrlSchemes = reselect_1.createSelector(getConfig, function (config) {
    if (!config.CustomUrlSchemes) {
        return constants_1.General.DEFAULT_AUTOLINKED_URL_SCHEMES;
    }
    return tslib_1.__spread(constants_1.General.DEFAULT_AUTOLINKED_URL_SCHEMES, config.CustomUrlSchemes.split(','));
});
exports.getManagedResourcePaths = reselect_1.createSelector(getConfig, function (config) {
    if (!config.ManagedResourcePaths) {
        return [];
    }
    return config.ManagedResourcePaths.split(',').map(function (path) { return path.trim(); });
});
var getServerVersion = function (state) {
    return state.entities.general.serverVersion;
};
exports.getServerVersion = getServerVersion;
//# sourceMappingURL=general.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueryString = exports.isEmail = exports.generateId = exports.isMinimumServerVersion = exports.createShallowSelector = exports.createIdsSelector = exports.memoizeResult = void 0;
var tslib_1 = __webpack_require__(6);
var reselect = tslib_1.__importStar(__webpack_require__(7));
var shallow_equals_1 = tslib_1.__importDefault(__webpack_require__(29));
// eslint-disable-next-line @typescript-eslint/ban-types
function memoizeResult(func) {
    var lastArgs = null;
    var lastResult = null;
    // we reference arguments instead of spreading them for performance reasons
    return function memoizedFunc() {
        if (!shallow_equals_1.default(lastArgs, arguments)) { //eslint-disable-line prefer-rest-params
            //eslint-disable-line prefer-rest-params
            // apply arguments instead of spreading for performance.
            var result = Reflect.apply(func, null, arguments); //eslint-disable-line prefer-rest-params
            if (!shallow_equals_1.default(lastResult, result)) {
                lastResult = result;
            }
        }
        lastArgs = arguments; //eslint-disable-line prefer-rest-params
        return lastResult;
    };
}
exports.memoizeResult = memoizeResult;
// Use this selector when you want a shallow comparison of the arguments and you want to memoize the result
// try and use this only when your selector returns an array of ids
exports.createIdsSelector = reselect.createSelectorCreator(memoizeResult);
// Use this selector when you want a shallow comparison of the arguments and you don't need to memoize the result
exports.createShallowSelector = reselect.createSelectorCreator(reselect.defaultMemoize, shallow_equals_1.default);
// isMinimumServerVersion will return true if currentVersion is equal to higher or than the
// the provided minimum version. A non-equal major version will ignore minor and dot
// versions, and a non-equal minor version will ignore dot version.
// currentVersion is a string, e.g '4.6.0'
// minMajorVersion, minMinorVersion, minDotVersion are integers
var isMinimumServerVersion = function (currentVersion, minMajorVersion, minMinorVersion, minDotVersion) {
    if (minMajorVersion === void 0) { minMajorVersion = 0; }
    if (minMinorVersion === void 0) { minMinorVersion = 0; }
    if (minDotVersion === void 0) { minDotVersion = 0; }
    if (!currentVersion || typeof currentVersion !== 'string') {
        return false;
    }
    var split = currentVersion.split('.');
    var major = parseInt(split[0], 10);
    var minor = parseInt(split[1] || '0', 10);
    var dot = parseInt(split[2] || '0', 10);
    if (major > minMajorVersion) {
        return true;
    }
    if (major < minMajorVersion) {
        return false;
    }
    // Major version is equal, check minor
    if (minor > minMinorVersion) {
        return true;
    }
    if (minor < minMinorVersion) {
        return false;
    }
    // Minor version is equal, check dot
    if (dot > minDotVersion) {
        return true;
    }
    if (dot < minDotVersion) {
        return false;
    }
    // Dot version is equal
    return true;
};
exports.isMinimumServerVersion = isMinimumServerVersion;
// Generates a RFC-4122 version 4 compliant globally unique identifier.
function generateId() {
    // implementation taken from http://stackoverflow.com/a/2117523
    var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    id = id.replace(/[xy]/g, function (c) {
        var r = Math.floor(Math.random() * 16);
        var v;
        if (c === 'x') {
            v = r;
        }
        else {
            // eslint-disable-next-line no-mixed-operators
            v = r & 0x3 | 0x8;
        }
        return v.toString(16);
    });
    return id;
}
exports.generateId = generateId;
function isEmail(email) {
    // writing a regex to match all valid email addresses is really, really hard. (see http://stackoverflow.com/a/201378)
    // this regex ensures:
    // - at least one character that is not a space, comma, or @ symbol
    // - followed by a single @ symbol
    // - followed by at least one character that is not a space, comma, or @ symbol
    // this prevents <Outlook Style> outlook.style@domain.com addresses and multiple comma-separated addresses from being accepted
    return (/^[^ ,@]+@[^ ,@]+$/).test(email);
}
exports.isEmail = isEmail;
function buildQueryString(parameters) {
    var keys = Object.keys(parameters);
    if (keys.length === 0) {
        return '';
    }
    var query = '?';
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        query += key + '=' + encodeURIComponent(parameters[key]);
        if (i < keys.length - 1) {
            query += '&';
        }
    }
    return query;
}
exports.buildQueryString = buildQueryString;
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = shallow

function shallow(a, b, compare) {
  var aIsNull = a === null
  var bIsNull = b === null

  if (aIsNull !== bIsNull) return false

  var aIsArray = Array.isArray(a)
  var bIsArray = Array.isArray(b)

  if (aIsArray !== bIsArray) return false

  var aTypeof = typeof a
  var bTypeof = typeof b

  if (aTypeof !== bTypeof) return false
  if (flat(aTypeof)) return compare
    ? compare(a, b)
    : a === b

  return aIsArray
    ? shallowArray(a, b, compare)
    : shallowObject(a, b, compare)
}

function shallowArray(a, b, compare) {
  var l = a.length
  if (l !== b.length) return false

  if (compare) {
    for (var i = 0; i < l; i++)
      if (!compare(a[i], b[i])) return false
  } else {
    for (var i = 0; i < l; i++) {
      if (a[i] !== b[i]) return false
    }
  }

  return true
}

function shallowObject(a, b, compare) {
  var ka = 0
  var kb = 0

  if (compare) {
    for (var key in a) {
      if (
        a.hasOwnProperty(key) &&
        !compare(a[key], b[key])
      ) return false

      ka++
    }
  } else {
    for (var key in a) {
      if (
        a.hasOwnProperty(key) &&
        a[key] !== b[key]
      ) return false

      ka++
    }
  }

  for (var key in b) {
    if (b.hasOwnProperty(key)) kb++
  }

  return ka === kb
}

function flat(type) {
  return (
    type !== 'function' &&
    type !== 'object'
  )
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetBadgeCountForTeamId = exports.getChannelDrawerBadgeCount = exports.getMyTeamsCount = exports.getMySortedTeamIds = exports.getSortedJoinableTeams = exports.getJoinableTeams = exports.getJoinableTeamIds = exports.getSortedListableTeams = exports.getListableTeams = exports.getListableTeamIds = exports.getTeamMember = exports.getMembersInCurrentTeam = exports.getMyTeamMember = exports.getMyTeams = exports.getCurrentTeamStats = exports.getCurrentRelativeTeamUrl = exports.getCurrentTeamUrl = exports.isCurrentUserCurrentTeamAdmin = exports.getCurrentTeamMembership = exports.getTeam = exports.getCurrentTeam = exports.getTeamsList = exports.getMembersInTeams = exports.getTeamMemberships = exports.getTeamStats = exports.getTeams = exports.getTeamByName = exports.getCurrentTeamId = void 0;
var tslib_1 = __webpack_require__(6);
var reselect_1 = __webpack_require__(7);
var constants_1 = __webpack_require__(8);
var general_1 = __webpack_require__(27);
var roles_helpers_1 = __webpack_require__(31);
var helpers_1 = __webpack_require__(28);
var user_utils_1 = __webpack_require__(32);
var team_utils_1 = __webpack_require__(34);
function getCurrentTeamId(state) {
    return state.entities.teams.currentTeamId;
}
exports.getCurrentTeamId = getCurrentTeamId;
function getTeamByName(state, name) {
    var teams = getTeams(state);
    return Object.values(teams).find(function (team) { return team.name === name; });
}
exports.getTeamByName = getTeamByName;
function getTeams(state) {
    return state.entities.teams.teams;
}
exports.getTeams = getTeams;
function getTeamStats(state) {
    return state.entities.teams.stats;
}
exports.getTeamStats = getTeamStats;
function getTeamMemberships(state) {
    return state.entities.teams.myMembers;
}
exports.getTeamMemberships = getTeamMemberships;
function getMembersInTeams(state) {
    return state.entities.teams.membersInTeam;
}
exports.getMembersInTeams = getMembersInTeams;
exports.getTeamsList = reselect_1.createSelector(getTeams, function (teams) {
    return Object.values(teams);
});
exports.getCurrentTeam = reselect_1.createSelector(getTeams, getCurrentTeamId, function (teams, currentTeamId) {
    return teams[currentTeamId];
});
function getTeam(state, id) {
    var teams = getTeams(state);
    return teams[id];
}
exports.getTeam = getTeam;
exports.getCurrentTeamMembership = reselect_1.createSelector(getCurrentTeamId, getTeamMemberships, function (currentTeamId, teamMemberships) {
    return teamMemberships[currentTeamId];
});
exports.isCurrentUserCurrentTeamAdmin = reselect_1.createSelector(exports.getCurrentTeamMembership, function (member) {
    if (member) {
        var roles = member.roles || '';
        return user_utils_1.isTeamAdmin(roles);
    }
    return false;
});
exports.getCurrentTeamUrl = reselect_1.createSelector(general_1.getCurrentUrl, exports.getCurrentTeam, function (state) { return general_1.getConfig(state).SiteURL; }, function (currentURL, currentTeam, siteURL) {
    var rootURL = "" + (currentURL || siteURL);
    if (!currentTeam) {
        return rootURL;
    }
    return rootURL + "/" + currentTeam.name;
});
exports.getCurrentRelativeTeamUrl = reselect_1.createSelector(exports.getCurrentTeam, function (currentTeam) {
    if (!currentTeam) {
        return '/';
    }
    return "/" + currentTeam.name;
});
exports.getCurrentTeamStats = reselect_1.createSelector(getCurrentTeamId, getTeamStats, function (currentTeamId, teamStats) {
    return teamStats[currentTeamId];
});
exports.getMyTeams = reselect_1.createSelector(getTeams, getTeamMemberships, function (teams, members) {
    return Object.values(teams).filter(function (t) { return members[t.id] && t.delete_at === 0; });
});
exports.getMyTeamMember = reselect_1.createSelector(getTeamMemberships, function (state, teamId) { return teamId; }, function (teamMemberships, teamId) {
    return teamMemberships[teamId] || {};
});
exports.getMembersInCurrentTeam = reselect_1.createSelector(getCurrentTeamId, getMembersInTeams, function (currentTeamId, teamMembers) {
    return teamMembers[currentTeamId];
});
function getTeamMember(state, teamId, userId) {
    var members = getMembersInTeams(state)[teamId];
    if (members) {
        return members[userId];
    }
    return null;
}
exports.getTeamMember = getTeamMember;
exports.getListableTeamIds = helpers_1.createIdsSelector(getTeams, getTeamMemberships, function (state) { return roles_helpers_1.haveISystemPermission(state, { permission: constants_1.Permissions.LIST_PUBLIC_TEAMS }); }, function (state) { return roles_helpers_1.haveISystemPermission(state, { permission: constants_1.Permissions.LIST_PRIVATE_TEAMS }); }, general_1.isCompatibleWithJoinViewTeamPermissions, function (teams, myMembers, canListPublicTeams, canListPrivateTeams, compatibleWithJoinViewTeamPermissions) {
    return Object.keys(teams).filter(function (id) {
        var team = teams[id];
        var member = myMembers[id];
        var canList = team.allow_open_invite;
        if (compatibleWithJoinViewTeamPermissions) {
            canList = (canListPrivateTeams && !team.allow_open_invite) || (canListPublicTeams && team.allow_open_invite);
        }
        return team.delete_at === 0 && canList && !member;
    });
});
exports.getListableTeams = reselect_1.createSelector(getTeams, exports.getListableTeamIds, function (teams, listableTeamIds) {
    return listableTeamIds.map(function (id) { return teams[id]; });
});
exports.getSortedListableTeams = reselect_1.createSelector(getTeams, exports.getListableTeamIds, function (state, locale) { return locale; }, function (teams, listableTeamIds, locale) {
    var e_1, _a;
    var listableTeams = {};
    try {
        for (var listableTeamIds_1 = tslib_1.__values(listableTeamIds), listableTeamIds_1_1 = listableTeamIds_1.next(); !listableTeamIds_1_1.done; listableTeamIds_1_1 = listableTeamIds_1.next()) {
            var id = listableTeamIds_1_1.value;
            listableTeams[id] = teams[id];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (listableTeamIds_1_1 && !listableTeamIds_1_1.done && (_a = listableTeamIds_1.return)) _a.call(listableTeamIds_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return Object.values(listableTeams).sort(team_utils_1.sortTeamsWithLocale(locale));
});
exports.getJoinableTeamIds = helpers_1.createIdsSelector(getTeams, getTeamMemberships, function (state) { return roles_helpers_1.haveISystemPermission(state, { permission: constants_1.Permissions.JOIN_PUBLIC_TEAMS }); }, function (state) { return roles_helpers_1.haveISystemPermission(state, { permission: constants_1.Permissions.JOIN_PRIVATE_TEAMS }); }, general_1.isCompatibleWithJoinViewTeamPermissions, function (teams, myMembers, canJoinPublicTeams, canJoinPrivateTeams, compatibleWithJoinViewTeamPermissions) {
    return Object.keys(teams).filter(function (id) {
        var team = teams[id];
        var member = myMembers[id];
        var canJoin = team.allow_open_invite;
        if (compatibleWithJoinViewTeamPermissions) {
            canJoin = (canJoinPrivateTeams && !team.allow_open_invite) || (canJoinPublicTeams && team.allow_open_invite);
        }
        return team.delete_at === 0 && canJoin && !member;
    });
});
exports.getJoinableTeams = reselect_1.createSelector(getTeams, exports.getJoinableTeamIds, function (teams, joinableTeamIds) {
    return joinableTeamIds.map(function (id) { return teams[id]; });
});
exports.getSortedJoinableTeams = reselect_1.createSelector(getTeams, exports.getJoinableTeamIds, function (state, locale) { return locale; }, function (teams, joinableTeamIds, locale) {
    var e_2, _a;
    var joinableTeams = {};
    try {
        for (var joinableTeamIds_1 = tslib_1.__values(joinableTeamIds), joinableTeamIds_1_1 = joinableTeamIds_1.next(); !joinableTeamIds_1_1.done; joinableTeamIds_1_1 = joinableTeamIds_1.next()) {
            var id = joinableTeamIds_1_1.value;
            joinableTeams[id] = teams[id];
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (joinableTeamIds_1_1 && !joinableTeamIds_1_1.done && (_a = joinableTeamIds_1.return)) _a.call(joinableTeamIds_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return Object.values(joinableTeams).sort(team_utils_1.sortTeamsWithLocale(locale));
});
exports.getMySortedTeamIds = helpers_1.createIdsSelector(exports.getMyTeams, function (state, locale) { return locale; }, function (teams, locale) {
    return teams.sort(team_utils_1.sortTeamsWithLocale(locale)).map(function (t) { return t.id; });
});
function getMyTeamsCount(state) {
    return exports.getMyTeams(state).length;
}
exports.getMyTeamsCount = getMyTeamsCount;
// returns the badge number to show (excluding the current team)
// > 0 means is returning the mention count
// 0 means that there are no unread messages
// -1 means that there are unread messages but no mentions
exports.getChannelDrawerBadgeCount = reselect_1.createSelector(getCurrentTeamId, getTeamMemberships, function (currentTeamId, teamMembers) {
    var mentionCount = 0;
    var messageCount = 0;
    Object.values(teamMembers).forEach(function (m) {
        if (m.team_id !== currentTeamId) {
            mentionCount += (m.mention_count || 0);
            messageCount += (m.msg_count || 0);
        }
    });
    var badgeCount = 0;
    if (mentionCount) {
        badgeCount = mentionCount;
    }
    else if (messageCount) {
        badgeCount = -1;
    }
    return badgeCount;
});
// returns the badge for a team
// > 0 means is returning the mention count
// 0 means that there are no unread messages
// -1 means that there are unread messages but no mentions
function makeGetBadgeCountForTeamId() {
    return reselect_1.createSelector(getTeamMemberships, function (state, id) { return id; }, function (members, teamId) {
        var member = members[teamId];
        var badgeCount = 0;
        if (member) {
            if (member.mention_count) {
                badgeCount = member.mention_count;
            }
            else if (member.msg_count) {
                badgeCount = -1;
            }
        }
        return badgeCount;
    });
}
exports.makeGetBadgeCountForTeamId = makeGetBadgeCountForTeamId;
//# sourceMappingURL=teams.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.haveISystemPermission = exports.getMySystemPermissions = exports.getMySystemRoles = exports.getRoles = void 0;
var tslib_1 = __webpack_require__(6);
var reselect_1 = __webpack_require__(7);
var common_1 = __webpack_require__(25);
function getRoles(state) {
    return state.entities.roles.roles;
}
exports.getRoles = getRoles;
exports.getMySystemRoles = reselect_1.createSelector(common_1.getCurrentUser, function (user) {
    if (user) {
        return new Set(user.roles.split(' '));
    }
    return new Set();
});
exports.getMySystemPermissions = reselect_1.createSelector(exports.getMySystemRoles, getRoles, function (mySystemRoles, roles) {
    var e_1, _a, e_2, _b;
    var permissions = new Set();
    try {
        for (var mySystemRoles_1 = tslib_1.__values(mySystemRoles), mySystemRoles_1_1 = mySystemRoles_1.next(); !mySystemRoles_1_1.done; mySystemRoles_1_1 = mySystemRoles_1.next()) {
            var roleName = mySystemRoles_1_1.value;
            if (roles[roleName]) {
                try {
                    for (var _c = (e_2 = void 0, tslib_1.__values(roles[roleName].permissions)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var permission = _d.value;
                        permissions.add(permission);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (mySystemRoles_1_1 && !mySystemRoles_1_1.done && (_a = mySystemRoles_1.return)) _a.call(mySystemRoles_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return permissions;
});
exports.haveISystemPermission = reselect_1.createSelector(exports.getMySystemPermissions, function (state, options) { return options.permission; }, function (permissions, permission) {
    return permissions.has(permission);
});
//# sourceMappingURL=roles_helpers.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRolesFilters = exports.sortByUsername = exports.filterProfilesMatchingWithTerm = exports.filterProfilesStartingWithTerm = exports.nameSuggestionsForUser = exports.getSuggestionsSplitByMultiple = exports.getSuggestionsSplitBy = exports.removeUserFromList = exports.profileListToMap = exports.hasPostAllPublicRole = exports.hasPostAllRole = exports.hasUserAccessTokenRole = exports.isChannelAdmin = exports.includesAnAdminRole = exports.isSystemAdmin = exports.isTeamAdmin = exports.isGuest = exports.isAdmin = exports.spaceSeparatedStringIncludes = exports.displayUsername = exports.getFullName = void 0;
var tslib_1 = __webpack_require__(6);
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var constants_1 = __webpack_require__(8);
var i18n_utils_1 = __webpack_require__(33);
function getFullName(user) {
    if (user.first_name && user.last_name) {
        return user.first_name + ' ' + user.last_name;
    }
    else if (user.first_name) {
        return user.first_name;
    }
    else if (user.last_name) {
        return user.last_name;
    }
    return '';
}
exports.getFullName = getFullName;
function displayUsername(user, teammateNameDisplay, useFallbackUsername) {
    if (useFallbackUsername === void 0) { useFallbackUsername = true; }
    var name = useFallbackUsername ? i18n_utils_1.localizeMessage('channel_loader.someone', 'Someone') : '';
    if (user) {
        if (teammateNameDisplay === constants_1.Preferences.DISPLAY_PREFER_NICKNAME) {
            name = user.nickname || getFullName(user);
        }
        else if (teammateNameDisplay === constants_1.Preferences.DISPLAY_PREFER_FULL_NAME) {
            name = getFullName(user);
        }
        else {
            name = user.username;
        }
        if (!name || name.trim().length === 0) {
            name = user.username;
        }
    }
    return name;
}
exports.displayUsername = displayUsername;
function spaceSeparatedStringIncludes(spaceSeparated, item) {
    var items = spaceSeparated.split(' ');
    return items.includes(item);
}
exports.spaceSeparatedStringIncludes = spaceSeparatedStringIncludes;
function isAdmin(roles) {
    return isSystemAdmin(roles) || isTeamAdmin(roles);
}
exports.isAdmin = isAdmin;
function isGuest(roles) {
    return spaceSeparatedStringIncludes(roles, 'system_guest');
}
exports.isGuest = isGuest;
function isTeamAdmin(roles) {
    return spaceSeparatedStringIncludes(roles, constants_1.General.TEAM_ADMIN_ROLE);
}
exports.isTeamAdmin = isTeamAdmin;
function isSystemAdmin(roles) {
    return spaceSeparatedStringIncludes(roles, constants_1.General.SYSTEM_ADMIN_ROLE);
}
exports.isSystemAdmin = isSystemAdmin;
function includesAnAdminRole(roles) {
    var rolesArray = roles.split(' ');
    return [
        constants_1.General.SYSTEM_ADMIN_ROLE,
        constants_1.General.SYSTEM_USER_MANAGER_ROLE,
        constants_1.General.SYSTEM_READ_ONLY_ADMIN_ROLE,
        constants_1.General.SYSTEM_MANAGER_ROLE,
    ].some(function (el) { return rolesArray.includes(el); });
}
exports.includesAnAdminRole = includesAnAdminRole;
function isChannelAdmin(roles) {
    return spaceSeparatedStringIncludes(roles, constants_1.General.CHANNEL_ADMIN_ROLE);
}
exports.isChannelAdmin = isChannelAdmin;
function hasUserAccessTokenRole(roles) {
    return spaceSeparatedStringIncludes(roles, constants_1.General.SYSTEM_USER_ACCESS_TOKEN_ROLE);
}
exports.hasUserAccessTokenRole = hasUserAccessTokenRole;
function hasPostAllRole(roles) {
    return spaceSeparatedStringIncludes(roles, constants_1.General.SYSTEM_POST_ALL_ROLE);
}
exports.hasPostAllRole = hasPostAllRole;
function hasPostAllPublicRole(roles) {
    return spaceSeparatedStringIncludes(roles, constants_1.General.SYSTEM_POST_ALL_PUBLIC_ROLE);
}
exports.hasPostAllPublicRole = hasPostAllPublicRole;
function profileListToMap(profileList) {
    var profiles = {};
    for (var i = 0; i < profileList.length; i++) {
        profiles[profileList[i].id] = profileList[i];
    }
    return profiles;
}
exports.profileListToMap = profileListToMap;
function removeUserFromList(userId, list) {
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].id === userId) {
            list.splice(i, 1);
            return list;
        }
    }
    return list;
}
exports.removeUserFromList = removeUserFromList;
// Splits the term by a splitStr and composes a list of the parts of
// the split concatenated with the rest, forming a set of suggesitons
// matchable with startsWith
//
// E.g.: for "one.two.three" by "." it would yield
// ["one.two.three", ".two.three", "two.three", ".three", "three"]
function getSuggestionsSplitBy(term, splitStr) {
    var splitTerm = term.split(splitStr);
    var initialSuggestions = splitTerm.map(function (st, i) { return splitTerm.slice(i).join(splitStr); });
    var suggestions = [];
    if (splitStr === ' ') {
        suggestions = initialSuggestions;
    }
    else {
        suggestions = initialSuggestions.reduce(function (acc, val) {
            if (acc.length === 0) {
                acc.push(val);
            }
            else {
                acc.push(splitStr + val, val);
            }
            return acc;
        }, []);
    }
    return suggestions;
}
exports.getSuggestionsSplitBy = getSuggestionsSplitBy;
function getSuggestionsSplitByMultiple(term, splitStrs) {
    var suggestions = splitStrs.reduce(function (acc, val) {
        getSuggestionsSplitBy(term, val).forEach(function (suggestion) { return acc.add(suggestion); });
        return acc;
    }, new Set());
    return tslib_1.__spread(suggestions);
}
exports.getSuggestionsSplitByMultiple = getSuggestionsSplitByMultiple;
function nameSuggestionsForUser(user) {
    var profileSuggestions = [];
    var usernameSuggestions = getSuggestionsSplitByMultiple((user.username || '').toLowerCase(), constants_1.General.AUTOCOMPLETE_SPLIT_CHARACTERS);
    profileSuggestions.push.apply(profileSuggestions, tslib_1.__spread(usernameSuggestions));
    var first = (user.first_name || '').toLowerCase();
    var last = (user.last_name || '').toLowerCase();
    var full = first + ' ' + last;
    profileSuggestions.push(first, last, full);
    profileSuggestions.push((user.nickname || '').toLowerCase());
    profileSuggestions.push((user.position || '').toLowerCase());
    var email = (user.email || '').toLowerCase();
    profileSuggestions.push(email);
    var split = email.split('@');
    if (split.length > 1) {
        profileSuggestions.push(split[1]);
    }
    return profileSuggestions;
}
exports.nameSuggestionsForUser = nameSuggestionsForUser;
function filterProfilesStartingWithTerm(users, term) {
    var lowercasedTerm = term.toLowerCase();
    var trimmedTerm = lowercasedTerm;
    if (trimmedTerm.startsWith('@')) {
        trimmedTerm = trimmedTerm.substr(1);
    }
    return users.filter(function (user) {
        if (!user) {
            return false;
        }
        var profileSuggestions = nameSuggestionsForUser(user);
        return profileSuggestions.filter(function (suggestion) { return suggestion !== ''; }).some(function (suggestion) { return suggestion.startsWith(trimmedTerm); });
    });
}
exports.filterProfilesStartingWithTerm = filterProfilesStartingWithTerm;
function filterProfilesMatchingWithTerm(users, term) {
    var lowercasedTerm = term.toLowerCase();
    var trimmedTerm = lowercasedTerm;
    if (trimmedTerm.startsWith('@')) {
        trimmedTerm = trimmedTerm.substr(1);
    }
    return users.filter(function (user) {
        if (!user) {
            return false;
        }
        var profileSuggestions = nameSuggestionsForUser(user);
        return profileSuggestions.filter(function (suggestion) { return suggestion !== ''; }).some(function (suggestion) { return suggestion.includes(trimmedTerm); });
    });
}
exports.filterProfilesMatchingWithTerm = filterProfilesMatchingWithTerm;
function sortByUsername(a, b) {
    var nameA = a.username;
    var nameB = b.username;
    return nameA.localeCompare(nameB);
}
exports.sortByUsername = sortByUsername;
function checkUserHasRole(user, userIsNotAdminOrGuest, membership, role) {
    var isSystemRole = role.includes('system');
    return ((
    // If role is system user then user cannot have system admin or system guest roles
    isSystemRole && user.roles.includes(role) && ((role === constants_1.General.SYSTEM_USER_ROLE && userIsNotAdminOrGuest) ||
        role !== constants_1.General.SYSTEM_USER_ROLE)) || (
    // If user is a system admin or a system guest then ignore team and channel memberships
    !isSystemRole && userIsNotAdminOrGuest && ((role === constants_1.General.TEAM_ADMIN_ROLE && (membership === null || membership === void 0 ? void 0 : membership.scheme_admin)) ||
        (role === constants_1.General.CHANNEL_ADMIN_ROLE && (membership === null || membership === void 0 ? void 0 : membership.scheme_admin)) ||
        (role === constants_1.General.TEAM_USER_ROLE && (membership === null || membership === void 0 ? void 0 : membership.scheme_user) && !(membership === null || membership === void 0 ? void 0 : membership.scheme_admin)) ||
        (role === constants_1.General.CHANNEL_USER_ROLE && (membership === null || membership === void 0 ? void 0 : membership.scheme_user) && !(membership === null || membership === void 0 ? void 0 : membership.scheme_admin)))));
}
function applyRolesFilters(user, filterRoles, excludeRoles, membership) {
    var userIsNotAdminOrGuest = !(user.roles.includes(constants_1.General.SYSTEM_ADMIN_ROLE) || user.roles.includes(constants_1.General.SYSTEM_GUEST_ROLE));
    var userHasExcludedRole = excludeRoles.some(checkUserHasRole.bind(this, user, userIsNotAdminOrGuest, membership));
    if (userHasExcludedRole) {
        return false;
    }
    return filterRoles.length === 0 || filterRoles.some(checkUserHasRole.bind(this, user, userIsNotAdminOrGuest, membership));
}
exports.applyRolesFilters = applyRolesFilters;
//# sourceMappingURL=user_utils.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizeMessage = exports.setLocalizeFunction = void 0;
var localizeFunction;
function setLocalizeFunction(func) {
    localizeFunction = func;
}
exports.setLocalizeFunction = setLocalizeFunction;
function localizeMessage(id, defaultMessage) {
    if (!localizeFunction) {
        return defaultMessage;
    }
    return localizeFunction(id, defaultMessage);
}
exports.localizeMessage = localizeMessage;
//# sourceMappingURL=i18n_utils.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sortTeamsWithLocale = exports.teamListToMap = void 0;
var constants_1 = __webpack_require__(8);
function teamListToMap(teamList) {
    var teams = {};
    for (var i = 0; i < teamList.length; i++) {
        teams[teamList[i].id] = teamList[i];
    }
    return teams;
}
exports.teamListToMap = teamListToMap;
function sortTeamsWithLocale(locale) {
    return function (a, b) {
        if (a.display_name !== b.display_name) {
            return a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase(), locale || constants_1.General.DEFAULT_LOCALE, { numeric: true });
        }
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), locale || constants_1.General.DEFAULT_LOCALE, { numeric: true });
    };
}
exports.sortTeamsWithLocale = sortTeamsWithLocale;
//# sourceMappingURL=team_utils.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChannelFavorite = exports.getPreferencesByCategory = exports.getPreferenceKey = void 0;
var constants_1 = __webpack_require__(8);
function getPreferenceKey(category, name) {
    return category + "--" + name;
}
exports.getPreferenceKey = getPreferenceKey;
function getPreferencesByCategory(myPreferences, category) {
    var prefix = category + "--";
    var preferences = new Map();
    Object.keys(myPreferences).forEach(function (key) {
        if (key.startsWith(prefix)) {
            preferences.set(key.substring(prefix.length), myPreferences[key]);
        }
    });
    return preferences;
}
exports.getPreferencesByCategory = getPreferencesByCategory;
function isChannelFavorite(myPreferences, channelId) {
    var preference = myPreferences[getPreferenceKey(constants_1.Preferences.CATEGORY_FAVORITE_CHANNEL, channelId)];
    return Boolean(preference && preference.value !== 'false');
}
exports.isChannelFavorite = isChannelFavorite;
//# sourceMappingURL=preference_utils.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetProfilesForReactions = exports.getUsersInVisibleDMs = exports.shouldShowTermsOfService = exports.searchProfilesWithoutTeam = exports.searchProfilesNotInCurrentTeam = exports.searchProfilesInTeam = exports.searchProfilesInCurrentTeam = exports.searchProfilesNotInCurrentChannel = exports.searchProfilesInCurrentChannel = exports.makeSearchProfilesInChannel = exports.makeSearchProfilesMatchingWithTerm = exports.makeSearchProfilesStartingWithTerm = exports.getFilteredUsersStats = exports.getTotalUsersStats = exports.getStatusForUserId = exports.getProfilesWithoutTeam = exports.getProfilesNotInCurrentTeam = exports.getProfilesNotInTeam = exports.getProfilesInTeam = exports.getProfilesInCurrentTeam = exports.getProfilesNotInCurrentChannel = exports.getProfilesInCurrentChannel = exports.getIsManualStatusForUserId = exports.filterProfiles = exports.getProfiles = exports.getProfileSetNotInCurrentTeam = exports.getProfileSetInCurrentTeam = exports.getProfileSetNotInCurrentChannel = exports.getProfileSetInCurrentChannel = exports.getCurrentUserMentionKeys = exports.getCurrentUserRoles = exports.currentUserHasAnAdminRole = exports.isCurrentUserSystemAdmin = exports.getUserByEmail = exports.getUsersByEmail = exports.getUserByUsername = exports.getUsersByUsername = exports.getUser = exports.getUserAudits = exports.getUserSessions = exports.getUserStatuses = exports.getUserIdsInGroups = exports.getUserIdsWithoutTeam = exports.getUserIdsNotInTeams = exports.getUserIdsInTeams = exports.getUserIdsNotInChannels = exports.getUserIdsInChannels = exports.getUsers = exports.getCurrentUserId = exports.getCurrentUser = void 0;
exports.searchProfilesInGroup = exports.getProfilesInGroup = exports.makeGetDisplayName = exports.makeGetProfilesByIdsAndUsernames = exports.makeGetProfilesNotInChannel = exports.makeGetProfilesInChannel = void 0;
var tslib_1 = __webpack_require__(6);
var reselect_1 = __webpack_require__(7);
var common_1 = __webpack_require__(25);
Object.defineProperty(exports, "getCurrentUser", { enumerable: true, get: function () { return common_1.getCurrentUser; } });
Object.defineProperty(exports, "getCurrentUserId", { enumerable: true, get: function () { return common_1.getCurrentUserId; } });
Object.defineProperty(exports, "getUsers", { enumerable: true, get: function () { return common_1.getUsers; } });
var general_1 = __webpack_require__(27);
var preferences_1 = __webpack_require__(26);
var user_utils_1 = __webpack_require__(32);
function getUserIdsInChannels(state) {
    return state.entities.users.profilesInChannel;
}
exports.getUserIdsInChannels = getUserIdsInChannels;
function getUserIdsNotInChannels(state) {
    return state.entities.users.profilesNotInChannel;
}
exports.getUserIdsNotInChannels = getUserIdsNotInChannels;
function getUserIdsInTeams(state) {
    return state.entities.users.profilesInTeam;
}
exports.getUserIdsInTeams = getUserIdsInTeams;
function getUserIdsNotInTeams(state) {
    return state.entities.users.profilesNotInTeam;
}
exports.getUserIdsNotInTeams = getUserIdsNotInTeams;
function getUserIdsWithoutTeam(state) {
    return state.entities.users.profilesWithoutTeam;
}
exports.getUserIdsWithoutTeam = getUserIdsWithoutTeam;
function getUserIdsInGroups(state) {
    return state.entities.users.profilesInGroup;
}
exports.getUserIdsInGroups = getUserIdsInGroups;
function getUserStatuses(state) {
    return state.entities.users.statuses;
}
exports.getUserStatuses = getUserStatuses;
function getUserSessions(state) {
    return state.entities.users.mySessions;
}
exports.getUserSessions = getUserSessions;
function getUserAudits(state) {
    return state.entities.users.myAudits;
}
exports.getUserAudits = getUserAudits;
function getUser(state, id) {
    return state.entities.users.profiles[id];
}
exports.getUser = getUser;
exports.getUsersByUsername = reselect_1.createSelector(common_1.getUsers, function (users) {
    var usersByUsername = {};
    for (var id in users) {
        if (users.hasOwnProperty(id)) {
            var user = users[id];
            usersByUsername[user.username] = user;
        }
    }
    return usersByUsername;
});
function getUserByUsername(state, username) {
    return exports.getUsersByUsername(state)[username];
}
exports.getUserByUsername = getUserByUsername;
exports.getUsersByEmail = reselect_1.createSelector(common_1.getUsers, function (users) {
    var e_1, _a;
    var usersByEmail = {};
    try {
        for (var _b = tslib_1.__values(Object.keys(users).map(function (key) { return users[key]; })), _c = _b.next(); !_c.done; _c = _b.next()) {
            var user = _c.value;
            usersByEmail[user.email] = user;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return usersByEmail;
});
function getUserByEmail(state, email) {
    return exports.getUsersByEmail(state)[email];
}
exports.getUserByEmail = getUserByEmail;
exports.isCurrentUserSystemAdmin = reselect_1.createSelector(common_1.getCurrentUser, function (user) {
    var roles = (user === null || user === void 0 ? void 0 : user.roles) || '';
    return user_utils_1.isSystemAdmin(roles);
});
exports.currentUserHasAnAdminRole = reselect_1.createSelector(common_1.getCurrentUser, function (user) {
    var roles = user.roles || '';
    return user_utils_1.includesAnAdminRole(roles);
});
exports.getCurrentUserRoles = reselect_1.createSelector(common_1.getMyCurrentChannelMembership, function (state) { return state.entities.teams.myMembers[state.entities.teams.currentTeamId]; }, common_1.getCurrentUser, function (currentChannelMembership, currentTeamMembership, currentUser) {
    var roles = '';
    if (currentTeamMembership) {
        roles += currentTeamMembership.roles + " ";
    }
    if (currentChannelMembership) {
        roles += currentChannelMembership.roles + " ";
    }
    if (currentUser) {
        roles += currentUser.roles;
    }
    return roles.trim();
});
exports.getCurrentUserMentionKeys = reselect_1.createSelector(common_1.getCurrentUser, function (user) {
    var keys = [];
    if (!user || !user.notify_props) {
        return keys;
    }
    if (user.notify_props.mention_keys) {
        keys = keys.concat(user.notify_props.mention_keys.split(',').map(function (key) {
            return { key: key };
        }));
    }
    if (user.notify_props.first_name === 'true' && user.first_name) {
        keys.push({ key: user.first_name, caseSensitive: true });
    }
    if (user.notify_props.channel === 'true') {
        keys.push({ key: '@channel' });
        keys.push({ key: '@all' });
        keys.push({ key: '@here' });
    }
    var usernameKey = '@' + user.username;
    if (keys.findIndex(function (key) { return key.key === usernameKey; }) === -1) {
        keys.push({ key: usernameKey });
    }
    return keys;
});
exports.getProfileSetInCurrentChannel = reselect_1.createSelector(common_1.getCurrentChannelId, getUserIdsInChannels, function (currentChannel, channelProfiles) {
    return channelProfiles[currentChannel];
});
exports.getProfileSetNotInCurrentChannel = reselect_1.createSelector(common_1.getCurrentChannelId, getUserIdsNotInChannels, function (currentChannel, channelProfiles) {
    return channelProfiles[currentChannel];
});
exports.getProfileSetInCurrentTeam = reselect_1.createSelector(function (state) { return state.entities.teams.currentTeamId; }, getUserIdsInTeams, function (currentTeam, teamProfiles) {
    return teamProfiles[currentTeam];
});
exports.getProfileSetNotInCurrentTeam = reselect_1.createSelector(function (state) { return state.entities.teams.currentTeamId; }, getUserIdsNotInTeams, function (currentTeam, teamProfiles) {
    return teamProfiles[currentTeam];
});
var PROFILE_SET_ALL = 'all';
function sortAndInjectProfiles(profiles, profileSet) {
    var currentProfiles = [];
    if (typeof profileSet === 'undefined') {
        return currentProfiles;
    }
    else if (profileSet === PROFILE_SET_ALL) {
        currentProfiles = Object.keys(profiles).map(function (key) { return profiles[key]; });
    }
    else {
        currentProfiles = Array.from(profileSet).map(function (p) { return profiles[p]; });
    }
    currentProfiles = currentProfiles.filter(function (profile) { return Boolean(profile); });
    return currentProfiles.sort(user_utils_1.sortByUsername);
}
exports.getProfiles = reselect_1.createSelector(common_1.getUsers, function (state, filters) { return filters; }, function (profiles, filters) {
    return sortAndInjectProfiles(filterProfiles(profiles, filters), PROFILE_SET_ALL);
});
function filterProfiles(profiles, filters, memberships) {
    if (!filters) {
        return profiles;
    }
    var users = Object.keys(profiles).map(function (key) { return profiles[key]; });
    var filterRole = (filters.role && filters.role !== '') ? [filters.role] : [];
    var filterRoles = tslib_1.__spread(filterRole, (filters.roles || []), (filters.team_roles || []), (filters.channel_roles || []));
    var excludeRoles = filters.exclude_roles || [];
    if (filterRoles.length > 0 || excludeRoles.length > 0) {
        users = users.filter(function (user) {
            return user.roles.length > 0 && user_utils_1.applyRolesFilters(user, filterRoles, excludeRoles, memberships === null || memberships === void 0 ? void 0 : memberships[user.id]);
        });
    }
    if (filters.inactive) {
        users = users.filter(function (user) { return user.delete_at !== 0; });
    }
    else if (filters.active) {
        users = users.filter(function (user) { return user.delete_at === 0; });
    }
    return users.reduce(function (acc, user) {
        acc[user.id] = user;
        return acc;
    }, {});
}
exports.filterProfiles = filterProfiles;
function getIsManualStatusForUserId(state, userId) {
    return state.entities.users.isManualStatus[userId];
}
exports.getIsManualStatusForUserId = getIsManualStatusForUserId;
exports.getProfilesInCurrentChannel = reselect_1.createSelector(common_1.getUsers, exports.getProfileSetInCurrentChannel, function (profiles, currentChannelProfileSet) {
    return sortAndInjectProfiles(profiles, currentChannelProfileSet);
});
exports.getProfilesNotInCurrentChannel = reselect_1.createSelector(common_1.getUsers, exports.getProfileSetNotInCurrentChannel, function (profiles, notInCurrentChannelProfileSet) {
    return sortAndInjectProfiles(profiles, notInCurrentChannelProfileSet);
});
exports.getProfilesInCurrentTeam = reselect_1.createSelector(common_1.getUsers, exports.getProfileSetInCurrentTeam, function (profiles, currentTeamProfileSet) {
    return sortAndInjectProfiles(profiles, currentTeamProfileSet);
});
exports.getProfilesInTeam = reselect_1.createSelector(common_1.getUsers, getUserIdsInTeams, common_1.getMembersInTeam, function (state, teamId) { return teamId; }, function (state, teamId, filters) { return filters; }, function (profiles, usersInTeams, memberships, teamId, filters) {
    return sortAndInjectProfiles(filterProfiles(profiles, filters, memberships), usersInTeams[teamId] || new Set());
});
exports.getProfilesNotInTeam = reselect_1.createSelector(common_1.getUsers, getUserIdsNotInTeams, function (state, teamId) { return teamId; }, function (state, teamId, filters) { return filters; }, function (profiles, usersNotInTeams, teamId, filters) {
    return sortAndInjectProfiles(filterProfiles(profiles, filters), usersNotInTeams[teamId] || new Set());
});
exports.getProfilesNotInCurrentTeam = reselect_1.createSelector(common_1.getUsers, exports.getProfileSetNotInCurrentTeam, function (profiles, notInCurrentTeamProfileSet) {
    return sortAndInjectProfiles(profiles, notInCurrentTeamProfileSet);
});
exports.getProfilesWithoutTeam = reselect_1.createSelector(common_1.getUsers, getUserIdsWithoutTeam, function (state, filters) { return filters; }, function (profiles, withoutTeamProfileSet, filters) {
    return sortAndInjectProfiles(filterProfiles(profiles, filters), withoutTeamProfileSet);
});
function getStatusForUserId(state, userId) {
    return getUserStatuses(state)[userId];
}
exports.getStatusForUserId = getStatusForUserId;
function getTotalUsersStats(state) {
    return state.entities.users.stats;
}
exports.getTotalUsersStats = getTotalUsersStats;
function getFilteredUsersStats(state) {
    return state.entities.users.filteredStats;
}
exports.getFilteredUsersStats = getFilteredUsersStats;
function filterFromProfiles(currentUserId, profiles, skipCurrent, filters) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var filteredProfilesMap = filterProfiles(user_utils_1.profileListToMap(profiles), filters);
    var filteredProfiles = Object.keys(filteredProfilesMap).map(function (key) { return filteredProfilesMap[key]; });
    if (skipCurrent) {
        removeCurrentUserFromList(filteredProfiles, currentUserId);
    }
    return filteredProfiles;
}
function makeSearchProfilesStartingWithTerm() {
    return reselect_1.createSelector(common_1.getUsers, common_1.getCurrentUserId, function (state, term) { return term; }, function (state, term, skipCurrent) { return skipCurrent || false; }, function (stateGlobalState, term, skipCurrent, filters) { return filters; }, function (users, currentUserId, term, skipCurrent, filters) {
        var profiles = user_utils_1.filterProfilesStartingWithTerm(Object.values(users), term);
        return filterFromProfiles(currentUserId, profiles, skipCurrent, filters);
    });
}
exports.makeSearchProfilesStartingWithTerm = makeSearchProfilesStartingWithTerm;
function makeSearchProfilesMatchingWithTerm() {
    return reselect_1.createSelector(common_1.getUsers, common_1.getCurrentUserId, function (state, term) { return term; }, function (state, term, skipCurrent) { return skipCurrent || false; }, function (stateGlobalState, term, skipCurrent, filters) { return filters; }, function (users, currentUserId, term, skipCurrent, filters) {
        var profiles = user_utils_1.filterProfilesMatchingWithTerm(Object.values(users), term);
        return filterFromProfiles(currentUserId, profiles, skipCurrent, filters);
    });
}
exports.makeSearchProfilesMatchingWithTerm = makeSearchProfilesMatchingWithTerm;
function makeSearchProfilesInChannel() {
    var doGetProfilesInChannel = makeGetProfilesInChannel();
    return function (state, channelId, term, skipCurrent, filters) {
        if (skipCurrent === void 0) { skipCurrent = false; }
        var profiles = user_utils_1.filterProfilesStartingWithTerm(doGetProfilesInChannel(state, channelId, filters), term);
        if (skipCurrent) {
            removeCurrentUserFromList(profiles, common_1.getCurrentUserId(state));
        }
        return profiles;
    };
}
exports.makeSearchProfilesInChannel = makeSearchProfilesInChannel;
function searchProfilesInCurrentChannel(state, term, skipCurrent) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var profiles = user_utils_1.filterProfilesStartingWithTerm(exports.getProfilesInCurrentChannel(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, common_1.getCurrentUserId(state));
    }
    return profiles;
}
exports.searchProfilesInCurrentChannel = searchProfilesInCurrentChannel;
function searchProfilesNotInCurrentChannel(state, term, skipCurrent) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var profiles = user_utils_1.filterProfilesStartingWithTerm(exports.getProfilesNotInCurrentChannel(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, common_1.getCurrentUserId(state));
    }
    return profiles;
}
exports.searchProfilesNotInCurrentChannel = searchProfilesNotInCurrentChannel;
function searchProfilesInCurrentTeam(state, term, skipCurrent) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var profiles = user_utils_1.filterProfilesStartingWithTerm(exports.getProfilesInCurrentTeam(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, common_1.getCurrentUserId(state));
    }
    return profiles;
}
exports.searchProfilesInCurrentTeam = searchProfilesInCurrentTeam;
function searchProfilesInTeam(state, teamId, term, skipCurrent, filters) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var profiles = user_utils_1.filterProfilesStartingWithTerm(exports.getProfilesInTeam(state, teamId, filters), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, common_1.getCurrentUserId(state));
    }
    return profiles;
}
exports.searchProfilesInTeam = searchProfilesInTeam;
function searchProfilesNotInCurrentTeam(state, term, skipCurrent) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var profiles = user_utils_1.filterProfilesStartingWithTerm(exports.getProfilesNotInCurrentTeam(state), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, common_1.getCurrentUserId(state));
    }
    return profiles;
}
exports.searchProfilesNotInCurrentTeam = searchProfilesNotInCurrentTeam;
function searchProfilesWithoutTeam(state, term, skipCurrent, filters) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var filteredProfiles = user_utils_1.filterProfilesStartingWithTerm(exports.getProfilesWithoutTeam(state, filters), term);
    if (skipCurrent) {
        removeCurrentUserFromList(filteredProfiles, common_1.getCurrentUserId(state));
    }
    return filteredProfiles;
}
exports.searchProfilesWithoutTeam = searchProfilesWithoutTeam;
function removeCurrentUserFromList(profiles, currentUserId) {
    var index = profiles.findIndex(function (p) { return p.id === currentUserId; });
    if (index >= 0) {
        profiles.splice(index, 1);
    }
}
exports.shouldShowTermsOfService = reselect_1.createSelector(general_1.getConfig, common_1.getCurrentUser, general_1.getLicense, function (config, user, license) {
    // Defaults to false if the user is not logged in or the setting doesn't exist
    var acceptedTermsId = user ? user.terms_of_service_id : '';
    var acceptedAt = user ? user.terms_of_service_create_at : 0;
    var featureEnabled = license.IsLicensed === 'true' && config.EnableCustomTermsOfService === 'true';
    var reacceptanceTime = parseInt(config.CustomTermsOfServiceReAcceptancePeriod, 10) * 1000 * 60 * 60 * 24;
    var timeElapsed = new Date().getTime() - acceptedAt;
    return Boolean(user && featureEnabled && (config.CustomTermsOfServiceId !== acceptedTermsId || timeElapsed > reacceptanceTime));
});
exports.getUsersInVisibleDMs = reselect_1.createSelector(common_1.getUsers, preferences_1.getDirectShowPreferences, function (users, preferences) {
    var dmUsers = [];
    preferences.forEach(function (pref) {
        if (pref.value === 'true' && users[pref.name]) {
            dmUsers.push(users[pref.name]);
        }
    });
    return dmUsers;
});
function makeGetProfilesForReactions() {
    return reselect_1.createSelector(common_1.getUsers, function (state, reactions) { return reactions; }, function (users, reactions) {
        var profiles = [];
        reactions.forEach(function (r) {
            if (users[r.user_id]) {
                profiles.push(users[r.user_id]);
            }
        });
        return profiles;
    });
}
exports.makeGetProfilesForReactions = makeGetProfilesForReactions;
function makeGetProfilesInChannel() {
    return reselect_1.createSelector(common_1.getUsers, getUserIdsInChannels, common_1.getMembersInChannel, function (state, channelId) { return channelId; }, function (state, channelId, filters) { return filters; }, function (users, userIds, membersInChannel, channelId, filters) {
        if (filters === void 0) { filters = {}; }
        var userIdsInChannel = userIds[channelId];
        if (!userIdsInChannel) {
            return [];
        }
        return sortAndInjectProfiles(filterProfiles(users, filters, membersInChannel), userIdsInChannel);
    });
}
exports.makeGetProfilesInChannel = makeGetProfilesInChannel;
function makeGetProfilesNotInChannel() {
    return reselect_1.createSelector(common_1.getUsers, getUserIdsNotInChannels, function (state, channelId) { return channelId; }, function (state, channelId, filters) { return filters; }, function (users, userIds, channelId, filters) {
        if (filters === void 0) { filters = {}; }
        var userIdsInChannel = userIds[channelId];
        if (!userIdsInChannel) {
            return [];
        }
        else if (filters) {
            return sortAndInjectProfiles(filterProfiles(users, filters), userIdsInChannel);
        }
        return sortAndInjectProfiles(users, userIdsInChannel);
    });
}
exports.makeGetProfilesNotInChannel = makeGetProfilesNotInChannel;
function makeGetProfilesByIdsAndUsernames() {
    return reselect_1.createSelector(common_1.getUsers, exports.getUsersByUsername, function (state, props) { return props.allUserIds; }, function (state, props) { return props.allUsernames; }, function (allProfilesById, allProfilesByUsername, allUserIds, allUsernames) {
        var userProfiles = [];
        if (allUserIds && allUserIds.length > 0) {
            var profilesById = allUserIds.
                filter(function (userId) { return allProfilesById[userId]; }).
                map(function (userId) { return allProfilesById[userId]; });
            if (profilesById && profilesById.length > 0) {
                userProfiles.push.apply(userProfiles, tslib_1.__spread(profilesById));
            }
        }
        if (allUsernames && allUsernames.length > 0) {
            var profilesByUsername = allUsernames.
                filter(function (username) { return allProfilesByUsername[username]; }).
                map(function (username) { return allProfilesByUsername[username]; });
            if (profilesByUsername && profilesByUsername.length > 0) {
                userProfiles.push.apply(userProfiles, tslib_1.__spread(profilesByUsername));
            }
        }
        return userProfiles;
    });
}
exports.makeGetProfilesByIdsAndUsernames = makeGetProfilesByIdsAndUsernames;
function makeGetDisplayName() {
    return reselect_1.createSelector(function (state, userId) { return getUser(state, userId); }, preferences_1.getTeammateNameDisplaySetting, function (state, userId, useFallbackUsername) {
        if (useFallbackUsername === void 0) { useFallbackUsername = true; }
        return useFallbackUsername;
    }, function (user, teammateNameDisplaySetting, useFallbackUsername) {
        return user_utils_1.displayUsername(user, teammateNameDisplaySetting, useFallbackUsername);
    });
}
exports.makeGetDisplayName = makeGetDisplayName;
exports.getProfilesInGroup = reselect_1.createSelector(common_1.getUsers, getUserIdsInGroups, function (state, groupId) { return groupId; }, function (state, groupId, filters) { return filters; }, function (profiles, usersInGroups, groupId, filters) {
    return sortAndInjectProfiles(filterProfiles(profiles, filters), usersInGroups[groupId] || new Set());
});
function searchProfilesInGroup(state, groupId, term, skipCurrent, filters) {
    if (skipCurrent === void 0) { skipCurrent = false; }
    var profiles = user_utils_1.filterProfilesStartingWithTerm(exports.getProfilesInGroup(state, groupId, filters), term);
    if (skipCurrent) {
        removeCurrentUserFromList(profiles, common_1.getCurrentUserId(state));
    }
    return profiles;
}
exports.searchProfilesInGroup = searchProfilesInGroup;
//# sourceMappingURL=users.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbedFromMetadata = exports.fromAutoResponder = exports.isPostCommentMention = exports.comparePosts = exports.isPostPendingOrFailed = exports.shouldFilterJoinLeavePost = exports.getLastCreateAt = exports.canEditPost = exports.canDeletePost = exports.isEdited = exports.isPostOwner = exports.isUserActivityPost = exports.shouldIgnorePost = exports.isPostEphemeral = exports.isFromWebhook = exports.isMeMessage = exports.isSystemMessage = exports.isPostFlagged = void 0;
var tslib_1 = __webpack_require__(6);
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
var constants_1 = __webpack_require__(8);
var general_1 = __webpack_require__(27);
var roles_1 = __webpack_require__(38);
var preference_utils_1 = __webpack_require__(35);
function isPostFlagged(postId, myPreferences) {
    var key = preference_utils_1.getPreferenceKey(constants_1.Preferences.CATEGORY_FLAGGED_POST, postId);
    return myPreferences.hasOwnProperty(key);
}
exports.isPostFlagged = isPostFlagged;
function isSystemMessage(post) {
    return Boolean(post.type && post.type.startsWith(constants_1.Posts.SYSTEM_MESSAGE_PREFIX));
}
exports.isSystemMessage = isSystemMessage;
function isMeMessage(post) {
    return Boolean(post.type && post.type === constants_1.Posts.POST_TYPES.ME);
}
exports.isMeMessage = isMeMessage;
function isFromWebhook(post) {
    return post.props && post.props.from_webhook;
}
exports.isFromWebhook = isFromWebhook;
function isPostEphemeral(post) {
    return post.type === constants_1.Posts.POST_TYPES.EPHEMERAL || post.type === constants_1.Posts.POST_TYPES.EPHEMERAL_ADD_TO_CHANNEL || post.state === constants_1.Posts.POST_DELETED;
}
exports.isPostEphemeral = isPostEphemeral;
function shouldIgnorePost(post, userId) {
    var postTypeCheck = post.type && (post.type === constants_1.Posts.POST_TYPES.ADD_TO_CHANNEL);
    var userIdCheck = post.props && post.props.addedUserId && (post.props.addedUserId === userId);
    if (postTypeCheck && userIdCheck) {
        return false;
    }
    return constants_1.Posts.IGNORE_POST_TYPES.includes(post.type);
}
exports.shouldIgnorePost = shouldIgnorePost;
function isUserActivityPost(postType) {
    return constants_1.Posts.USER_ACTIVITY_POST_TYPES.includes(postType);
}
exports.isUserActivityPost = isUserActivityPost;
function isPostOwner(userId, post) {
    return userId === post.user_id;
}
exports.isPostOwner = isPostOwner;
function isEdited(post) {
    return post.edit_at > 0;
}
exports.isEdited = isEdited;
function canDeletePost(state, config, license, teamId, channelId, userId, post, isAdmin, isSystemAdmin) {
    if (!post) {
        return false;
    }
    var isOwner = isPostOwner(userId, post);
    if (general_1.hasNewPermissions(state)) {
        var canDelete = roles_1.haveIChannelPermission(state, { team: teamId, channel: channelId, permission: constants_1.Permissions.DELETE_POST });
        if (!isOwner) {
            return canDelete && roles_1.haveIChannelPermission(state, { team: teamId, channel: channelId, permission: constants_1.Permissions.DELETE_OTHERS_POSTS });
        }
        return canDelete;
    }
    // Backwards compatibility with pre-advanced permissions config settings.
    if (license.IsLicensed === 'true') {
        return (config.RestrictPostDelete === constants_1.General.PERMISSIONS_ALL && (isOwner || isAdmin)) ||
            (config.RestrictPostDelete === constants_1.General.PERMISSIONS_TEAM_ADMIN && isAdmin) ||
            (config.RestrictPostDelete === constants_1.General.PERMISSIONS_SYSTEM_ADMIN && isSystemAdmin);
    }
    return isOwner || isAdmin;
}
exports.canDeletePost = canDeletePost;
function canEditPost(state, config, license, teamId, channelId, userId, post) {
    if (!post || isSystemMessage(post)) {
        return false;
    }
    var isOwner = isPostOwner(userId, post);
    var canEdit = true;
    if (general_1.hasNewPermissions(state)) {
        var permission = isOwner ? constants_1.Permissions.EDIT_POST : constants_1.Permissions.EDIT_OTHERS_POSTS;
        canEdit = roles_1.haveIChannelPermission(state, { team: teamId, channel: channelId, permission: permission });
        if (license.IsLicensed === 'true' && config.PostEditTimeLimit !== '-1' && config.PostEditTimeLimit !== -1) {
            var timeLeft = (post.create_at + (config.PostEditTimeLimit * 1000)) - Date.now();
            if (timeLeft <= 0) {
                canEdit = false;
            }
        }
    }
    else {
        // Backwards compatibility with pre-advanced permissions config settings.
        canEdit = isOwner && config.AllowEditPost !== 'never';
        if (config.AllowEditPost === constants_1.General.ALLOW_EDIT_POST_TIME_LIMIT) {
            var timeLeft = (post.create_at + (config.PostEditTimeLimit * 1000)) - Date.now();
            if (timeLeft <= 0) {
                canEdit = false;
            }
        }
    }
    return canEdit;
}
exports.canEditPost = canEditPost;
function getLastCreateAt(postsArray) {
    var createAt = postsArray.map(function (p) { return p.create_at; });
    if (createAt.length) {
        return Reflect.apply(Math.max, null, createAt);
    }
    return 0;
}
exports.getLastCreateAt = getLastCreateAt;
var joinLeavePostTypes = [
    constants_1.Posts.POST_TYPES.JOIN_LEAVE,
    constants_1.Posts.POST_TYPES.JOIN_CHANNEL,
    constants_1.Posts.POST_TYPES.LEAVE_CHANNEL,
    constants_1.Posts.POST_TYPES.ADD_REMOVE,
    constants_1.Posts.POST_TYPES.ADD_TO_CHANNEL,
    constants_1.Posts.POST_TYPES.REMOVE_FROM_CHANNEL,
    constants_1.Posts.POST_TYPES.JOIN_TEAM,
    constants_1.Posts.POST_TYPES.LEAVE_TEAM,
    constants_1.Posts.POST_TYPES.ADD_TO_TEAM,
    constants_1.Posts.POST_TYPES.REMOVE_FROM_TEAM,
    constants_1.Posts.POST_TYPES.COMBINED_USER_ACTIVITY,
];
// Returns true if a post should be hidden when the user has Show Join/Leave Messages disabled
function shouldFilterJoinLeavePost(post, showJoinLeave, currentUsername) {
    if (showJoinLeave) {
        return false;
    }
    // Don't filter out non-join/leave messages
    if (joinLeavePostTypes.indexOf(post.type) === -1) {
        return false;
    }
    // Don't filter out join/leave messages about the current user
    return !isJoinLeavePostForUsername(post, currentUsername);
}
exports.shouldFilterJoinLeavePost = shouldFilterJoinLeavePost;
function isJoinLeavePostForUsername(post, currentUsername) {
    var e_1, _a;
    if (!post.props || !currentUsername) {
        return false;
    }
    if (post.user_activity_posts) {
        try {
            for (var _b = tslib_1.__values(post.user_activity_posts), _c = _b.next(); !_c.done; _c = _b.next()) {
                var childPost = _c.value;
                if (isJoinLeavePostForUsername(childPost, currentUsername)) {
                    // If any of the contained posts are for this user, the client will
                    // need to figure out how to render the post
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return post.props.username === currentUsername ||
        post.props.addedUsername === currentUsername ||
        post.props.removedUsername === currentUsername;
}
function isPostPendingOrFailed(post) {
    return post.failed || post.id === post.pending_post_id;
}
exports.isPostPendingOrFailed = isPostPendingOrFailed;
function comparePosts(a, b) {
    var aIsPendingOrFailed = isPostPendingOrFailed(a);
    var bIsPendingOrFailed = isPostPendingOrFailed(b);
    if (aIsPendingOrFailed && !bIsPendingOrFailed) {
        return -1;
    }
    else if (!aIsPendingOrFailed && bIsPendingOrFailed) {
        return 1;
    }
    if (a.create_at > b.create_at) {
        return -1;
    }
    else if (a.create_at < b.create_at) {
        return 1;
    }
    return 0;
}
exports.comparePosts = comparePosts;
function isPostCommentMention(_a) {
    var post = _a.post, currentUser = _a.currentUser, threadRepliedToByCurrentUser = _a.threadRepliedToByCurrentUser, rootPost = _a.rootPost;
    var commentsNotifyLevel = constants_1.Preferences.COMMENTS_NEVER;
    var isCommentMention = false;
    var threadCreatedByCurrentUser = false;
    if (rootPost && rootPost.user_id === currentUser.id) {
        threadCreatedByCurrentUser = true;
    }
    if (currentUser.notify_props && currentUser.notify_props.comments) {
        commentsNotifyLevel = currentUser.notify_props.comments;
    }
    var notCurrentUser = post.user_id !== currentUser.id || (post.props && post.props.from_webhook);
    if (notCurrentUser) {
        if (commentsNotifyLevel === constants_1.Preferences.COMMENTS_ANY && (threadCreatedByCurrentUser || threadRepliedToByCurrentUser)) {
            isCommentMention = true;
        }
        else if (commentsNotifyLevel === constants_1.Preferences.COMMENTS_ROOT && threadCreatedByCurrentUser) {
            isCommentMention = true;
        }
    }
    return isCommentMention;
}
exports.isPostCommentMention = isPostCommentMention;
function fromAutoResponder(post) {
    return Boolean(post.type && (post.type === constants_1.Posts.SYSTEM_AUTO_RESPONDER));
}
exports.fromAutoResponder = fromAutoResponder;
function getEmbedFromMetadata(metadata) {
    if (!metadata || !metadata.embeds || metadata.embeds.length === 0) {
        return null;
    }
    return metadata.embeds[0];
}
exports.getEmbedFromMetadata = getEmbedFromMetadata;
//# sourceMappingURL=post_utils.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.haveICurrentChannelPermission = exports.haveICurrentTeamPermission = exports.haveIChannelPermission = exports.haveITeamPermission = exports.haveISystemPermission = exports.getMyChannelPermissions = exports.getMyTeamPermissions = exports.getMyCurrentChannelPermissions = exports.getMyCurrentTeamPermissions = exports.getRolesById = exports.getMyRoles = exports.getMyChannelRoles = exports.getMyTeamRoles = exports.getRoles = exports.getMySystemRoles = exports.getMySystemPermissions = void 0;
var tslib_1 = __webpack_require__(6);
var reselect_1 = __webpack_require__(7);
var common_1 = __webpack_require__(25);
var roles_helpers_1 = __webpack_require__(31);
Object.defineProperty(exports, "getMySystemPermissions", { enumerable: true, get: function () { return roles_helpers_1.getMySystemPermissions; } });
Object.defineProperty(exports, "getMySystemRoles", { enumerable: true, get: function () { return roles_helpers_1.getMySystemRoles; } });
Object.defineProperty(exports, "getRoles", { enumerable: true, get: function () { return roles_helpers_1.getRoles; } });
var teams_1 = __webpack_require__(30);
exports.getMyTeamRoles = reselect_1.createSelector(teams_1.getTeamMemberships, function (teamsMemberships) {
    var roles = {};
    if (teamsMemberships) {
        for (var key in teamsMemberships) {
            if (teamsMemberships.hasOwnProperty(key) && teamsMemberships[key].roles) {
                roles[key] = new Set(teamsMemberships[key].roles.split(' '));
            }
        }
    }
    return roles;
});
exports.getMyChannelRoles = reselect_1.createSelector(function (state) { return state.entities.channels.myMembers; }, function (channelsMemberships) {
    var roles = {};
    if (channelsMemberships) {
        for (var key in channelsMemberships) {
            if (channelsMemberships.hasOwnProperty(key) && channelsMemberships[key].roles) {
                roles[key] = new Set(channelsMemberships[key].roles.split(' '));
            }
        }
    }
    return roles;
});
exports.getMyRoles = reselect_1.createSelector(roles_helpers_1.getMySystemRoles, exports.getMyTeamRoles, exports.getMyChannelRoles, function (systemRoles, teamRoles, channelRoles) {
    return {
        system: systemRoles,
        team: teamRoles,
        channel: channelRoles,
    };
});
exports.getRolesById = reselect_1.createSelector(roles_helpers_1.getRoles, function (rolesByName) {
    var e_1, _a;
    var rolesById = {};
    try {
        for (var _b = tslib_1.__values(Object.values(rolesByName)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var role = _c.value;
            rolesById[role.id] = role;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return rolesById;
});
exports.getMyCurrentTeamPermissions = reselect_1.createSelector(exports.getMyTeamRoles, roles_helpers_1.getRoles, roles_helpers_1.getMySystemPermissions, teams_1.getCurrentTeamId, function (myTeamRoles, roles, systemPermissions, teamId) {
    var e_2, _a, e_3, _b, e_4, _c;
    var permissions = new Set();
    if (myTeamRoles[teamId]) {
        try {
            for (var _d = tslib_1.__values(myTeamRoles[teamId]), _e = _d.next(); !_e.done; _e = _d.next()) {
                var roleName = _e.value;
                if (roles[roleName]) {
                    try {
                        for (var _f = (e_3 = void 0, tslib_1.__values(roles[roleName].permissions)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var permission = _g.value;
                            permissions.add(permission);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    try {
        for (var systemPermissions_1 = tslib_1.__values(systemPermissions), systemPermissions_1_1 = systemPermissions_1.next(); !systemPermissions_1_1.done; systemPermissions_1_1 = systemPermissions_1.next()) {
            var permission = systemPermissions_1_1.value;
            permissions.add(permission);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (systemPermissions_1_1 && !systemPermissions_1_1.done && (_c = systemPermissions_1.return)) _c.call(systemPermissions_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return permissions;
});
exports.getMyCurrentChannelPermissions = reselect_1.createSelector(exports.getMyChannelRoles, roles_helpers_1.getRoles, exports.getMyCurrentTeamPermissions, common_1.getCurrentChannelId, function (myChannelRoles, roles, teamPermissions, channelId) {
    var e_5, _a, e_6, _b, e_7, _c;
    var permissions = new Set();
    if (myChannelRoles[channelId]) {
        try {
            for (var _d = tslib_1.__values(myChannelRoles[channelId]), _e = _d.next(); !_e.done; _e = _d.next()) {
                var roleName = _e.value;
                if (roles[roleName]) {
                    try {
                        for (var _f = (e_6 = void 0, tslib_1.__values(roles[roleName].permissions)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var permission = _g.value;
                            permissions.add(permission);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
    try {
        for (var teamPermissions_1 = tslib_1.__values(teamPermissions), teamPermissions_1_1 = teamPermissions_1.next(); !teamPermissions_1_1.done; teamPermissions_1_1 = teamPermissions_1.next()) {
            var permission = teamPermissions_1_1.value;
            permissions.add(permission);
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (teamPermissions_1_1 && !teamPermissions_1_1.done && (_c = teamPermissions_1.return)) _c.call(teamPermissions_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return permissions;
});
exports.getMyTeamPermissions = reselect_1.createSelector(exports.getMyTeamRoles, roles_helpers_1.getRoles, roles_helpers_1.getMySystemPermissions, function (state, options) { return options.team; }, function (myTeamRoles, roles, systemPermissions, teamId) {
    var e_8, _a, e_9, _b, e_10, _c;
    var permissions = new Set();
    if (myTeamRoles[teamId]) {
        try {
            for (var _d = tslib_1.__values(myTeamRoles[teamId]), _e = _d.next(); !_e.done; _e = _d.next()) {
                var roleName = _e.value;
                if (roles[roleName]) {
                    try {
                        for (var _f = (e_9 = void 0, tslib_1.__values(roles[roleName].permissions)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var permission = _g.value;
                            permissions.add(permission);
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_8) throw e_8.error; }
        }
    }
    try {
        for (var systemPermissions_2 = tslib_1.__values(systemPermissions), systemPermissions_2_1 = systemPermissions_2.next(); !systemPermissions_2_1.done; systemPermissions_2_1 = systemPermissions_2.next()) {
            var permission = systemPermissions_2_1.value;
            permissions.add(permission);
        }
    }
    catch (e_10_1) { e_10 = { error: e_10_1 }; }
    finally {
        try {
            if (systemPermissions_2_1 && !systemPermissions_2_1.done && (_c = systemPermissions_2.return)) _c.call(systemPermissions_2);
        }
        finally { if (e_10) throw e_10.error; }
    }
    return permissions;
});
exports.getMyChannelPermissions = reselect_1.createSelector(exports.getMyChannelRoles, roles_helpers_1.getRoles, exports.getMyTeamPermissions, function (state, options) { return options.channel; }, function (myChannelRoles, roles, teamPermissions, channelId) {
    var e_11, _a, e_12, _b, e_13, _c;
    var permissions = new Set();
    if (myChannelRoles[channelId]) {
        try {
            for (var _d = tslib_1.__values(myChannelRoles[channelId]), _e = _d.next(); !_e.done; _e = _d.next()) {
                var roleName = _e.value;
                if (roles[roleName]) {
                    try {
                        for (var _f = (e_12 = void 0, tslib_1.__values(roles[roleName].permissions)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var permission = _g.value;
                            permissions.add(permission);
                        }
                    }
                    catch (e_12_1) { e_12 = { error: e_12_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_12) throw e_12.error; }
                    }
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_11) throw e_11.error; }
        }
    }
    try {
        for (var teamPermissions_2 = tslib_1.__values(teamPermissions), teamPermissions_2_1 = teamPermissions_2.next(); !teamPermissions_2_1.done; teamPermissions_2_1 = teamPermissions_2.next()) {
            var permission = teamPermissions_2_1.value;
            permissions.add(permission);
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (teamPermissions_2_1 && !teamPermissions_2_1.done && (_c = teamPermissions_2.return)) _c.call(teamPermissions_2);
        }
        finally { if (e_13) throw e_13.error; }
    }
    return permissions;
});
exports.haveISystemPermission = reselect_1.createSelector(roles_helpers_1.getMySystemPermissions, function (state, options) { return options.permission; }, function (permissions, permission) {
    return permissions.has(permission);
});
exports.haveITeamPermission = reselect_1.createSelector(exports.getMyTeamPermissions, function (state, options) { return options.permission; }, function (permissions, permission) {
    return permissions.has(permission);
});
exports.haveIChannelPermission = reselect_1.createSelector(exports.getMyChannelPermissions, function (state, options) { return options.permission; }, function (permissions, permission) {
    return permissions.has(permission);
});
exports.haveICurrentTeamPermission = reselect_1.createSelector(exports.getMyCurrentTeamPermissions, function (state, options) { return options.permission; }, function (permissions, permission) {
    return permissions.has(permission);
});
exports.haveICurrentChannelPermission = reselect_1.createSelector(exports.getMyCurrentChannelPermissions, function (state, options) { return options.permission; }, function (permissions, permission) {
    return permissions.has(permission);
});
//# sourceMappingURL=roles.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(__webpack_require__(2));
var _reactRedux = __webpack_require__(40);
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const DragToTiddlywiki = ({
  wik,
  theme,
  close
}) => {
  const [visible, setVisible] = (0, _react.useState)(true);
  const [inputValue, setInputValue] = (0, _react.useState)("");
  // if (!wik) {
  //   return null;
  // }
  const style = getStyle(theme);
  const handleInputChange = event => {
    setInputValue(event.target.value);
  };
  return visible && /*#__PURE__*/_react.default.createElement("div", {
    style: style.backdrop
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: style.modal
  }, /*#__PURE__*/_react.default.createElement("h1", {
    style: style.heading
  }, "Pwamly is the king"), /*#__PURE__*/_react.default.createElement("div", {
    className: "todoplugin-button-container",
    style: style.buttons
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Enter Title...",
    value: inputValue,
    onChange: handleInputChange
  }), /*#__PURE__*/_react.default.createElement("button", {
    emphasis: "tertiary",
    size: "medium",
    onClick: () => setVisible(false)
  }, "Copy to tiddly"))));
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
const getStyle = theme => ({
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
    justifyContent: "center"
  },
  modal: {
    position: "relative",
    width: 600,
    padding: 24,
    borderRadius: 8,
    maxWidth: "100%",
    color: theme.centerChannelColor,
    // backgroundColor: theme.centerChannelBg,
    background: 'black'
  },
  buttons: {
    marginTop: 24
  },
  heading: {
    fontSize: 20,
    fontWeight: 600,
    margin: "0 0 24px 0"
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8
  }
});
var _default = (0, _reactRedux.connect)(mapStateToProps, null)(DragToTiddlywiki);
exports.default = _default;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = ReactRedux;

/***/ })
/******/ ]);