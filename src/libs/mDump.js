import moment from "moment";
import kleur from "kleur";

export default function mDump(str, c = "blue", withNewLine = true) {
  const format = `${moment().format()} :: ${str}`;
  const display = kleur[c](format);
  if (withNewLine) {
    console.log(display);
  } else {
    process.stdout.write(display);
  }
  return format;
}