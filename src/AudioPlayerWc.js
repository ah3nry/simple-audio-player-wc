import { LitElement, html, css, svg } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { throttle } from './utils.js';
import './ProgressRing.js';
import playerStyles from './AudioPlayerWc.styles.js';

const SIMPLE_AUDIO_PLAYER = 'simple-audio-player';

/**
 * Simple audio player element.
 *
 *
 * @cssproperty --background-color - element background color
 * @cssproperty --primary-color - element primary color
 * @cssproperty --gutter-color - element gutter color
 */
export class AudioPlayerWc extends LitElement {
  static styles = playerStyles;

  static properties = {
    src: { type: String, attribute: true }, // public
    isPlaying: { type: Boolean, state: false }, // not public
    duration: { type: Number, state: true }, // not public
    progressRingSize: { type: Number, state: false }, // not public
    currentTime: { type: Number, state: true }, // not public
    progress: { type: Number, state: true }, // not public
    hasProgressRing: { type: Boolean, attribute: true },
  };

  constructor() {
    super();
    this.hasProgressRing = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.sound = new Audio(this.src);
    this.duration = this.sound.duration;
    this.sound.addEventListener('timeupdate', () => {
      throttle(() => {
        this.progress = (this.sound.currentTime / this.duration) * 100;
      }, 800);
    });
    this.sound.addEventListener('canplay', () => {
      this.duration = this.sound.duration;
    });
    this.sound.addEventListener('ended', () => this.endOfTrack());
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
      this.sound.play();
      const customEvent = new CustomEvent(SIMPLE_AUDIO_PLAYER, {
        bubbles: true,
        composed: true,
        detail: {
          player: this,
          playerId: this.id,
          isPlaying: this.isPlaying,
        },
      });
      this.dispatchEvent(customEvent);
    } else {
      this.sound.pause();
    }
  }

  render() {
    const styles = {
      width: this.hasProgressRing ? css`calc(100% - 5px)` : '100%',
      height: this.hasProgressRing ? css`calc(100% - 5px)` : '100%',
    };

    return html`
      <div class="container">
        ${this.progressRingSize && this.hasProgressRing
          ? html`
              <progress-ring
                class="progress-ring"
                value=${this.progress || 0}
                style="
                  --size: ${this.progressRingSize};
                  --track-color: ${css`var(--gutter-color)`}; 
                  --indicator-color: ${css`var(--primary-color)`};
                  --track-width: ${css`var(--ring-width)`};
                "
              >
              </progress-ring>
            `
          : html``}
        <button
          id="${SIMPLE_AUDIO_PLAYER}-btn"
          @click=${this.toggle}
          style=${styleMap(styles)}
          aria-label=${this.isPlaying ? 'pause' : 'play'}
        >
          ${this.isPlaying
            ? svg`
             <svg data-testid="pause-icon" role="img" fill="currentColor" viewBox="1 1 14 14" class="icon">
              <title>Pause</title>
              <path fill="none" d="M0 0h16v16H0z"></path><path d="M3 2h3v12H3zm7 0h3v12h-3z">
              </path>
             </svg>
           `
            : svg`
             <svg data-testid="play-icon" role="img" fill="currentColor" viewBox="1 1 14 14" class="icon">
              <title>Play</title>
              <path d="M4.018 14L14.41 8 4.018 2z">
              </path>
             </svg>
         `}
        </button>
      </div>
    `;
  }
}