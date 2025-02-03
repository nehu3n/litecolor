const ANSI_CODES: Record<string, [number, number]> = {
  reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24],
  inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29],

  black: [30, 39], red: [31, 39], green: [32, 39], yellow: [33, 39], blue: [34, 39],
  magenta: [35, 39], cyan: [36, 39], white: [37, 39], gray: [90, 39], grey: [90, 39],

  brightRed: [91, 39], brightGreen: [92, 39], brightYellow: [93, 39], brightBlue: [94, 39],
  brightMagenta: [95, 39], brightCyan: [96, 39], brightWhite: [97, 39],

  bgBlack: [40, 49], bgRed: [41, 49], bgGreen: [42, 49], bgYellow: [43, 49],
  bgBlue: [44, 49], bgMagenta: [45, 49], bgCyan: [46, 49], bgWhite: [47, 49],
  bgGray: [100, 49], bgGrey: [100, 49],

  bgBrightRed: [101, 49], bgBrightGreen: [102, 49], bgBrightYellow: [103, 49],
  bgBrightBlue: [104, 49], bgBrightMagenta: [105, 49], bgBrightCyan: [106, 49],
  bgBrightWhite: [107, 49],
};

class Styler {
  private text: string;
  private styles: [number, number][] = [];

  constructor(text: string) {
    this.text = text;
  }

  private apply(code: [number, number]) {
    this.styles.push(code);
    return this;
  }

  color(name: keyof typeof ANSI_CODES) {
    return this.apply(ANSI_CODES[name]);
  }

  bg(name: keyof typeof ANSI_CODES) {
    return this.apply(ANSI_CODES[`bg${name.charAt(0).toUpperCase() + name.slice(1)}`]);
  }

  bold() { return this.apply(ANSI_CODES.bold); }
  dim() { return this.apply(ANSI_CODES.dim); }
  italic() { return this.apply(ANSI_CODES.italic); }
  underline() { return this.apply(ANSI_CODES.underline); }
  inverse() { return this.apply(ANSI_CODES.inverse); }
  hidden() { return this.apply(ANSI_CODES.hidden); }
  strikethrough() { return this.apply(ANSI_CODES.strikethrough); }

  rainbow() {
    const colors = ['red', 'yellow', 'green', 'cyan', 'blue', 'magenta'];
    this.text = [...this.text]
      .map((char, i) => `\u001b[${ANSI_CODES[colors[i % colors.length]][0]}m${char}\u001b[${ANSI_CODES[colors[i % colors.length]][1]}m`)
      .join('');
    return this;
  }

  zebra() {
    this.text = [...this.text]
      .map((char, i) => i % 2 ? `\u001b[7m${char}\u001b[27m` : char)
      .join('');
    return this;
  }

  america() {
    const colors = ['red', 'white', 'blue'];
    this.text = [...this.text]
      .map((char, i) => `\u001b[${ANSI_CODES[colors[i % colors.length]][0]}m${char}\u001b[${ANSI_CODES[colors[i % colors.length]][1]}m`)
      .join('');
    return this;
  }

  trap() {
    return this.bold().italic().underline().inverse();
  }

  random() {
    const styles = Object.keys(ANSI_CODES);
    const randomStyle = styles[Math.floor(Math.random() * styles.length)] as keyof typeof ANSI_CODES;
    return this.apply(ANSI_CODES[randomStyle]);
  }

  toString() {
    const openCodes = this.styles.map(code => `\u001b[${code[0]}m`).join('');
    const closeCodes = this.styles.slice().reverse().map(code => `\u001b[${code[1]}m`).join('');
    return `${openCodes}${this.text}${closeCodes}${'\u001b[0m'}`;
  }
}

export function style(text: string) {
  return new Styler(text);
}
