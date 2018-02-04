const socket = io();

socket.on('connect', function () {
    console.log('Connected to socket.io server!');
});

socket.on('message', function (message) {
    // const momentTimestamp = timestampMoment.local().format('h:mma');
    // console.log('New message');
    // console.log(message.text);
    const timestampMoment = moment.utc(message.timestamp);

    jQuery(".messages").append('<p>' + timestampMoment.local().format('h:mma') + ' ' + message.text + '</p>');
});

// Handles submitting of new message
const $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    socket.emit('message', {
        text: $form.find('input[name=message]').val()
    });
    // either of the below will work
    $form.find('input[name=message]').val(' ');
    // $form.trigger("reset");
});