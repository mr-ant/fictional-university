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

function createLike($data)
{
    $professor = $data['professorID'];
    wp_insert_post(array(
        'post_type' => 'like',
        'post_status' => 'publish',
        'post_title' => 'php title test..',
        'meta_input' => array(
            'liked_professor_id' => $professor
        )
    ));
}

function deleteLike()
{
    return "Thanks for delete like...";
}
