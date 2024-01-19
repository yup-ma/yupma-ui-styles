

# @yupma/ui-styles


![YupMa logo](https://cdn.yupma.com/assets/logo-full.png)


**YupMa UI Styles** is a comprehensive base style library for the [YupMa design system](https://yupma.com/?src=npm-ui-styles). It provides a suite of CSS and SCSS files with tokens and classes that can easily be modified according to need. It provide modifier that you can use to create majestic UI for your product.

## Installation

Install with Yarn:

```sh
yarn add @yupma/ui-styles
```

Install with npm:

```sh
npm install @yupma/ui-styles
```

## Styles

YupMa UI Styles requires its styles to be imported to use in project properly. We currently have 1 stylesheet that need to be included in your project. The main stylesheet is
(`yupma_ui.scss`).

You have two options to include those stylesheets:

- If you have a SCSS preprocessor setup, include the SCSS files in your own stylesheet:

```scss
@import '@yupma/ui-styles/lib/scss/yupma_ui';
```

- If you don't have a SCSS preprocessor setup, you can import the compiled CSS files directly:

```css
@import '@yupma/ui-styles/lib/dist/index.css';
```

- CSS min version is also available

```css
@import '@yupma/ui-styles/lib/dist/index.min.css';
```
or
```html
<link rel="stylesheet" href="https://www.unpkg.com/@yupma/ui-styles@0.1.7/lib/dist/index.min.css">
```
or
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yupma/ui-styles@0.1.7/lib/dist/index.min.css">
```

> The default font, `'Roboto', sans-serif`, is not being applied. You can either change the default font or update your styles to include it.

## What's New

### [0.1.6] - [0.0.17] 
- Update color palette

---

- Initial beta release of `@yupma/ui-styles`
- SCSS & CSS both included in the package

## License

This extension is licensed under the [MIT License](https://github.com/yup-ma/yupma-ui-styles/blob/main/LICENSE)

### Support

Please contact us at [yupma.com/support](https://yupma.com/support) for any feedback, suggestions, or reporting issues. Thanks for your support and feedback.

### Acknowledgements

 - This project is highly inspired by [@Gitlab/UI](https://www.npmjs.com/package/@gitlab/ui)

