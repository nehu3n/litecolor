<img src="./.github/icon.png" width="170px" align="right" />

# SmallColor

An ultra tiny, elegant and agnostic library written in TypeScript.

```ts
import { style } from "smallcolor";

const text = style("Hello world!")
  .color("green")
  .bold()
  .toString();

console.log(text);
```

##### See more examples in the [examples folder](./examples).

---

## ✨ Features

- Ultra tiny
- Elegant API
- Agnostic (Deno, Bun and NodeJS)
- Variety of styles and colors

---

## 🎀 Styles and colors

_A clarification:_ the `.toString()` method is required to convert a string after applying colors and styles.

#### Colors are applied with the `.color()` method.

```ts
const text = style("hello world").color("red").toString(); // 'red' color
```

And they are the following:

```ruby
# Colors:
black
red
green
yellow
blue
magenta
cyan
white
gray
grey

# More vivid colors:
brightBlack
brightRed
brightGreen
brightYellow
brightBlue
brightMagenta
brightCyan
brightWhite
brightGray
brightGrey
```

#### Each style has its own method.

```ts
const text = style("hello world").bold().toString(); // 'bold' style
```

And they are the following:

```ruby
# Styles:
reset
bold
dim
italic
underline
inverse
hidden
strikethrough
```

#### Background colors are applied with the `.bg()` method.

```ts
const text = style("hello world").bg("green").toString(); // 'green' background color
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---
