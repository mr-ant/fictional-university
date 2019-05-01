<?php

function meow_files(){
    wp_enqueue_style( 'taotaomeow', get_stylesheet_uri() );
}

add_action( 'wp_enqueue_scripts', 'meow_files' );