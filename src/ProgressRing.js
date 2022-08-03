import { LitElement, html } from 'lit';
import progressRingStyles from './ProgressRing.styles.js';

class ProgressRing extends LitElement {
  static styles = progressRingStyles;

  static properties = {
    value: { type: Number, reflect: true },
    indicatorOffset: { state: true, type: String },
  };

  constructor() {
    super();
    this.value = 0;
  }

  get indicator() {
    return this.renderRoot.querySelector('.progress-ring__indicator');
  }

  updated(changedProps) {
    super.updated(changedProps);
  }

  render() {
    return html`
      <div
        class="progress-ring"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${this.value}"
        style="--percentage: ${this.value / 100}"
      >
        <svg class="progress-ring__image">
          <circle class="progress-ring__track"></circle>
          <circle
            class="progress-ring__indicator"
            style="stroke-dashoffset: ${this.indicatorOffset}"
          ></circle>
        </svg>
      </div>
    `;
  }
}

customElements.define('progress-ring', ProgressRing);
