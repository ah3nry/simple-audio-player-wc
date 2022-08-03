import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../player-wc.js';

describe('PlayerWc', () => {
  it('renders button with the play icon', async () => {
    const el = await fixture(html`<player-wc></player-wc>`);

    expect(
      el.shadowRoot.querySelector('svg').getAttribute('data-testid')
    ).to.equal('play-icon');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<player-wc></player-wc>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
