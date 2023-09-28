import React from 'react';
import { getPost } from 'mattermost-redux/selectors/entities/posts';

class TingsDragToTiddlyWiki {
  initialize(registry, store) {
   const copyToClipboard = async (post) => {
      try {
        // Create the tiddlerData object
        const tiddlerData = {
          title: "Graged message",
          text: post,
        };
    
        // Encode the tiddlerData object as a URL
        const encodedData = 'data:text/vnd.tiddler,' + encodeURIComponent(JSON.stringify(tiddlerData));
    
        // Use the Clipboard API to copy data to clipboard
        await navigator.clipboard.writeText(encodedData);
    
        // Provide user feedback (console log or display a message)
        console.log('Data copied to clipboard');
      } catch (error) {
        // Handle any errors that may occur during clipboard access
        console.error('Failed to copy to clipboard:', error);
      }
    };
        

    registry.registerPostDropdownMenuAction('Drag to Tiddly Wiki', (e,postId) => {
      console.log('ttttttttttttttttttttttttttttttttttttttttttttttttttttt',postId)
      const post = getPost(store.getState(), postId);
      copyToClipboard(post);

      // Verify the structure of 'post' and access the correct property
      console.log('Post:', post);

    }, () => true);
  }

  uninitialize() {
    // No cleanup required.
  }
}

window.registerPlugin('com.spikeassociates.tings-drag_to_tiddlywiki', new TingsDragToTiddlyWiki());
