// ==UserScript==
// @name         Share Google Slides controls
// @namespace    http://lostinbrittany.dev
// @version      2024-07-15
// @description  Share Google Slides controls, useful for meetings...
// @author       Horacio Gonzalez <horacio.gonzalez@gmail.com>
// @match        https://docs.google.com/presentation/*
// @icon         https://lostinbrittany.org/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Get the pathname of the current page
  const pathname = window.location.pathname;

  const slidedeck = pathname.replace('/presentation/d/','').split('/')[0];

  console.log(`Presentation Id: ${slidedeck}`);

  // Function to send a keyboard event
  function sendKeyboardEvent(key, code, keyCode, element = document.body) {
      const event = new KeyboardEvent('keydown', {
          key: key,
          code: code,
          keyCode: keyCode,
          charCode: keyCode,
          which: keyCode,
          bubbles: true,
          cancelable: true
      });

      element.dispatchEvent(event);
      console.log(`Sent keyboard event: ${key}`);
  }


  // URL of the WebSocket server
  const wsUrl = `wss://shared-google-slides-control.cleverapps.io/websocket/${slidedeck}`;

  // Create a new WebSocket connection
  const socket = new WebSocket(wsUrl);

  // Event listener for when the connection is opened
  socket.addEventListener('open', function (event) {
      console.log('WebSocket connection opened:', event);
  });

   // Event listener for receiving messages from the server
  socket.addEventListener('message', function (event) {
      console.log('Message from server:', event.data);

      switch (event.data) {
          case 'next':
              sendKeyboardEvent('ArrowRight', 'ArrowRight', 39);
              break;
          case 'previous':
              sendKeyboardEvent('ArrowLeft', 'ArrowLeft', 37);
              break;

      }
  });

  // Event listener for when the connection is closed
  socket.addEventListener('close', function (event) {
      console.log('WebSocket connection closed:', event);
  });

  // Event listener for handling errors
  socket.addEventListener('error', function (event) {
      console.error('WebSocket error:', event);
  });
})();