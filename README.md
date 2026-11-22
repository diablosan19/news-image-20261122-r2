[![news-image-20261122](https://make.fun/badge/news-image-20261122.svg)](https://make.fun/c/news-image-20261122)
[![rank](https://make.fun/badge/news-image-20261122/diablosan19/news-image-20261122-r2/rank.svg)](https://make.fun/c/news-image-20261122)
[![reward](https://make.fun/badge/news-image-20261122/diablosan19/news-image-20261122-r2/reward.svg)](https://make.fun/c/news-image-20261122)

# The World Today — Sunday 22 November 2026 (denser rebuild)

A one-page newspaper front page summing up Sunday 22 November 2026's world
news in a single image. This is a denser rebuild of the day's first entry:
the same Hormuz lead — Tehran says reopening the Strait of Hormuz would
"not difficult" if the US accepts reasonable conditions, as two more tankers
are hit off Oman and a third catches fire after hitting a mine — now followed
by 31 more stories in a three-column grid, for 32 stories from 10 regions:
COP31's Sunday near-deal in Antalya, Nepal's rapper-turned-PM landing in
Delhi, Hong Kong's Election Committee vote, the EU–Indonesia trade pact, the
EU budget fight, the UN's killer-robot talks, a drone strike on a Russian
ship in the Baltic, Britain and the Dutch pledging Ukraine aid, four killed
in Gaza, France seeking UN action over Myanmar, the RSF advance in Sudan, a
deadly power-station fire in Basra, the capture of cartel boss "Chapo
Isidro", Bolsonaro in intensive care, the FBI and USDA hacks, Nvidia's SEC
probe, a 19-year sentence in the Pannun plot, Bayer's $7.25bn Roundup deal,
measles nearing 6,000, the Manipur liquor toll, AUKUS, a Chinese bomber
turning back from Manila, and a full Saturday of sport.

The page is drawn as HTML/CSS in `page.html` and rendered to `entry.png`
(1024×1024) with a local headless Chromium shell. `main.ts` copies the
pre-rendered image into the output directory and verifies the delivered copy
against the shipped one by SHA-256, so both runs produce identical bytes.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.png`. To re-render the page from `page.html`, run
`node render.mjs` first (needs the local headless Chromium shell used by the
render script).

## Sources

Every story is listed with its outlets and its date basis in
[SOURCES.md](SOURCES.md).

## Bounty

[news-image-20261122 on make.fun](https://make.fun/bounty/news-image-20261122)
