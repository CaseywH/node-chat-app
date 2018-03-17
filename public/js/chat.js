var socket = io();

function scroolToBottom() {
  // selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children("li:last-child");
  // heights
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on("connect", () => {
  var params = jQuery.deparam(window.location.search);

  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

socket.on("newMessage", message => {
  var formattedDate = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedDate
  });

  jQuery("#messages").append(html);
  scroolToBottom();
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("newlocationMessage", message => {
  var formattedDate = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedDate
  });

  jQuery("#messages").append(html);
  scroolToBottom();
});

jQuery("#message-form").on("submit", e => {
  e.preventDefault();

  var messageTextBox = jQuery("[name=message]");

  socket.emit(
    "createMessage",{
      text: messageTextBox.val()
    }, () => {
      messageTextBox.val("");
    }
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", e => {
  if (!navigator.geolocation) {
    return alert("Geolocation not suppported by your browser.");
  }
  locationButton.attr("disabled", "disabled").text("Sending Location...");

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr("disabled").text("Send Location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      locationButton.removeAttr("disabled").text("Send Location");
      alert("Unable to fetch location.");
    }
  );
});
