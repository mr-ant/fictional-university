import $ from 'jquery';

class MyNotes {
    constructor() {
        this.events();
    }

    events() {
        $('.delete-note').on('click', this.deleteNote);
    }


    // Methods

    deleteNote(e) {
        var thisNote = $(e.target).parents("li")
        $.ajax({
            beforeSend: (xhr) => {
                xhr.setRequestHeader('X-WP-NONCE', meowData.nonce);
            },
            url: meowData.root_url + '/wp-json/wp/v2/note/' + thisNote.data('id'),
            type: 'DELETE',
            success: (response) => {
                console.log('Success');
                console.log(response);
            },
            error: (response) => {
                console.log('Error');
                console.log(response);
            },
        });
    }
}

export default MyNotes;