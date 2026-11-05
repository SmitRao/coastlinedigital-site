# Web fonts

Self-hosted Latin subsets of two variable fonts, downloaded from Google Fonts:

| File | Family | Weights | License |
|---|---|---|---|
| `inter-latin-var.woff2` | Inter | 400–600 | SIL Open Font License 1.1 (https://github.com/rsms/inter) |
| `instrument-sans-latin-var.woff2` | Instrument Sans | 500–700 | SIL Open Font License 1.1 (https://github.com/Instrument/instrument-sans) |

Both fonts are declared in `src/styles/tokens.css` and preloaded in `src/components/layout.mjs`.
Self-hosting removes the third-party request to Google and a render-blocking stylesheet.
