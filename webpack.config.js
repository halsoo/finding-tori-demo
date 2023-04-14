const path = require('path')
const HTMLTemplatePlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, './src/index.jsx'),
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js'
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, './public')
        },
        compress: true,
        port: 9000,
        historyApiFallback: true,
        client: {
            reconnect: 2
        }
    },

    resolve: {
        extensions: ['.*', '.js', '.jsx']
    },
    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, './src'),
                ],
                use: {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-env",
                            ["@babel/preset-react", {"runtime": "automatic"}]
                        ],
                        "plugins": [
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", 'postcss-loader']
            },
            {
                test: /\.(pdf|jpg|png|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader'
                    },
                ]
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader"
            }
        ]
    },

    plugins: [
        new HTMLTemplatePlugin({
            template: path.join(__dirname, 'public/index.html'),
            filename: 'index.html'
        }),
    ]
}