module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-preset-env')({
            stage: 1, features: {
                'focus-within-pseudo-class': false
            }
        }),
        require('autoprefixer'),
    ],
}