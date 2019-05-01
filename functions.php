<?php

function meow_files(){
    wp_enqueue_script( 'main-taotaomeow-js', get_theme_file_uri('/js/scripts-bundled.js'), NULL, microtime(), true );
    wp_enqueue_style( 'custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i' );
    wp_enqueue_style( 'font-awesome', '//cdn.bootcss.com/font-awesome/5.8.1/css/all.css' );
    wp_enqueue_style( 'taotaomeow', get_stylesheet_uri(),NULL,microtime());
}

add_action( 'wp_enqueue_scripts', 'meow_files' );

function taotaomeow_features() {
    add_theme_support( 'title-tag' );
}

add_action( 'after_setup_theme', 'taotaomeow_features' );