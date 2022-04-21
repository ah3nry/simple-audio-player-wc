import { css } from 'lit';

export default css`
  :host {
    --background-color: rgb(125, 125, 125);
    --primary-color: rgb(200, 200, 2);
    --gutter-color: rgba(200, 200, 2, 0.4);
    --ring-width: 3px;
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
    cursor: pointer;
    border-radius: 50%;
    grid-column: 1;
    grid-row: 1;
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
