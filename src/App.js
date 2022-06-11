import React, { useEffect, useState } from 'react';
import './style.css';
import { fs, vol } from 'memfs';

export default function App() {
  const json = {
    './README.md': '1',
    './public/index.html': 'html textContent',
    './myText.md': 'Hello world',
    './src/index.js': '2',
    './node_modules/debug/index.js': '3',
  };
  vol.fromJSON(json, '/myapp');

  let d = fs.readFileSync('/myapp/myText.md', 'utf8'); // 1
  let e = vol.readFileSync('/myapp/public/index.html', 'utf8'); // 2

  let keys = Object.keys(json);

  const items = keys.map(function (item, index) {
    return item.split('/').filter(function (item) {
      return item != '.';
    });
  });

  let test = items.map(function (item, index) {
    console.log('-----');
    return item.map(function (e, i) {
      if (e.includes('.')) {
        return (
          <div>
            {' '}
            <h5> {e} </h5>{' '}
          </div>
        );
      } else {
        return (
          <div className="dir" style={{ paddingLeft: i * 5 }}>
            {' '}
            {e}
            <div> </div>
          </div>
        );
      }
    });
  });

  console.log('end of item');

  return <div>{test}</div>;
}
