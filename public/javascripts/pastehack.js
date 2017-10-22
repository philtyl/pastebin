/**
 * author: webprogrammer
 * https://stackoverflow.com/questions/12027137/javascript-trick-for-paste-as-plain-text-in-execcommand
 */

$('div[contenteditable=true]').bind('paste', function(e) {
    var text = '';
    var that = $(this);

    if (e.clipboardData)
        text = e.clipboardData.getData('text/plain');
    else if (window.clipboardData)
        text = window.clipboardData.getData('Text');
    else if (e.originalEvent.clipboardData)
        text = $('<div></div>').text(e.originalEvent.clipboardData.getData('text'));

    if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, $(text).html());
        return false;
    }
    else { // IE > 7
        that.find('*').each(function () {
            $(this).addClass('within');
        });

        setTimeout(function () {
            // nochmal alle durchlaufen
            that.find('*').each(function () {
                // wenn das element keine klasse 'within' hat, dann unwrap
                // http://api.jquery.com/unwrap/
                $(this).not('.within').contents().unwrap();
            });
        }, 1);
    }
});

function preparePaste() {
    document.getElementById("paste").value = document.getElementById("pastetextarea").innerText;
}