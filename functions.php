<?php

function meow_files()
{
    wp_enqueue_script('main-taotaomeow-js', get_theme_file_uri('/js/scripts-bundled.js'), null, microtime(), true);
    wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_enqueue_style('font-awesome', '//cdn.bootcss.com/font-awesome/5.8.1/css/all.css');
    wp_enqueue_style('taotaomeow', get_stylesheet_uri(), null, microtime());
}

add_action('wp_enqueue_scripts', 'meow_files');

function taotaomeow_features()
{
    register_nav_menu('headerMenuLocation', 'Header Menu Location');
    add_theme_support('title-tag');
}

add_action('after_setup_theme', 'taotaomeow_features');

// 自定义文章类型

function ttm_post_types()
{
    register_post_type('event', array(
        'supports' => array('title', 'editor', 'excerpt', 'custom-fields'),
        'rewrite' => array('slug' => 'events'),
        'has_archive' => true,
        'public' => true,
        'labels' => array(
            'name' => 'Events',
            'add_new_item' => 'Add New Event',
            'edit_item' => 'Edit Event',
            'all_items' => 'All Events',
            'singular_name' => 'Event'
        ),
        'menu_icon' => 'dashicons-calendar'
    ));
}

add_action('init', 'ttm_post_types');
