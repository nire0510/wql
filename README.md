WQL
===
Query the web with SQL like syntax

## Installation
`npm i @nire0510/wql`

## Usage
```javascript
import wql from '@nire0510/wql';
// or: const wql = require('@nire0510/wql');

(async () => {
  const response = await wql(`SELECT attr("src") FROM "https://www.google.com" WHERE selector = "img";`/*, options */);

  console.log(JSON.stringify(response, null, 2));
})();
```

### Running on Linux Server
1. Install Chromium browser:  
   `sudo apt-get install chromium-browser`
1. Add the `executablePath` options parameter:  
   ```
   const response = await wql('SELECT ...', {
     executablePath: '/usr/bin/chromium-browser',
   };
   ```

## Options
You can send an options object to the `wql` functions. None of its properties is mandatory:
```javascript
const response = await wql(`SELECT text FROM "https://www.google.com";`, {
  headless: boolean,            /* BOOLEAN (default true): Indicates whether it should run in headless mode (hidden browser) */
  turbo: boolean,               /* BOOLEAN (default false): Indicates whether it should run in turbo mode (avoids image, stylesheets & fonts download) */
  screenshot: boolean,          /* BOOLEAN (default false): Indicates whether a screenshot should be taken */
  userDataDir: string,          /* STRING: Path to a User Data Directory */
  executablePath: string,       /* STRING: Path to a browser executable to run instead of the bundled Chromium */
  viewport: {
    height: number,             /* NUMBER (default 720): Page height in pixels */
    width: boolean,             /* NUMBER (default 1080): Page width in pixels */
  },
  wait: string,                 /* STRING (default 'networkidle2'. Options: 'domcontentloaded', 'networkidle0', 'networkidle2', selector): The event to wait for before running the query */,
};
```

## Syntax
``` sql
SELECT [DISTINCT] property [AS alias]
  [, property [AS alias], ...]
FROM "url"
  [, "url", ...]
[WHERE condition
  [AND|OR condition, ...]]
[ORDER BY property [DESC]
  [, property [DESC], ...]]
[LIMIT max_rows];
```
* URLs in the `FROM` clause must be wrapped in parentheses, e.g. "https://www.google.com".
* Method arguments (i.e. `attr`, `data` & `style`) must be wrapped in parentheses, e.g. `attr("id")`.

### SELECT
``` sql
SELECT text,                    -- inner text
  content,                      -- text content
  html,                         -- outer HTML
  mardown,                      -- outer HTML as markdown
  tag,                          -- tag name
  data("fullname") AS fullname, -- dataset attribute value
  attr("id") AS id,             -- attribute value
  rect("top") AS top,           -- element rectangle (check getBoundingClientRect for options)
  style("fontSize") AS fontSize -- style property value
```

### FROM
``` sql
FROM "https://www.google.com",
  "https://www.example.com"
```

### WHERE
``` sql
WHERE selector = ".article p"
  AND (text = 'test' OR text = 'bla')
-- or any of this other options:
WHERE text != 'test'
WHERE text LIKE '%test'
WHERE text LIKE '%test%'
WHERE attr("id") LIKE 'test%'
WHERE rect("width") <= "10px"
WHERE rect("width") > "10px" AND width < "15px"
WHERE rect("width") BETWEEN "10px" AND "15px"
WHERE rect("width") IN ("10px", "20px", "30px")
```

### ORDER BY
``` sql
ORDER BY text
ORDER BY style("fontSize") DESC
```

### LIMIT
``` sql
LIMIT 10
```

## Examples

```javascript
import wql from '@nire0510/wql';
// or: const wql = require('@nire0510/wql');

(async () => {
  // Get all images URL:
  const images = await wql(`SELECT attr("src") FROM "https://www.google.com" WHERE selector = "img";`);
  // Get all headers font-size, sorted by descending size:
  const headers = await wql(`SELECT style("fontSize") AS fontSize FROM "https://www.google.com" WHERE selector IN ("h1", "h2", "h3", "h4", "h5", "h6") ORDER by fontSize DESC;`);

  console.log(images);
  console.log(headers);
})();
```
