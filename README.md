

# @yupma/ui-styles


![YupMa logo](https://cdn.yupma.com/assets/logo-full.png)


**YupMa UI Styles** is a comprehensive style library for the [YupMa design system](https://www.yupma.com). It provides a suite of CSS and SCSS files with tokens and classes that can easily be modified according to need.

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

> The default font, `'Roboto', sans-serif`, is not being applied. You can either change the default font or update your styles to include it.

## Modification

Feel free to customize this package to suit your needs. Please note that modifications are currently only feasible when using SCSS in your project. Here’s how you can do it:

1. Update Variable Values: Begin by adjusting the values of the variables to your preference. You can locate all the available variables in the `@yupma/ui-styles/lib/scss/variables`` file. Keep in mind that only the variables marked with the !default flag are customizable.

2. Import the SCSS File: After you've updated the variable values, proceed to import the SCSS file into your project. Here’s an example of how to do this:

```scss
$blue: red; // Changing the default blue color to red
$red: blue; // Changing the default red color to blue
@import '@yupma/ui-styles/lib/scss/yupma_ui';
```

### Modifiable variables

| Variable Name             | Default Value                                       | Description                                                   |
|---------------------------|-----------------------------------------------------|---------------------------------------------------------------|
| `$grid-size`              | `px-to-rem(8px)`                                    | Sets the base grid size for the layout, using a scale of 8.   |
| `$limited-layout-width`   | `990px`                                             | Defines the maximum width for limited layout areas.           |
| `$container-xl`           | `1280px`                                            | Specifies the extra-large container size for responsive design.|
| `$black`                  | ![black](https://via.placeholder.com/10/000000?text=+) `#000` | Represents standard black color for various UI elements.      |
| `$black-normal`           | ![black-normal](https://via.placeholder.com/10/333333?text=+) `#333` | A normal shade of black, usually used for text.              |
| `$white`                  | ![white](https://via.placeholder.com/10/ffffff?text=+) `#fff` | Pure white color, often used for backgrounds or text.        |
| `$white-contrast`         | ![white-contrast](https://via.placeholder.com/10/ffffff?text=+) `#fff` | Used to ensure contrast, especially in dark themes.          |
| `$white-normal`           | ![white-normal](https://via.placeholder.com/10/f0f0f0?text=+) `#f0f0f0` | A softer white, commonly used for UI surfaces.               |
| `$white-dark`             | ![white-dark](https://via.placeholder.com/10/eaeaea?text=+) `#eaeaea` | Darker shade of white, suitable for borders and dividers.    |
| `$white-transparent`      | `rgba(255, 255, 255, 0.8)`                          | Semi-transparent white, useful for overlays and effects.      |
| `$green`                  | ![green](https://via.placeholder.com/10/2da160?text=+) `#2da160` | Represents the primary green color used in the UI.           |
| `$blue`                   | ![blue](https://via.placeholder.com/10/428fdc?text=+) `#428fdc` | The standard blue color, often used for links and buttons.    |
| `$orange`                 | ![orange](https://via.placeholder.com/10/c17d10?text=+) `#c17d10` | A vivid orange, typically used for warnings or highlights.   |
| `$red`                    | ![red](https://via.placeholder.com/10/e72000?text=+) `#e72000` | Bright red color, commonly used for alerts or errors.         |
| `$purple`                 | ![purple](https://via.placeholder.com/10/9475db?text=+) `#9475db` | A soft purple, used for subtle accents or secondary elements. |
| `$gray`                   | ![gray](https://via.placeholder.com/10/89888d?text=+) `#89888d` | Neutral gray, versatile for various UI components.            |
| `$brand`                  | ![brand](https://via.placeholder.com/10/0279e1?text=+) `#0279e1` | The brand's primary color, used for identity and emphasis.    |
| `$brand-light`            | ![brand-light](https://via.placeholder.com/10/deefff?text=+) `#deefff` | Lighter brand color, good for backgrounds or large areas.     |
| `$data-viz-green`         | ![data-viz-green](https://via.placeholder.com/10/81ac41?text=+) `#81ac41` | Green color specifically used for data visualizations.       |
| `$data-viz-aqua`          | ![data-viz-aqua](https://via.placeholder.com/10/00acc4?text=+) `#00acc4` | Aqua shade for visualizing data, adds a refreshing touch.     |
| `$data-viz-blue`          | ![data-viz-blue](https://via.placeholder.com/10/7992f5?text=+) `#7992f5` | Blue variant for data charts and graphs.                      |
| `$data-viz-magenta`       | ![data-viz-magenta](https://via.placeholder.com/10/e86e9a?text=+) `#e86e9a` | Magenta color for a striking presence in data visualization.  |
| `$data-viz-orange`        | ![data-viz-orange](https://via.placeholder.com/10/9475db?text=+) `#9475db` | Orange color for a vibrant look in data visuals.              |
| `$ym-text-color-secondary`| `$gray-500`                                         | Secondary text color, usually a mid-tone gray.                |
| `$ym-text-color-disabled` | `$gray-400`                                         | Color for disabled text, ensuring readability yet subdued.    |
| `$ym-regular-font`        | `'Roboto', sans-serif`                              | The default font family for regular text content.             |
| `$border-color`           | `$gray-100`                                         | Default color for borders, providing a subtle separation.     |
| `$ym-transition-duration-slow` | `0.4s`                                          | Slow transition duration, for subtle UI animations.           |
| `$ym-transition-duration-medium` | `0.2s`                                        | Medium transition duration, balancing speed and smoothness.   |
| `$body-color`             | `$ym-text-color`                                    | The primary body text color, adaptable to theme changes.      |
| `$font-family-regular`    | `$ym-regular-font`                                  | Default font for regular text, ensuring readability.          |
| `$font-family-monospace`  | `$ym-monospace-font`                                | Monospace font option, used in code blocks or technical content. |
| `$card-cap-bg`            | `$gray-10`                                          | Background color for the top of cards, often a light gray.    |
| `$popover-bg`             | ![popover-bg](https://via.placeholder.com/10/ffffff?text=+) `$white` | Background color for popovers, typically a clean white.       |



## What's New

- Initial beta release of `@yupma/ui-styles`
- SCSS & CSS both included in the package

## License

This extension is licensed under the [MIT License](https://github.com/yup-ma/yupma-ui-styles/blob/main/LICENSE)

### Support

Please contact us at [yupma.com/support](https://yupma.com/support) for any feedback, suggestions, or reporting issues. Thanks for your support and feedback.

### Acknowledgements

 - This project is highly inspired by [@Gitlab/UI](https://www.npmjs.com/package/@gitlab/ui)

