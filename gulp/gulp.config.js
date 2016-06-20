module.exports = {

    src_dir : './src',
    deploy_dir : './static',
    inject_ignore_dir : 'static',

    app_files : {
        js: ['./src/app/**/*.js',
             './src/test/**.*.js'],

        tpl_src : ['./static/vendor/**/*.js',
                   './static/app/**/*.js',
                   './static/assets/css/**/*.css']
    }
}
