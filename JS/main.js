var $LoadedCards = 0;

// Set Add Card Event
$('.productCardAdd').on("click", function (event) {
    let target = $(event.target);
    let parent = target.parent().parent();
    const html = `<div class="productCard card col col-12 col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4" id="card${$LoadedCards}" style="background-color: ${$getRandomColor()};"></div>`;
    parent.append(html);
    window.$ActiveCard = $(html).attr('id');
    $('#plPopupModal').modal({backdrop: 'static', keyboard: false});
    $('#plPopupModal').modal('toggle');
    $('#plPopupModal #plModalTitle').text('Aanmaken card');
    $('#plPopupModal .modal-body').html(`
    <div class="row">
        <div class="col-6">
            <label for="Name">Naam:</label><br/>
            <input type="text" id="plPopupName" name="Name"class="w-100"><br/>
            <label for="Pomp">Pomp:</label><br/> 
            <input type="number" id="plPopupPomp" name="Pomp" class="w-100 pumpName"><br/>
            <label for="Duration">Duration:</label><br/>
            <input type="number" id="plPopupDuration" name="Duration" class="w-100"><br/>
        </div>
        <div class="col-6 .ms-auto">
            <label for="Repeat">Herhaling:</label><br/>
            <input type="number" id="plPopupRepeat" name="Repeat" class="w-100"><br/>
            <label for="Description">Omschrijving:</label><br/>
            <input type="text" maxlength="15" id="plPopupDescription" name="Description" class="w-100">
        </div>
    </div>
    `);

    $setPopup();
    $LoadedCards = $LoadedCards + 1;
});



// Close modal
$('.closeModal').each(function () {
    $(this).on("click", function () {
        $ChangeCardText($ActiveCard);
        $('#plPopupModal').modal('toggle'); 
    });
});

$('.removeCard').on('click', function(){
    $(`#${$ActiveCard}`).remove();
    $('#plPopupModal').modal('toggle'); 
});

// Dirty way to save the modal and close it
$('#saveModal').each(function () {
    $(this).on("click", function () {
        $ChangeCardText($ActiveCard);
    });
});

// Change card text
$ChangeCardText = (id) => {
    var card = $(`#${id}`);
    card.addClass('editMode');

    val = [];
    $('#plPopupModal .modal-body').children().children().children().each(function () {
        if ($(this).is("input[type=text]") || $(this).is("input[type=number]")) {
            val.push(this.value);
        }
    });

    var name = val[0] == '' ? 'Naamloos' : val[0],
        pomp =  val[1] == '' ? 0 : val[1],
        duration =  val[2] == '' ? 0 : val[2],
        repeat =  val[3] == '' ? 0 : val[3],
        description =  val[4] == '' ? 'Geen beschrijving' : val[4];
        
    var arr;
        try{arr = val[0].split('Naam:');
        name = arr[1].split(' ')[1];} catch(error){};
        try{arr = val[1].split('Pomp:');
        pomp = arr[1].split(' ')[1];} catch(error){};
        try{arr = val[2].split('Duratie:');
        duration = arr[1].split(' ')[1];} catch(error){};
        try{arr = val[3].split('Herhaling:');
        repeat = arr[1].split(' ')[1];} catch(error){};
        try{arr = val[4].split('Beschrijving:');
        description = arr[1].split(' ')[1];} catch(error){};           

    card.html(`<h3 style="text-align:center;">Naam: ${name}</h3><br/><p class="pumpName">Pomp: ${pomp}</p><br/><p>Duratie: ${duration}</p><br/><p>Herhaling: ${repeat}</p><br/><p>Beschrijving: ${description}</p>`);
    
    card.removeClass('editMode');

    $('#plPopupModal').modal('toggle');
}

$UpdateModal = (id) => {
    // Get data of selected card
    var card = $(`#${id}`);
    var val = [];

    $(card).children().each(function () {
        if ($(this).is("p") || $(this).is("h3")) {
            val.push($(this).text());
        }
    });

    var counter = 0;
    $('#plPopupModal .modal-body').children().children().children().each(function () {
        if ($(this).is("input[type=text]") || $(this).is("h3") ||  $(this).is("input[type=number]")) {
            try{
                if(val[counter].includes('Pomp: ')){
                val[counter] = val[counter].split('Pomp: ')[1];
                
            }
            } catch(error){};
            try{
                if(val[counter].includes('Duratie: ')){
                val[counter] = val[counter].split('Duratie: ')[1];
            }
            } catch(error){};
            try{
                if(val[counter].includes('Herhaling: ')){
                val[counter] = val[counter].split('Herhaling: ')[1];
            }
            } catch(error){};

            this.value = val[counter];
            counter = counter + 1;
        }
    });
}

// Onclick, change content of clicked card
$setPopup = () => {
    $('.productCard').each(function () {
        $(this).on("click", function () {
            window.$ActiveCard = $(this).attr('id');
            $UpdateModal($(this).attr('id'));
            $('#plPopupModal').modal('toggle');
            $('#plPopupModal #plModalTitle').text('Wijzigen card');
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
                backgroundColor: $getRandomColor()
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