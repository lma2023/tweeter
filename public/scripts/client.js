/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escapeString = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};

const renderTweets = (data) => {
    $('#tweet-text').val('');
    $('#tweet-container').empty();
    for (let tweet of data) {
        // calls createTweetElement for each tweet
        const $tweet = createTweetElement(tweet);
        // takes return value and appends it to the tweets container
        $('#tweet-container').prepend($tweet);
    }
};
const createTweetElement = (data) => {
    // const {user, content, created_at} = data;
    const tweetHTML = $(`
        <article class="tweet">
        <div class="header">
          <div class="user">
            <img src="${data.user.avatars}"></img>
            <span>${data.user.name}</span>
          </div>
          <span class="tag">${data.user.handle}</span>
        </div>
        <div class="body">
          <span>${escapeString(data.content.text)}</span>
        </div>
        <div class="footer">
        <span>${timeago.format(data.created_at)}</span>
          <span><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
        </div>
      </article>
      `)
    return tweetHTML;
};

function loadTweets() {
    $.ajax("/tweets", {
        method: "GET"
    })
        .then(function (tweets) {
            renderTweets(tweets);
        });
}
//   New tweet submission
$(document).ready(function () {
    $("#post-tweet").submit(function (event) {
        event.preventDefault();
        // console.log("New tweet")
        $("#error-message").slideUp();

        const value = $(this).find("#tweet-text").val();

        // -- Displaying validation errors with jQuery
        if ($("#tweet-text").val().trim().length === 0) {
            $("#err-msg").text("Empty field.");
            $(".error").slideDown();
            return;
        }
        if ($("#tweet-text").val().length > 140) {
            $("#err-msg").text("Message exceding 140 characters.");
            $(".error").slideDown();
            return;
        }

        $(".error").hide();
    
            $.ajax({
        url: "/tweets",
        method: "POST",
        data: $("#post-tweet").serialize(),
        success: () => {
            loadTweets(), $(".counter").val("140")
        }
    });
});
loadTweets();
});





