const { src, dest } = require('gulp');

function buildIcons() {
  return src('icons/**/*.{svg,png}')
    .pipe(dest('dist/icons/'));
}

exports['build:icons'] = buildIcons;
