# YMG Auto Sales

One-page website for [YMG Auto Sales](https://web.facebook.com/ymgautosales/), a car dealership
on Ikorodu Road, Anthony, Lagos.

Static HTML/CSS/JS — no build step, no dependencies. Deployed on Vercel.

## Structure

```
index.html      markup for the whole page
styles.css      all styling (single stylesheet, CSS custom properties for the palette)
script.js       inventory filtering, FAQ accordion, mobile nav
assets/         logo, hero poster frame, hero video (webm + mp4)
```

## Local development

Any static file server works:

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Notes

- Layout is a single 1180px grid: every section uses the `.wrap` container so
  gutters stay consistent (24px on mobile, centred at wider viewports).
- The hero video is served as WebM (VP9) with an MP4 (H.264) fallback for
  Safari/iOS, and `hero.jpg` as the poster frame so something shows instantly.
- Inventory listings and prices are **placeholders**. Vehicle card photos are
  from Wikimedia Commons (CC BY-SA); the hero footage and logo are YMG's own.
