
$(document).on('click', '#overview-card-001__expander-link', function() {
    event.preventDefault();
    $( "#overview-card-001__footer" ).slideToggle( "slow", function() {
    	($("#overview-card-001__expander-link").text() === "more") ? $("#overview-card-001__expander-link").text("less") : $("#overview-card-001__expander-link").text("more");

    // Animation complete.
  });
});

$(document).on('click', '#overview-card-002__expander-link', function() {
    event.preventDefault();
    $( "#overview-card-002__footer" ).slideToggle( "slow", function() {
    	($("#overview-card-002__expander-link").text() === "more") ? $("#overview-card-002__expander-link").text("less") : $("#overview-card-002__expander-link").text("more");
    // Animation complete.
  });
});

$(document).on('click', '#overview-card-003__expander-link', function() {
    event.preventDefault();
    $( "#overview-card-003__footer" ).slideToggle( "slow", function() {
    	($("#overview-card-003__expander-link").text() === "more") ? $("#overview-card-003__expander-link").text("less") : $("#overview-card-003__expander-link").text("more");
    // Animation complete.
  });
});



