#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { env, exit } from 'node:process';
import beautify from 'js-beautify';

const { BELLADONNA_BASE, BELLADONNA_PATH } = env;
const ㅇ = {
  'indent_size': 2,
  'end_with_newline': true,
  'preserve_newlines': false,
  'brace_style': 'expand',
  'unescape_strings': true,
};
const ㅎ = Object.fromEntries([
  ['ETag', 'If-None-Match'],
  ['Last-Modified', 'If-Modified-Since']
].map(([$, _]) => [$, [new URL($, import.meta.url), _]]));

const request = await Promise.all(Object.values(ㅎ).map(([$, _]) =>
  readFile($).then($ => [_, $])
)).then($ =>
  new Request(new URL(BELLADONNA_PATH, BELLADONNA_BASE), { headers: new Headers($) })
);

const response = await fetch(request);

if (response.status === 304) console.error('skip'), exit(0);
if (!response.ok) throw response.status;
if (new Date(response.headers.get('Last-Modified'))
   <new Date(request.headers.get('If-Modified-Since'))
   ) console.error('old'), exit(0);

const [ fileTimeStamp ] = await response.text().then($ => /var\s+fileTimeStamp[^;]+;/.exec($));
const BellaDonna = Object.keys(eval(fileTimeStamp + 'fileTimeStamp'));

const localBase = new URL('magica/', import.meta.url);

await Promise.all([...new Set(BellaDonna.map($ =>
  $.split('/').slice(0, -1).join('/')
))].map($ =>
  mkdir(new URL($, localBase), { recursive: true })
));

const etagsFile = new URL('etags.json', import.meta.url);
const etags = JSON.parse(await readFile(etagsFile));
await Promise.all(BellaDonna.map(async ($, _) => {
  _ = etags[$];
  const response = await fetch(new URL($, BELLADONNA_BASE), { headers: new Headers({ 'If-None-Match': _ }) });
  if (response.ok) {
    _ = response.headers.get('ETag');
    await response.text().then(_ => writeFile(new URL($, localBase), beautify[$.split('.').at(-1)](_, ㅇ)));
  }
  return [$, _];
})).then(_ => writeFile(etagsFile, JSON.stringify(Object.fromEntries(_), null, 1)));

await Promise.all(Object.entries(ㅎ).map(([$, [_]]) => writeFile(_, response.headers.get($))));
