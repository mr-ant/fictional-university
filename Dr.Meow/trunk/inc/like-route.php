<?php

add_action('rest_api_init', 'universityLikeRoutes');

function universityLikeRoutes()
{
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => WP_REST_SERVER::CREATABLE,
        'callback' => 'createLike'
    ));
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => WP_REST_SERVER::DELETABLE,
        'callback' => 'deleteLike'
    ));
}

function createLike()
{
    return "Thanks for create like...";
}

function deleteLike()
{
    return "Thanks for delete like...";
}
