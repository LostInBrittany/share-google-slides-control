import { LitElement, html, css, unsafeCSS } from 'lit';
import { CcButton } from "@clevercloud/components/dist/cc-button";

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;
const leftArrow={ content: `<svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 330 330" xml:space="preserve">
<path id="XMLID_6_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
	c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
	c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
	c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"/>
</svg>`};
const rightArrow = { content: `<svg fill="#000000" height="100px" width="100px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 330 330" xml:space="preserve">
<path id="XMLID_2_" d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605
	l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396
	l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998
	c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"/>
</svg>` };

class ShareSlideControl extends LitElement {
  static properties = {
    slidedeck: { type: String },
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: var(--cc-color-text-inverted);
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background:linear-gradient(0.25turn, #03184f, #000830);
        padding: 1rem;
        position: relative;
      }
      main {
        flex-grow: 1;
      }
      #title {
        margin-bottom: 3.5rem;
      }
      .controls {
        display:flex;
        flex-flow: row nowrap;
        justify-content: center;
        gap: 2.5rem;
      }
      cc-button {
        font-size: 2.5rem;
      }

      h1 {
        font-size: 2rem;
      }
      footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
        margin-bottom: 1rem;
      }


    `;
  }

  constructor() {
    super();
    this.slidedeck = "";
  }

  async sendPrevious(){
    let resp = await fetch(`/command/${this.slidedeck}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({command:"previous"}),
    });
    let text = await resp.text();
    console.log("Previous", text);
  }

  async sendNext() {
    let resp = await fetch(`/command/${this.slidedeck}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({command:"next"}),
    });
    let text = await resp.text();
    console.log("Next", text);
  }

  render() {
    return html`
      <main>
        <h1 id="title">Shared Google Slides controls</h1>


        <div class="controls">
          <cc-button 
            id="previousBtn" 
            .icon=${leftArrow} 
            @cc-button:click=${this.sendPrevious}
            hide-text>
              Previous
          </cc-button>
          <cc-button 
            id="nextBtn" 
            .icon=${rightArrow}
            @cc-button:click=${this.sendNext}
            hide-text>
              Next
          </cc-button>
        </div>
      </main>
      <footer>
        <p class="deckInfo">Currently controlling deck: <br> <code>${this.slidedeck}</code></p>
      </footer>
   `;
  }
}

customElements.define('share-slide-control', ShareSlideControl);