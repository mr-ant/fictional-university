import $ from 'jquery';

class Search {
    constructor() {
        // 构造函数。
        this.addSearchHTML();
        this.resultsDiv = $("#search-overlay__results");
        this.openButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlay = $(".search-overlay");
        this.searchField = $("#search-term");
        this.events();
        this.isOvenlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.typingTimer;
    }

    // Event Function
    events() {
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

    // Methods

    typingLogic() {
        if (this.searchField.val() != this.previousValue) {
            clearTimeout(this.typingTimer);

            if (this.searchField.val()) {
                if (!this.isSpinnerVisible) {
                    this.resultsDiv.html('<div class="spinner-loader"></div>');
                    this.isSpinnerVisible = true;
                }
                this.typingTimer = setTimeout(this.getResults.bind(this), 500);
            } else {
                this.resultsDiv.html(' ');
                this.isSpinnerVisible = false;
            }

        }

        this.previousValue = this.searchField.val();
    }

    getResults() {
        $.getJSON(meowData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val(), posts => {
            this.resultsDiv.html(`
                <h2 class="search-overlay__section-title">General Infomation</h2>
                ${posts.length ? '<ul class="link-list min-list">' : '<p>No general infomation match that search.</p>'}
                    ${posts.map(item => `<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
                ${posts.length ? '</ul>' : ' '}
            `);
            this.isSpinnerVisible = false;
        });
    }

    keyPressDispatcher(e) {
        if (e.keyCode == 83 && !this.isOvenlayOpen && !$("input, textarea").is(':focus')) {
            this.openOverlay();
        }

        if (e.keyCode == 27 && this.isOvenlayOpen && !$("input, textarea").is(':focus')) {
            this.closeOverlay();
        }
    }

    openOverlay() {
        this.searchOverlay.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");
        this.searchField.val('');
        setTimeout(() => this.searchField.focus(), 301);
        console.log("our open method just ran!");
        this.isOvenlayOpen = true;
    }

    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        console.log("our close method just ran!");
        this.isOvenlayOpen = false;
    }

    addSearchHTML() {
        $("body").append(`
        <div class="search-overlay">
            <div class="search-overlay__top">
                <div class="container">
                    <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                    <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
                    <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                </div>
            </div>
        
            <div class="container">
                <div id="search-overlay__results">
                </div>
            </div>
        </div>
        `);
    }


}


export default Search;