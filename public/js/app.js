const name = getQueryVariable('name') || 'Anonymous';
const room = getQueryVariable('room');
const socket = io();

console.log(name + 'wants to join ' + room);

jQuery('.room-title').text(room);

socket.on('connect', function () {
    console.log('Connected to socket.io server!');

    socket.emit('joinRoom', {
        name: name,
        room: room
    });
});

socket.on('message', function (message) {
    // console.log('New message');
    // console.log(message.text);
    const timestampMoment = moment.utc(message.timestamp);
    $message = jQuery(".messages");

    $message.append('<p><strong>' + message.name + ' ' + timestampMoment.local().format('h:mma') +'</strong></p>')
    $message.append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
const $form = jQuery('#message-form');

$form.on('submit', function (event) {
    event.preventDefault();
    socket.emit('message', {
        name: name,
        text: $form.find('input[name=message]').val()
    });
    // either of the below will work
    $form.find('input[name=message]').val(' ');
    // $form.trigger("reset");
});