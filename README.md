# Shared Google Slides Control

A tool to enable remote shared control of Google Slides presentations.

## Overview

Shared Google Slides Control addresses a common pain point in remote presentations with multiple speakers: the challenge of slide deck control. Traditionally, only one speaker can manage the slide transitions, which can disrupt the flow of the presentation.

This project empowers presenters by allowing them to share control of a Google Slides deck with other speakers seamlessly.



## How It Works

The solution involves a Greasemonkey userscript on the presenter's side that connects to a remote server via WebSocket. This setup facilitates the following features:

- **QR Code and Link Generation**: The userscript generates a QR code or a link that can be shared with co-presenters.
- **Remote Control Interface**: Co-presenters can use the provided link to access a user interface that allows them to control the slide deck in real-time.

https://github.com/user-attachments/assets/befd48ca-fcbe-49ce-ac8e-0cbc6caf2dde

## Features

- **Seamless Integration**: Easily integrate with your existing Google Slides presentations.
- **Real-Time Collaboration**: Multiple presenters can control slide transitions without interruptions.


- **Secure Connections**: Utilizes WebSocket connections to ensure real-time, secure control sharing.

## Usage

If you simply want to use this project to share your slides, I have deployed an instance of the server on [Clever Cloud](https://clever-cloud.com), and you can use it as is.

In order to use it you will need to follow this steps:

1. **Install Userscripts plugin in your browser**: the most populars are [Tampermonkey](https://tampermonkey.net/) and [Greasemonkey](http://www.greasespot.net/).
2. **Add the Userscript**: directly from [GitHub](./userscript/shared-google-slides-control.user.js), or from the [GreasyFork page](https://greasyfork.org/en/scripts/500807-share-google-slides-controls).
3. **Run the Script**: Open your Google Slides presentation, and the script will automatically display a QR code and link for sharing control.
4. **Share Control**: The presenter shares the generated QR code or link with co-presenters.
5. **Co-presenters Control**: Co-presenters access the control interface through the shared link and can control slide transitions in real-time.

## Installation

You can deploy the server in any host accepting NodeJS. You will need to change the Userscript as it points to the [Clever Cloud](https://clever-cloud.com) instance of the server by default.

## Contribution

We welcome contributions from the community! Feel free to submit pull requests, report issues, or suggest features.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

