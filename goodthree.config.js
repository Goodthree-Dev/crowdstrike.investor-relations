module.exports = {

    // --- Project variables ---

    textdomain: 'crowdstrike-ir',
    siteURL: 'http://crowdstrike-ir.local',
    themedir: './assets/',

    enable: {
        purgecss: true,
    },

    // Purgecss safelist https://purgecss.com/safelisting.html
    cssSafelist: [
        /^carousel-item.*/,     // Bootstrap Carousel Animation
        /collapsing/,           // Bootstrap Navbar Animation
        /show/,                 // Bootstrap Dropdown
    ],

    // gulp-fa-minify whitelisted icons https://github.com/FA-Minify/gulp-fa-minify
    // Light (Pro), Regular (Pro), Solid (Free), Brands (Free)
    faIconSafelist: {
        fal: [],
        far: [],
        fas: [
            'angle-up',
            'search',
        ],
        fab: [
            'facebook-f',
            'linkedin-in',
            'instagram',
            'twitter',
        ]
    },

    // --- Path variables ---

    css: {
        src: './assets/scss/**/*.scss',
        dist: './dist/css/',
        watch: './assets/scss/**/*.scss',
        content: [
            './assets/*.php',
            './assets/js/**/*.js',
        ]
    },

    js: {
        src: './assets/js/*.js',
        dist: './dist/js/',
        watch: './assets/js/**/*.js',
    },

    php: {
        watch: [
            './assets/*.php',
            './assets/**/*.php',
            '!node_modules/**',
        ]
    },

    img: {
        src: './assets/images/**/*.{png,jpg,gif,svg}',
        dist: './dist/images/',
        watch: './assets/images/**/*.{png,jpg,gif,svg}',
    },

    fonts: {
        src: {
            ttf: './assets/fonts/**/*.{otf,ttf}',
            woff: './assets/fonts/**/*.{woff,woff2}',
        },
        dist: './dist/fonts/',
        watch: './assets/fonts/**/*',
    },

    icons: {
        src: './node_modules/@fortawesome/fontawesome-free/js/all.js',
    },

    i18n: {
        dist: './languages/',
        functions: [
            '__:1,2d',
            '_e:1,2d',
            '_x:1,2c,3d',
            'esc_html__:1,2d',
            'esc_html_e:1,2d',
            'esc_html_x:1,2c,3d',
            'esc_attr__:1,2d',
            'esc_attr_e:1,2d',
            'esc_attr_x:1,2c,3d',
            '_ex:1,2c,3d',
            '_n:1,2,4d',
            '_nx:1,2,4c,5d',
            '_n_noop:1,2,3d',
            '_nx_noop:1,2,3c,4d'
        ],
    },

}
