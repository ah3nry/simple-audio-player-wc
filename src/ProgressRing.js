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

  // @query('.progress-ring__indicator')
  // indicator;
  get indicator() {
    return this.renderRoot.querySelector('.progress-ring__indicator');
  }

  //   @state() indicatorOffset: string;

  updated(changedProps) {
    super.updated(changedProps);

    //
    // This block is only required for Safari because it doesn't transition the circle when the custom properties
    // change, possibly because of a mix of pixel + unit-less values in the calc() function. It seems like a Safari bug,
    // but I couldn't pinpoint it so this works around the problem.
    //
    if (changedProps.has('percentage')) {
      const radius = parseFloat(
        getComputedStyle(this.indicator).getPropertyValue('r')
      );
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (this.value / 100) * circumference;

      this.indicatorOffset = `${offset}px`;
    }
  }

  render() {
    return html`
      <div
        part="base"
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
        <span part="label" class="progress-ring__label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

customElements.define('progress-ring', ProgressRing);
