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

        $.getJSON(meowData.root_url + '/wp-json/university/v1/search?term=' + this.searchField.val(), (results) => {
            this.resultsDiv.html(`
            <div class="row">
                <div class="one-third">
                    <h2 class="search-overlay__section-title">General Infomation</h2>
                    ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No general infomation match that search.</p>'}
                        ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a>${item.postType == 'post' ? ` by ${item.authorName}` : ''}</li>`).join('')}
                    ${results.generalInfo.length ? '</ul>' : ' '}
                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Programs</h2>
                    ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search.<a href="${meowData.root_url}/programs">View all programs</a></p>`}
                        ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
                    ${results.programs.length ? '</ul>' : ' '}

                    <h2 class="search-overlay__section-title">Professors</h2>
                    ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search.</p>`}
                        ${results.professors.map(item => `
                        <li class="professor-card__list-item">
                            <a href="${item.permalink}" class="professor-card">
                                <img src="${item.image}" class="professor-card__image">
                                <span class="professor-card__name">${item.title}</span>
                            </a>
                        </li>
                        `).join('')}
                    ${results.professors.length ? '</ul>' : ' '}

                </div>
                <div class="one-third">
                    <h2 class="search-overlay__section-title">Campuses</h2>
                    ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search.<a href="${meowData.root_url}/campuses">View all campuses</a></p>`}
                        ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a></li>`).join('')}
                    ${results.campuses.length ? '</ul>' : ' '}

                    <h2 class="search-overlay__section-title">Events</h2>
                    ${results.events.length ? '' : `<p>No events match that search.<a href="${meowData.root_url}/events">View all events</a></p>`}
                        ${results.events.map(item => `
                            <div class="event-summary">
                                <a class="event-summary__date t-center" href="<?php the_permalink(); ?>">
                                    <span class="event-summary__month">${item.mouth}</span>
                                    <span class="event-summary__day">${item.day}</span>
                                </a>
                                <div class="event-summary__content">
                                    <h5 class="event-summary__title headline headline--tiny"><a href="${item.permalink}">${item.title}</a></h5>
                                    <p>${item.description}<a href="${item.permalink}" class="nu gray">Learn more</a></p>
                                </div>
                            </div>
                        `).join('')}

                </div>
            </div>
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
        return false
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