import { style } from '../dist';

const text = style("hello world!")
  .color('green').toString();

console.log(text);
