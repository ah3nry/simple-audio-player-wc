# \<audio-player-wc>

A simple audio player web component.

<img width="87" alt="Screenshot 2022-08-04 at 12 05 52" src="https://user-images.githubusercontent.com/2929988/182858609-dabb3754-e777-478c-94e5-e9917172a0bf.png">
<img width="93" alt="Screenshot 2022-08-04 at 12 18 22" src="https://user-images.githubusercontent.com/2929988/182858653-581268fd-303a-4758-866b-75a84ad6c378.png">


## Installation

```bash
npm i audio-player-wc

yarn add audio-player-wc
```

## Usage
See [demo](./demo/index.html)

```html
<script type="module">
  import 'audio-player-wc/player-wc';
</script>

<audio-player-wc></audio-player-wc>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

TODO


## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
