let mix = require('laravel-mix');

const css = (file) => `<link rel="stylesheet" type="text/css" href="/${file}"/>`
const js = (file) => `<script defer src="/${file}"></script>`

mix.options({
    processCssUrls: false,
    cssNano: {
        discardComments: {
            removeAll: true,
        },
    },
    manifest: false,
    terser: {
        extractComments: false,
        terserOptions: {
            compress: {
                drop_console: true
            },
            output: {
                comments: false,
            },
        }
    }
});

mix.js('assets/src/app.js', 'assets/dist');
mix.sass('assets/src/style.scss', 'assets/dist');

mix.browserSync(
    {
        watchTask: true,
        proxy: {
            target: process.env.URL,
        },
        serveStatic: ["./assets"],
        files: ['assets/dist/app.js', 'assets/dist/style.css'],
        snippetOptions: {
            rule: {
                match: /<\/head>/i,
                fn: function (snippet, match) {
                    const items = [
                        css('dist/style.css'),
                        js('dist/app.js'),
                        snippet,
                        match
                    ];

                    return items.join("\n");
                }
            }
        }
    }
);
