// The following is the supplementary javascript for the uploader.
// It should placed on the same page the upload form code is, as the javascript
// fetches the information to help fill in the missing information for the uploader,
// such as YOUR_AWS_ACCESS_KEY and stuff. You'll probably put it between a script tag:
// <script type="text/javascript"> </script>
function info(s) {
   		 $("#info").text(s);
}
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function fetchSignature() {
    var url = 'http://labs.echonest.com/Uploader/policy?callback=?'
    $.getJSON(url, {}, function(data) {
        policy = data.policy;
        signature = data.signature;
        $('#f-policy').val(data.policy);
        $('#f-signature').val(data.signature);
        $('#f-key').val(data.key);
    });
}
function fetchQinfo() {
    var url = 'http://labs.echonest.com/Uploader/qinfo?callback=?'
    $.getJSON(url, {}, function(data) {
        info("Estimated analysis time: " + Math.floor(data.estimated_wait * 1.2) + " seconds.");
    });
}
function randomName() {
    return new Date().getTime() + '-' + Math.floor(Math.random() * 100000000)
}

function fixFileName(name) {
    name = name.replace(/c:\\fakepath\\/i, '');
    name = name.replace(/[^A-Z0-9.\-]+/gi, ' ');
    return 'audio2/' + new Date().getTime() + '/' + name;
}
function init() {
    $("#f-filename").attr('value', 'audio2/' + randomName() + '.mp3');

    $("#file").change( 
        function() {
            var filename = $("#file").val();
            if (endsWith(filename.toLowerCase(), ".mp3")) {
                $("#f-filename").attr('value', fixFileName(filename));
                $("#upload").removeAttr('disabled');
            } else {
                alert('Sorry, this app only supports MP3s');
                $("#upload").attr('disabled', 'disabled');
            }
        }
    );
    fetchSignature();
    fetchQinfo();
}
window.onload = init;
