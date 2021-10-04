// Set Add Card Event
$('.productCardAdd').on("click", function (event) {
    let target = $(event.target);
    let parent = target.parent().parent();
    const html = `
    <div class="productCard card col-4" style="background-color: ${$getRandomColor()};">
        <!-- Content -->
    </div>`;
    parent.append(html);
    
    $('#plPopupModal').data('card', html);
    $('#plPopupModal').modal('toggle');
    $('#plPopupModal #plModalTitle').text('Aanmaken card');
    $('#plPopupModal .modal-body').html(`
        <label for="Name">Naam:</label><br/>
        <input type="text" id="plPopupName" name="Name" class="w-100"><br/>
        <label for="Pomp">Pomp:</label><br/>
        <input type="text" id="plPopupPomp" name="Pomp" class="w-100"><br/>
        <label for="Duration">Duration:</label><br/>
        <input type="text" id="plPopupDuration" name="Duration" class="w-100"><br/>
        <label for="Repeat">Herhaling:</label><br/>
        <input type="text" id="plPopupRepeat" name="Repeat" class="w-100"><br/>
        <label for="Description">Omschrijving:</label><br/>
        <input type="text" id="plPopupDescription" name="Description" class="w-100">
    `);
});

// Dirty way to close the modal
$('.closeModal').each(function () {
    $(this).on("click", function () {
        $('#plPopupModal').modal('toggle');
    });
});
// Dirty way to save the modal and close it
$('#saveModal').each(function () {
    $(this).on("click", function () {
        // Save data from modal and set on the card
        var card = $('#plPopupModal').data('card');
        val = [];
        $('#plPopupModal .modal-body').children().each(function () {
            if ($(this).is("input[type=text]")) {
                val.push(this.value);
            }
        });
        var name = val[0],
            pomp = val[1],
            duration = val[2],
            repeat = val[3],
            description = val[4];

        card.html(`
            <div class="container-fluid" style="text-align:center;">
                <h3 style="text-align:center;>${name}</h3>
            </div>
        `);
        card.on("click", function () {
            $(this).html(`
            <div class="container-fluid" style="text-align:center;">
                <h3 style="text-align:center;>${name}</h3><br/>
                <p>${pomp}</p><br/>
                <p>${duration}</p><br/>
                <p>${repeat}</p><br/>
                <p>${description}</p><br/>
            </div>
            `);
        });

        $('#plPopupModal').modal('toggle');
        // Save shit
    });
});



// Onclick, change content of clicked card
$setPopup = () => {
    $('.productCard').each(function () {
        $(this).on("click", function () {
            $('#plPopupModal').modal('toggle');
            $('#plPopupModal #plModalTitle').text('Wijzigen card');
            $('#plPopupModal .modal-body').text('Hier komt de tekst van de configuratie \n Dit is nu tijdelijk eventjes tekst maar dit wordt zo vertaald tot HTML.');
        });
    });
};

// Create random color
$getRandomColor = () => {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

// Create random color each 3 seconds
$dynamicallyChangeColors = () => {
    async function setColor() {
        $('.productCard').each(function () {
            $(this).css({
                'background-color': $getRandomColor
            });
        });
    };
    setInterval(setColor, 3000);
}

// Document ready
$(function () {
    // Declare API
    window.$API = new $InitialiseAPI();
    // Declare Cards
    window.$cards = {};
    // Intialise API call -- Check for content
    $API.Get();
});

// Initialise Class
class $InitialiseAPI {
    Post = () => {
        $.post("PYTHON URL", function (data) {
                // Succes
            })
            .done(function (data) {
                // After complete
            })
            .fail(function (error) {
                // If failed
            });
    };

    Get = () => {
        $.get("PYTHON URL", function (data) {
                // Succes
            })
            .done(function (data) {
                // After complete

            })
            .fail(function (error) {
                // If failed
            });
    };
};