$(document).ready(() => {

    $('#send').click(async () => {

        let emojis = $('#emojis').val();
        if(emojis && emojis.length > 3) {

            $('#errorMessage').html('');
    
            let res = await fetch(`/emojis?e=${emojis}`)
            let json = await res.json();
            if(json.status === 'success') 
                window.location.href = json.recommendedRedirect;
            else
                alert('Internal Server Error');

        } else {
            $('#errorMessage').html('Ooops ): Please type in at least three emojis');
        }
    
    });

})