import React from 'react';
import copy from 'copy-to-clipboard';
import { getPost } from 'mattermost-redux/selectors/entities/posts';
import DragToTiddlywiki from './DragToTiddlywiki';


class TingsDragToTiddlyWiki {
  initialize(registry, store) {
   const copyToClipboard = async (post) => {
      try {
        // Create the tiddlerData object
        if(post){
          const tiddlerData = {
            title: "example 4",
            text: post,
          };

          console.log('..................................................',post)
        // Encode the tiddlerData object as a URL
        const encodedData = 'data:text/vnd.tiddler,' + encodeURIComponent(JSON.stringify(tiddlerData));
        // Copy with options
        copy(encodedData, {
          debug: true,format:'URL'
        });

        }

        
    
    
        // Provide user feedback (console log or display a message)
        console.log('Data copied to clipboard');
      } catch (error) {
        // Handle any errors that may occur during clipboard access
        console.error('Failed to copy to clipboard:', error);
      }
    };
        

    registry.registerPostDropdownMenuAction('Drag to Tiddly Wiki', (postId) => {
      const {message} = getPost(store.getState(), postId);
      copyToClipboard(message);
      registry.registerRootComponent(DragToTiddlywiki);
      // Verify the structure of 'post' and access the correct property
      console.log('Post:', message);

    }, () => true);
  }

  uninitialize() {
    // No cleanup required.
  }
}

window.registerPlugin('com.spikeassociates.tings-drag_to_tiddlywiki', new TingsDragToTiddlyWiki());
