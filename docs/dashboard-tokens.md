# Dashboard tokens: what was measured and why

The dashboard palette comes from the supplied `dashboard-design.md`. Three
values depart from it. Each one is here because a check failed, and each is
reproducible — nothing below is a taste judgement.

Token values live in [`styles/dashboard/tokens.css`](../styles/dashboard/tokens.css);
their Tailwind bindings in [`styles/dashboard/theme.css`](../styles/dashboard/theme.css).

## 1. Dark `--chart-1` / `--chart-2` hold their light-mode steps

The stock dark values — blue `oklch(0.488 0.243 264.376)` and green
`oklch(0.696 0.17 162.48)` — fail against the near-black dark surface:

| Check                              | Stock dark pair               | Held light pair |
| ---------------------------------- | ----------------------------- | --------------- |
| Contrast vs surface                | **2.55:1** (blue)             | ≥3:1 both       |
| Lightness band (dark: L 0.48–0.67) | **0.702 out of band** (green) | both inside     |
| Adjacent CVD ΔE                    | 34.0                          | 14.8 (protan)   |
| Normal-vision ΔE                   | 38.5                          | 31.6            |

Orange-600 + teal-600 pass every check on **both** surfaces, so they are used in
both themes. The side benefit is that a series never changes hue when the theme
flips.

## 2. The five chart colors are not a five-way categorical set

On the light surface the full ramp fails hard:

- `chart-4` ↔ `chart-5` are **ΔE 7.4 to normal vision** — below the 15 floor,
  i.e. hard to tell apart even with full colour vision.
- `chart-3` falls below the chroma floor (reads grey).
- `chart-4` and `chart-5` are under 3:1 against the surface.

So charts use at most the validated **two-series** pair. Where more categories
are needed, identity comes from something other than hue — the channel chart is
a single hue with the categories named on the axis.

**Adding a third series is not a matter of picking `chart-3`.** Re-run the
validator first and re-step whatever you add.

## 3. Status _ink_ is separate from status _fill_

`--success` / `--warning` / `--destructive` are tuned to be filled, not read. As
small text they measure:

| As text on | success | warning    | destructive |
| ---------- | ------- | ---------- | ----------- |
| white card | 3.67:1  | **2.15:1** | 4.76:1      |
| dark card  | 8.03:1  | 9.23:1     | **1.97:1**  |

Two hard failures. `--success-ink` / `--warning-ink` / `--destructive-ink` are
the same hues re-stepped, solved against the _harder_ of the two backgrounds
they actually sit on — a 10% tint of their own hue over the card, as in the
status badges:

- 4.58:1 on the tinted badge
- 4.95–5.46:1 on the plain card

Rule: **`--*-ink` for glyphs, `--success` / `--warning` / `--destructive` for
backgrounds and borders.**

The `trialing` badge carries no fill at all — on `bg-muted` the muted foreground
reached only 4.35:1, and a trial should read quietest of the four states anyway.

## Re-running the checks

Categorical palette (CVD, lightness band, chroma, contrast) — from the `dataviz`
skill directory:

```bash
node scripts/validate_palette.js "#f54900,#009689" --mode light
node scripts/validate_palette.js "#f54900,#009689" --mode dark
```

Hex equivalents of the oklch tokens, in case you need them:

| Token               | Light     | Dark      |
| ------------------- | --------- | --------- |
| `--chart-1`         | `#f54900` | `#f54900` |
| `--chart-2`         | `#009689` | `#009689` |
| `--success-ink`     | `#007e4d` | `#00bc7d` |
| `--warning-ink`     | `#ab5c00` | `#fe9a00` |
| `--destructive-ink` | `#d60000` | `#fb2c36` |

Live text contrast is worth measuring in the browser rather than from the token
values, because the badge tints composite over the card. Read the computed
`color` and every ancestor `background-color`, composite the alphas, and compare
— and convert colours through a canvas, not a regex: Chrome returns computed
colours as `oklch(...)`, so string-parsing them silently produces nonsense.
