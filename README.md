# String tools
Local client-side only tools, helpers and cheatsheets
https://floriancourgey.github.io/tools

## Concepts
- Accessible online and local (for on the go access)
- Client-side only, no server
- Javascript with basic JS+VueJS 2.5 (no npm or webpack for the moment)
- Bootstrap 3 (& jQuery, only for Bootstrap JS effects)
- Focused on easy update
- Each folder is independant from other, like its own module
- Vendors are part of the repo in /vendor to work locally (no CDN, no package management for the moment)
- Used as a VueJS+router+i18n first steps tutorial
- Basic internationalisation is present (english, french) via translations-en.js in each folder, e.g.
```javascript
var translations = translations || {};
translations['en'] = {
  'title':'SEO tools',
}
```
```html
{{ l('title') }}
```

## Inspirations
- https://codebeautify.org/
- https://www.asciitohex.com/
- https://www.danstools.com/
