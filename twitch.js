var users = ["arbitrarywei", "asiagodtonegg3be0", "yeexuan3608", "esl_sc2", "wayne379", "esl_csgo", "dimethylhexane", "ccw1210"];

$(document).ready(function () {
  function twitchData(users) {
    users.forEach(function (element) {
      $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.twitch.tv/kraken/streams/" + element,
        headers: {
          'Client-ID': 'lp9e3tkgczk065ri4188a6nwn8269a'
        },
        success: function (data) {
          if (data.stream !== null) {
            online(data, element);
          } else {
            offline(data, element);
          }
        }
      });
    });
  }

  function online(data, user) {
    $("#display_Online").append(
      '<div class="col text-center  font-weight-bold pb-5">' +
      '<a href="' + data.stream.channel["url"] + '">' +
      '<img class="round img-responsive" src="' + data.stream.channel["logo"] + '" >' +
      '<h1 class="pt-5">' + data.stream.channel["display_name"] + '</h1>' + '</a>' +
      '<h4> ' + data.stream["game"] + '</h4>' +
      '<p>' + data.stream["viewers"] + " viewers" + '</p>' +
      '</div>'
    );
  }

  function offline(data, user) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: "https://api.twitch.tv/kraken/channels/" + user,
      headers: {
        'Client-ID': 'lp9e3tkgczk065ri4188a6nwn8269a'
      },
      success: function (data, user) {
        $("#display_Offline").append(
          '<div class="col text-center ">' +
          '<img class="round img-responsive" src="' + data.logo + '" >' +
          '<h3>' + data.display_name + '</h3>' +
          '</div>'
        );
      }
    });
  }
  twitchData(users);
});