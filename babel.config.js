module.exports = {
    presets: [
        '@vue/app'
    ],
    plugins: [
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-transform-modules-umd"
    ],
    sourceType: 'unambiguous'
}
