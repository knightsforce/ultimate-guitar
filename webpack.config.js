var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
    filename: "./stylesheets/[name].css",
});

module.exports = {
	devtool: 'source-map',
	context: path.join(__dirname, 'frontend'),
	entry: {
		bundle: "./bundle",
		babelPolyfill: 'babel-polyfill',
		/*common: "./common",*/
		style: './stylesheets/style.scss'
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].js',
		publicPath: '../', //В production можно /public/ для обращеня к серверу
		//library: '[name]'
	},
	
	resolve: {
		modules: [path.resolve(__dirname, "node_modules"), ],
	},
	
	resolveLoader: {
         modules: ["web_loaders", "web_modules", "node_loaders", "node_modules"],
    },

	module: {
	  rules: [
	    {
	    	test: /\.jsx?$/,
	    	//exclude: [path.resolve(__dirname, "node_modules")],
	    	//include: [path.resolve(__dirname, "./frontend")],
	    	include: [path.resolve(__dirname, "./frontend")],
	    	loader: "babel-loader",
            options: {
                presets: [['es2015', {modules: false}], "es2016", "es2017", "react"],
                //plugins: ['transform-react-jsx'],
                plugins: ['transform-runtime'], 
            }
	    },
	    {
	    	/*use: [{
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }],
            fallback: "style-loader",*/
            //use: ["css-loader", "autoprefixer-loader", "sass-loader"],
            test: /\.scss$/,
            use: extractSass.extract({
                use: [
                {
                    loader: "css-loader"
                },
                /*{
                    loader: "resolve-url-loader",
                }, */
                {
                    loader: "sass-loader",


                    options: {
            			includePaths: [path.resolve(__dirname, "./")],
            			//sourceMap: true,
            		},
                }],
                // use style-loader in development
                fallback: "style-loader"
            }),
	    },
	    /*{
	    	test: /\.css$/,
	    	use: ExtractTextPlugin.extract(
	    		{
	    			fallback: "style-loader",
	    			use: ["css-loader","autoprefixer-loader?browsers=last 2 versions"]
	    		}),
			//loader: "style!css!autoprefixer?browsers=last 2 versions",
	    },
	    {
	    	test: /\.less$/,
	    	use: ExtractTextPlugin.extract(
	    		{
	    			fallback: "style-loader",
	    			use: ["css-loader","autoprefixer-loader?browsers=last 2 versions","less-loader"],
	    		}),
			//loader: "style!css!autoprefixer?browsers=last 2 versions!less",//resolve url по умолчанию
	    },*/
	    /*{
	    	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
			use: "url-loader?limit=1",
	    },*/
	    {
	    	test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
			use: "file-loader?name=[path][name].[ext]",
	    }
	  ]
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		/*new webpack.optimize.CommonsChunkPlugin({
			name: "common",
			filename: "common.js",
			minChunks: 2,
			//chunks: ["index"], из каких выносить, можно подключить второй для других
		}),*/
		extractSass,
	],
	watch: true,
}