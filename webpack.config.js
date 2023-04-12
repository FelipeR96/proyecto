//sirve para identificar la ruta de donde se encuentra este archivo
const path = require('path');
//Me permite trabajar con documentos HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
//Nos sirve para extraer codigo css, minificarlo y optimizarlo. Ademas lo agrega como parte del head
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Nos permite copiar archivos de una ruta a otra
const CopyWebpackPligin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
    // operadores en javascript, que diferencia existe entre el operador == y el ===
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            index: './src/index.js',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test:  /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src/assets/js'),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        },
        Plugins: [],
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            open: true, 
            hot: true,
            watchFiles: [
                'src/**/*'
            ]
        }
    };
}
