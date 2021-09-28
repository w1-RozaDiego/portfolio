// Set Add Card Event
$('.productCardAdd').on("click", function (event) {
    let target = $(event.target);
    let parent = target.parent().parent();

    const html = `
                    <div class="productCard card col-4" style="background-color: ${$getRandomColor()};">
                        <!-- Content -->
                        <h5 class="card-title">Naam: <span id="Name"> </span> </h5>
                    </div>`;
    var newObj = parent.append(html);
    $setPopup();
    return newObj;
});

$setPopup = () => {
    $('.productCard').each(function () {
        $(this).on("click", function () {
            $('.productCard #Name').html(`Hier komt de informatie \n Nadat de gebruiker heeft geklikt op de card`);
        });
    });
};

$getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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