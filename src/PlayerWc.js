 import { LitElement, html, css, svg } from 'lit';
 import { throttle } from './utils.js';
 import '../node_modules/@shoelace-style/shoelace/dist/components/progress-ring/progress-ring.js';
 import { globalStyles } from './styles.js';
 
 const {border, orange, blue, spacing} = globalStyles;
 const hoverSize = css`calc(${spacing} - ${border})`;
 const hoverMargin = css`calc((-${spacing} + ${border}) / 2)`;
 const SIMPLE_AUDIO_PLAYER = 'simple-audio-player'
 
 /**
  * Simple audio player element.
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - This element has a slot
  * @csspart button - The button
  * @cssproperty --background-color - element background color
  * @cssproperty --primary-color - element primary color
  * @cssproperty --gutter-color - element gutter color
  */
 export class PlayerWc extends LitElement {
   static styles = css`
     :host {
       --background-color: rgb(125,125,125);
       --primary-color: rgb(200,200,2);
       --gutter-color: rgba(200,200,2,0.4);
       
     }
 
     .container {
       height: 100%;
       width: 100%;
       display: grid;
       grid-template-columns: 1fr; 
       grid-template-rows: 1fr; 
       align-items: center;
       justify-content: center;
     }
 
     button {
       display: flex;
       background: none;
       border: 0;
       justify-self: center;
       color: var(--primary-color);
       background-color: var(--background-color);
       font-size: inherit;
       font-weight: 700;
       position: relative;
       width: calc(100% - 20px);
       height: calc(100% - 20px);
       cursor: pointer;
       border-radius: 50%;
       grid-column: 1;
       grid-row: 1;
       /* z-index: 1; */
     }
 
     .icon {
       flex-grow: 1;
       align-self: center;
       justify-self: center;
     }
 
     .progress-ring {
       height: 100%;
       width: 100%;
       grid-column: 1;
       grid-row: 1;
     }
   `;
 
   static properties = {
       src: {type: String, attribute: true}, // public
       isPlaying: {type: Boolean, state: false}, // not public
       duration: {type: Number,  state: true}, // not public
       progressRingSize: {type: Number, state: false}, // not public
       currentTime: {type: Number, state: true}, // not public
       progress: {type: Number, state: true}, // not public
   }
 
   constructor() {
     super();
    //  this.src = '';
     //this.sound = new Audio(this.src);
    //  console.log(this.sound);
    //  this.sound.load();
   }
 
   connectedCallback() {
     super.connectedCallback()
     // this.addEventListener(SIMPLE_AUDIO_PLAYER, this.playingEvent);
     this.sound = new Audio(this.src);
     this.duration = this.sound.duration;
     this.sound.addEventListener('timeupdate', () => {
       throttle(() => {
         this.progress = this.sound.currentTime / this.duration * 100;
       }, 800);
     });
     this.sound.addEventListener('canplay', () => {
       this.duration = this.sound.duration;
     })
     this.sound.addEventListener('ended', () => this.endOfTrack())
   }
 
   firstUpdated() {
     this.progressRingSize = `${this.renderRoot?.firstElementChild?.offsetHeight}px`;
   }
 
   endOfTrack() {
     this.isPlaying = false;
     this.sound.currentTime = 0;
     this.progress = 0;
   }
 
   toggle() {
     this.isPlaying = !this.isPlaying;
     if (this.isPlaying) {
       //this.progress = 1;
       this.sound.play();
       const customEvent = new CustomEvent(SIMPLE_AUDIO_PLAYER, {
         bubbles: true,
         composed: true,
         detail: {
           player: this,
           playerId: this.id,
           isPlaying: this.isPlaying
         }
       });
       this.dispatchEvent(customEvent);
     } else {
         this.sound.pause();
     }
   }
 
   render() {
     return html`
     <div class="container">
     ${this.progressRingSize
       ? html`
           <sl-progress-ring
             class="progress-ring"
             value=${this.progress || 0}
             style="
             --size: ${this.progressRingSize};
             --track-color: ${css`var(--gutter-color)`}; 
             --indicator-color: ${css`var(--primary-color)`};
             "
           ></sl-progress-ring>
         `
         : html ``
       }
       <button id="${SIMPLE_AUDIO_PLAYER}-btn" @click=${this.toggle}>
         ${this.isPlaying
         ? svg `
             <svg role="img" fill="currentColor" height="100%" width="100%" viewBox="0 0 16 16" class="icon"><path fill="none" d="M0 0h16v16H0z"></path><path d="M3 2h3v12H3zm7 0h3v12h-3z"></path></svg>
           `
         : svg `
             <svg role="img" fill="currentColor" height="100%" width="100%" viewBox="0 0 16 16" class="icon"><path d="M4.018 14L14.41 8 4.018 2z"></path></svg>
         `}
       </button>
     </div>
     `;
   }
}