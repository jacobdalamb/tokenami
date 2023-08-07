import { z } from 'zod';
import * as CSS from 'csstype';
import * as Supports from './supports';

const tokenProperty = (name: string) => `---${name}`;
const tokenValue = (themeKey: string, name: string) => `var(---${themeKey}-${name})`;
const anyValue = (value: string) => `var(---,${value})`;
const themeValues = (theme: Theme) => (themeKey: ThemeKey) => theme[themeKey];

const tokenPropertyRegex = /---([a-z]+)/;
const tokenValueRegex = /var\(---([\w-]+)-([\w-]+)\)/;
const anyValueRegex = /var\(---,(.+)\)/;

const GridValue = z.number();

const TokenProperty = z.string().refine((value) => {
  return tokenPropertyRegex.test(value);
});

const TokenValue = z.string().refine((value) => {
  return tokenValueRegex.test(value);
});

const AnyValue = z.string().refine((value) => {
  return anyValueRegex.test(value);
});

type GridValue = z.infer<typeof GridValue>;
type TokenProperty<P extends string = string> = `---${P}`;
type TokenValue<TK extends string = string, V extends string = string> = `var(---${TK}-${V})`;
type AnyValue = string & {};

type ThemeKey =
  | 'alpha'
  | 'border'
  | 'color'
  | 'ease'
  | 'font-size'
  | 'leading'
  | 'line-style'
  | 'radii'
  | 'size'
  | 'shadow'
  | 'tracking'
  | 'transition'
  | 'weight'
  | 'z'
  | (string & {});

type ThemeValues = Record<string, string | number>;
type Theme = Partial<Record<ThemeKey, ThemeValues>>;
type Aliases = Partial<Record<keyof CSS.StandardLonghandPropertiesHyphen, string[]>>;
type PropertiesOptions = readonly ('grid' | ThemeKey)[];

interface Config {
  include: string[];
  exclude?: string[];
  media?: { [name: string]: string | number };
  aliases?: Aliases;
  grid: string;
  theme: Theme;
  properties?: Partial<Record<Supports.CSSProperty, PropertiesOptions>>;
}

/* ---------------------------------------------------------------------------------------------- */

function getTokenPropertyName(tokenProperty: TokenProperty) {
  return tokenProperty.replace(tokenPropertyRegex, '$1');
}

export type { Config, Theme, Aliases };
export {
  TokenProperty,
  TokenValue,
  GridValue,
  AnyValue,
  //
  tokenProperty,
  tokenValue,
  anyValue,
  themeValues,
  getTokenPropertyName,
};
