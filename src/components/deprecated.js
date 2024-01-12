import React from 'react'
import CSSJSON from 'cssjson'
import { css, Global } from "@emotion/react";

const pxRegexp = /"[^"]+"|'[^']+'|url\([^)]+\)|(\d*\.?\d+)rem/g;
const remSize = 16 * 0.625 * 1.6 * 0.625; // 10px
const pxSize = 16;

const mapAttributes = (el) => {

    const { attributes = {}, children = {} } = el;

    console.log(el)
    return {
        attributes: Object.fromEntries(Object.entries(attributes).map(([k, v]) => {
            if (typeof v === "string") {
                const declarationHasRem = v.match(pxRegexp);
                if (declarationHasRem) {
                    const expression = (v).replace(
                        pxRegexp,
                        (match, group) => (group ? (Number(group) * remSize) / pxSize + 'rem' : match),
                    );
                    return [k, expression]
                }
            }
            return [k, v]
        })),
        children: Object.fromEntries(Object.entries(children).map(([k, v]) => {
            return [k, mapAttributes(v)]
        }))
    }

}

const Deprecated = (nodeOrElement, styles) => {

    const Node = nodeOrElement

    const zz = mapAttributes(CSSJSON.toJSON(styles || ""));
    const render = CSSJSON.toCSS(zz);

    return ({ className, ...props }) => {
        return (
            <Node
                className={className ? `${className} deprecated` : `deprecated`}
                css={css(render)}
                {...props}
            />
        )
    }
}

const globalCssString = `
    .deprecated {
      /*
    1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
    2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
    */

      *,
      ::before,
      ::after {
        box-sizing: border-box; /* 1 */
        border-width: 0; /* 2 */
        border-style: solid; /* 2 */
        border-color: theme('borderColor.DEFAULT', currentColor); /* 2 */
      }

      ::before,
      ::after {
        --tw-content: '';
      }

      /*
      1. Use a consistent sensible line-height in all browsers.
      2. Prevent adjustments of font size after orientation changes in iOS.
      3. Use a more readable tab size.
      4. Use the user's configured \`sans\` font-family by default.
      */

      html {
        line-height: 1.5; /* 1 */
        -webkit-text-size-adjust: 100%; /* 2 */
        -moz-tab-size: 4; /* 3 */
        tab-size: 4; /* 3 */
        font-family: theme('fontFamily.sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"); /* 4 */
      }

      /*
      1. Remove the margin in all browsers.
      2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
      */

      body {
        margin: 0; /* 1 */
        line-height: inherit; /* 2 */
      }

      /*
      1. Add the correct height in Firefox.
      2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
      3. Ensure horizontal rules are visible by default.
      */

      hr {
        height: 0; /* 1 */
        color: inherit; /* 2 */
        border-top-width: 1px; /* 3 */
      }

      /*
      Add the correct text decoration in Chrome, Edge, and Safari.
      */

      abbr:where([title]) {
        text-decoration: underline dotted;
      }

      /*
      Remove the default font size and weight for headings.
      */

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-size: inherit;
        font-weight: inherit;
      }

      /*
      Reset links to optimize for opt-in styling instead of opt-out.
      */

      a {
        color: inherit;
        text-decoration: inherit;
      }

      /*
      Add the correct font weight in Edge and Safari.
      */

      b,
      strong {
        font-weight: bolder;
      }

      /*
      1. Use the user's configured \`mono\` font family by default.
      2. Correct the odd \`em\` font sizing in all browsers.
      */

      code,
      kbd,
      samp,
      pre {
        font-family: theme('fontFamily.mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace); /* 1 */
        font-size: 1em; /* 2 */
      }

      /*
      Add the correct font size in all browsers.
      */

      small {
        font-size: 80%;
      }

      /*
      Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
      */

      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      sub {
        bottom: -0.25em;
      }

      sup {
        top: -0.5em;
      }

      /*
      1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
      2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
      3. Remove gaps between table borders by default.
      */

      table {
        text-indent: 0; /* 1 */
        border-color: inherit; /* 2 */
        border-collapse: collapse; /* 3 */
      }

      /*
      1. Change the font styles in all browsers.
      2. Remove the margin in Firefox and Safari.
      3. Remove default padding in all browsers.
      */

      button,
      input,
      optgroup,
      select,
      textarea {
        font-family: inherit; /* 1 */
        font-size: 100%; /* 1 */
        font-weight: inherit; /* 1 */
        line-height: inherit; /* 1 */
        color: inherit; /* 1 */
        margin: 0; /* 2 */
        padding: 0; /* 3 */
      }

      /*
      Remove the inheritance of text transform in Edge and Firefox.
      */

      button,
      select {
        text-transform: none;
      }

      /*
      1. Correct the inability to style clickable types in iOS and Safari.
      2. Remove default button styles.
      */

      button,
      [type='button'],
      [type='reset'],
      [type='submit'] {
        -webkit-appearance: button; /* 1 */
        background-color: transparent; /* 2 */
        background-image: none; /* 2 */
      }

      /*
      Use the modern Firefox focus style for all focusable elements.
      */

      :-moz-focusring {
        outline: auto;
      }

      /*
      Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
      */

      :-moz-ui-invalid {
        box-shadow: none;
      }

      /*
      Add the correct vertical alignment in Chrome and Firefox.
      */

      progress {
        vertical-align: baseline;
      }

      /*
      Correct the cursor style of increment and decrement buttons in Safari.
      */

      ::-webkit-inner-spin-button,
      ::-webkit-outer-spin-button {
        height: auto;
      }

      /*
      1. Correct the odd appearance in Chrome and Safari.
      2. Correct the outline style in Safari.
      */

      [type='search'] {
        -webkit-appearance: textfield; /* 1 */
        outline-offset: -2px; /* 2 */
      }

      /*
      Remove the inner padding in Chrome and Safari on macOS.
      */

      ::-webkit-search-decoration {
        -webkit-appearance: none;
      }

      /*
      1. Correct the inability to style clickable types in iOS and Safari.
      2. Change font properties to \`inherit\` in Safari.
      */

      ::-webkit-file-upload-button {
        -webkit-appearance: button; /* 1 */
        font: inherit; /* 2 */
      }

      /*
      Add the correct display in Chrome and Safari.
      */

      summary {
        display: list-item;
      }

      /*
      Removes the default spacing and border for appropriate elements.
      */

      blockquote,
      dl,
      dd,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      hr,
      figure,
      p,
      pre {
        margin: 0;
      }

      fieldset {
        margin: 0;
        padding: 0;
      }

      legend {
        padding: 0;
      }

      ol,
      ul,
      menu {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      /*
      Prevent resizing textareas horizontally by default.
      */

      textarea {
        resize: vertical;
      }

      /*
      1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
      2. Set the default placeholder color to the user's configured gray 400 color.
      */

      input::placeholder,
      textarea::placeholder {
        opacity: 1; /* 1 */
        color: theme('colors.gray.400', #9ca3af); /* 2 */
      }

      /*
      Set the default cursor for buttons.
      */

      button,
      [role="button"] {
        cursor: pointer;
      }

      /*
      Make sure disabled buttons don't get the pointer cursor.
      */

      :disabled {
        cursor: default;
      }

      /*
      1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
      2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
         This can trigger a poorly considered lint error in some tools but is included by design.
      */

      img,
      svg,
      video,
      canvas,
      audio,
      iframe,
      embed,
      object {
        display: block; /* 1 */
        vertical-align: middle; /* 2 */
      }

      /*
      Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
      */

      img,
      video {
        max-width: 100%;
        height: auto;
      }

      /* Make elements with the HTML hidden attribute stay hidden by default */

      [hidden] {
        display: none;
      }

      .static-sp {
        padding-top: 15rem;
      }

      @media only screen and (max-width: 788px) {
        .static-sp {
          padding-top: 9.75rem;
        }
      }

      :root {
        --font-heading: 'IvyPresto Display-SemiBold', serif;
        --font-body: 'Open Sans', Arial, Helvetica, sans-serif;

        --color-light: #FFFFFF;
        --color-light-alt: #F6F4F2;
        --color-muted: #D6D6D6;
        --color-muted-light: #D9D9D9;
        --color-dark: #4D4D4D;
        --color-primary: #009FDA;
        --color-primary-light: #F3FAFD;
        --color-primary-dark: #0065BD;
        --color-accent: #69BE28;
        --color-accent-light: #F1FBEA;
        --color-accent-alt: #009B3A;
      }

      .show-at-device {
        display: none;
      }

      @media only screen and (max-width: 1024px) {
        .hide-at-device {
          display: none;
        }

        .show-at-device {
          display: block;
        }
      }

      .show-at-mobile {
        display: none;
      }

      @media only screen and (max-width: 620px) {
        .hide-at-mobile {
          display: none;
        }

        .show-at-mobile {
          display: block;
        }
      }

      .takeover-active {
        overflow-y: hidden;
      }

      .whiteText {
        color: #fff;
      }

      article,
      aside,
      details,
      figcaption,
      figure,
      footer,
      header,
      main,
      menu,
      nav,
      section,
      summary {
        display: block;
      }

      audio,
      canvas,
      progress,
      video {
        display: inline-block;
      }

      audio:not([controls]) {
        display: none;
        height: 0;
      }

      progress {
        vertical-align: baseline;
      }

      [hidden],
      template {
        display: none;
      }

      abbr[title] {
        border-bottom: none;
        text-decoration: underline dotted;
      }

      b,
      strong {
        font-weight: bolder;
      }

      dfn {
        font-style: italic;
      }

      mark {
        background-color: #ff0;
        color: #000;
      }

      small {
        font-size: 80%;
      }

      sub,
      sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
      }

      sub {
        bottom: -0.25em;
      }

      sup {
        top: -0.5em;
      }

      img {
        border-style: none;
      }

      svg:not(:root) {
        overflow: hidden;
      }

      code,
      kbd,
      pre,
      samp {
        font-family: monospace, monospace;
        font-size: 1em;
      }

      figure {
        margin: 1em 40px;
      }

      hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
      }

      button,
      input,
      optgroup,
      select,
      textarea {
        font: inherit;
        margin: 0;
      }

      input:focus,
      textarea:focus,
      select:focus {
        outline: 2px solid var(--color-accent);
      }

      optgroup {
        font-weight: 700;
      }

      button,
      input {
        overflow: visible;
      }

      button,
      select {
        text-transform: none;
      }

      [type='reset'],
      [type='submit'],
      button,
      html [type='button'] {
        -webkit-appearance: button;
      }

      [type='button']::-moz-focus-inner,
      [type='reset']::-moz-focus-inner,
      [type='submit']::-moz-focus-inner,
      button::-moz-focus-inner {
        border-style: none;
        padding: 0;
      }

      [type='button']:-moz-focusring,
      [type='reset']:-moz-focusring,
      [type='submit']:-moz-focusring,
      button:-moz-focusring {
        outline: 1px dotted ButtonText;
      }

      fieldset {
        border: 1px solid silver;
        margin: 0 2px;
        padding: 0.35em 0.625em 0.75em;
      }

      legend {
        box-sizing: border-box;
        color: inherit;
        display: table;
        max-width: 100%;
        padding: 0;
        white-space: normal;
      }

      textarea {
        overflow: auto;
      }

      [type='checkbox'],
      [type='radio'] {
        box-sizing: border-box;
        padding: 0;
      }

      [type='number']::-webkit-inner-spin-button,
      [type='number']::-webkit-outer-spin-button {
        height: auto;
      }

      [type='search'] {
        -webkit-appearance: textfield;
        outline-offset: -2px;
      }

      [type='search']::-webkit-search-cancel-button,
      [type='search']::-webkit-search-decoration {
        -webkit-appearance: none;
      }

      ::-webkit-input-placeholder {
        color: inherit;
        opacity: 0.54;
      }

      ::-webkit-file-upload-button {
        -webkit-appearance: button;
        font: inherit;
      }

      html {
        box-sizing: border-box;
        overflow-y: scroll;
      }

      * {
        box-sizing: inherit;
      }

      *:before {
        box-sizing: inherit;
      }

      *:after {
        box-sizing: inherit;
      }

      body {
        /* opacity fix for analytics configuration script */
        opacity: 1 !important;

        color: hsla(0, 0%, 0%, 0.8);
        font-family: var(--font-body);
        font-weight: normal;
        word-wrap: break-word;
        font-kerning: normal;
        -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        font-feature-settings: 'kern', 'liga', 'clig', 'calt';
      }

      img {
        max-width: 100%;
        padding: 0;
        margin: 0 0 1.45rem;
      }

      p {
        font-family: var(--font-body);
        line-height: 110%;
      }

      h1, h2, h3,
      h4, h5, h6 {
        line-height: 110%;
        margin-top: 0px;
      }

      h1, h2, h3 {
        font-family: var(--font-heading);
        font-weight: 700;
      }

      h4, h5, h6 {
        font-family: var(--font-body);
        font-weight: 600;
      }

      /* Heading font-sizes are in /static/css/fonts.css */

      .font-heading {
        font-family: var(--font-heading);
      }

      .font-body {
        font-family: var(--font-body);
      }

      hgroup {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      ul {
        padding: 0;
        margin: 0 0 1.45rem 1.45rem;
        list-style-position: outside;
        list-style-image: none;
      }

      ol {
        padding: 0;
        margin: 0 0 1.45rem 1.45rem;
        list-style-position: outside;
        list-style-image: none;
      }

      dl {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      dd {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      p {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      figure {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      pre {
        margin: 0 0 1.45rem;
        font-size: 0.85rem;
        line-height: 1.42;
        background: hsla(0, 0%, 0%, 0.04);
        border-radius: 3px;
        overflow: auto;
        word-wrap: normal;
        padding: 1.45rem;
      }

      table {
        padding: 0;
        margin: 0 0 1.45rem;
        font-size: 1rem;
        line-height: 1.45rem;
        border-collapse: collapse;
        width: 100%;
      }

      fieldset {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      blockquote {
        padding: 0;
        margin: 0 1.45rem 1.45rem;
      }

      form {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      noscript {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      iframe {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      hr {
        padding: 0;
        margin: 0 0 calc(1.45rem - 1px);
        background: hsla(0, 0%, 0%, 0.2);
        border: none;
        height: 1px;
      }

      address {
        padding: 0;
        margin: 0 0 1.45rem;
      }

      b {
        font-weight: bold;
      }

      strong {
        font-weight: bold;
      }

      dt {
        font-weight: bold;
      }

      th {
        font-weight: bold;
      }

      li {
        margin-bottom: calc(1.45rem / 2);
      }

      ol li {
        padding-left: 0;
      }

      ul li {
        padding-left: 0;
      }

      li > ol {
        margin-left: 1.45rem;
        margin-bottom: calc(1.45rem / 2);
        margin-top: calc(1.45rem / 2);
      }

      li > ul {
        margin-left: 1.45rem;
        margin-bottom: calc(1.45rem / 2);
        margin-top: calc(1.45rem / 2);
      }

      blockquote *:last-child {
        margin-bottom: 0;
      }

      li *:last-child {
        margin-bottom: 0;
      }

      p *:last-child {
        margin-bottom: 0;
      }

      li > p {
        margin-bottom: calc(1.45rem / 2);
      }

      code {
        font-size: 0.85rem;
        line-height: 1.45rem;
      }

      kbd {
        font-size: 0.85rem;
        line-height: 1.45rem;
      }

      samp {
        font-size: 0.85rem;
        line-height: 1.45rem;
      }

      abbr {
        border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
        cursor: help;
      }

      acronym {
        border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
        cursor: help;
      }

      abbr[title] {
        border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
        cursor: help;
        text-decoration: none;
      }

      thead {
        text-align: left;
      }

      td,
      th {
        text-align: left;
        border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
        font-feature-settings: 'tnum';
        -moz-font-feature-settings: 'tnum';
        -ms-font-feature-settings: 'tnum';
        -webkit-font-feature-settings: 'tnum';
        padding: 0.725rem 0.96667rem calc(0.725rem - 1px);
      }

      th:first-child,
      td:first-child {
        padding-left: 0;
      }

      th:last-child,
      td:last-child {
        padding-right: 0;
      }

      tt,
      code {
        background-color: hsla(0, 0%, 0%, 0.04);
        border-radius: 3px;
        font-family: 'SFMono-Regular', Consolas, 'Roboto Mono', 'Droid Sans Mono',
        'Liberation Mono', Menlo, Courier, monospace;
        padding: 0.2em 0;
      }

      pre code {
        background: none;
        line-height: 1.42;
      }

      code:before,
      code:after,
      tt:before,
      tt:after {
        letter-spacing: -0.2em;
        content: ' ';
      }

      pre code:before,
      pre code:after,
      pre tt:before,
      pre tt:after {
        content: '';
      }

      p {
        font-family: var(--font-body);
        line-height: 110%;
      }

      h1, h2, h3,
      h4, h5, h6 {
        line-height: 110%;
        margin-top: 0px;
      }

      h1, h2, h3 {
        font-family: var(--font-heading);
        font-weight: 700;
      }

      h4, h5, h6 {
        font-family: var(--font-body);
        font-weight: 600;
      }

      h1 {
        font-size: 10.0rem;
      }

      h2 {
        font-size: 9.0rem;
      }

      h3 {
        font-size: 6.5rem;
      }

      h4 {
        font-size: 3.2rem;
      }

      h5 {
        font-size: 2.4rem;
      }

      h6 {
        font-size: 2.0rem;
      }

      p {
        font-size: 2.0rem;
      }

      @media only screen and (max-width: 1600px) {
        h1 {
          font-size: 8.0rem;
        }

        h2 {
          font-size: 7.5rem;
        }

        h3 {
          font-size: 5.4rem;
        }

        h4 {
          font-size: 2.4rem;
        }

        h5 {
          font-size: 2.0rem;
        }

        h6 {
          font-size: 1.8rem;
        }

        p {
          font-size: 1.8rem;
        }
      }

      /* @media only screen and (max-width: 1280px) {
        h1 { font-size: 7.0rem; }
        h2 { font-size: 6.0rem; }
        h3 { font-size: 4.8rem; }
        h4 { font-size: 2.4rem; }
        h5 { font-size: 2.0rem; }
        h6 { font-size: 1.8rem; }
        p  { font-size: 1.8rem; }
      } */

      @media only screen and (max-width: 1280px) {
        h1 {
          font-size: 6.0rem;
        }

        h2 {
          font-size: 4.5rem;
        }

        h3 {
          font-size: 3.2rem;
        }

        h4 {
          font-size: 2.0rem;
        }

        h5 {
          font-size: 1.8rem;
        }

        h6 {
          font-size: 1.6rem;
        }

        p {
          font-size: 1.6rem;
        }
      }

      a {
        background-color: transparent;
        color: #0065BD;
        font-weight: 600;

        -webkit-text-decoration-skip: objects;
      }

      a:active,
      a:hover {
        outline-width: 0;
      }

      p a {
        text-decoration: underline;
      }
    }
`;

export const DeprecatedGlobals = () => {

    const zz = mapAttributes(CSSJSON.toJSON(globalCssString || ""));
    const render = CSSJSON.toCSS(zz);

    return (
        <Global
            styles={css(render)}
        />
    )
}

export default Deprecated
