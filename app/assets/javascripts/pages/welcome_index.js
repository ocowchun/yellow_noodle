//= require chartjs
//= require highcharts

google.load("visualization", "1", {
  packages: ["corechart"]
});
google.load('visualization', '1', {
  packages: ['table']
});

$(function(argument) {
  $selectUserAction = $('#selectUserAction'), $btnActionByMonth = $('#btnActionByMonth');

  $.get('user_log_facts/activate_user_per_month').done(function(result) {
    drawActivateUserPerMonth(result.activate_user_per_month);
  });


  $.get('user_log_facts/signup_channel').done(function(result) {
    drawSignupChannel(result.signup_channel);
  });

  showActionByMonth("post");

  $selectUserAction.on("change", function(e) {
    var selectedAction = this.value;
    console.log(selectedAction)
    showActionByMonth(selectedAction);
    changeActionByMonthURL(selectedAction);
  });

  function showActionByMonth(action) {
    console.log(action);
    $.get('user_log_facts/action_by_month', {
      user_action: action
    }).done(function(result) {
      drawActionByMonth(result.action_by_month);
    });
  }

  function changeActionByMonthURL(action) {
    var url = "/user_log_facts/action_by_month.json?user_action=" + action;
    $btnActionByMonth.attr("href", url)

  }

  function drawActivateUserPerMonth(mauInfo) {
    console.log("activate_user_per_month");
    var labels = [],
      amounts = [];
    for (var i = 0, max = mauInfo.data.length; i < max; i++) {
      var mau = mauInfo.data[i];
      labels.push(mau.date);
      amounts.push(mau.amount);
    }
    $('#containerMAU').highcharts({
      chart: {
        type: 'area'
      },
      title: {
        text: 'Area chart with Activate User Per Month'
      },
      xAxis: {
        categories: labels
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'MAU',
        data: amounts
      }]
    });

  }

  function drawActionByMonth(actionDatas) {
    var labels = [],
      amounts = [];
    user_count = [];
    for (var i = 0, max = actionDatas.length; i < max; i++) {
      var actionData = actionDatas[i];
      labels.push(actionData.date);
      amounts.push(actionData.action_amount);
      user_count.push(actionData.user_count)
    }
    $('#containerAPM').highcharts({
      chart: {
        type: 'area'
      },
      title: {
        text: 'Area chart with Action By Month'
      },
      xAxis: {
        categories: labels
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'action amounts',
        data: amounts
      }, {
        name: 'user count',
        data: user_count
      }]
    });
  }

  function drawSignupChannel(signupChannel) {
    console.log(signupChannel)

    var signupChannelData = [];
    for (var i = 0, max = signupChannel.length; i < max; i++) {
      var channelData = signupChannel[i];
      var platformName = channelData.platform_name,
        amount = channelData.amount;

      signupChannelData.push([platformName, amount]);
    }
    // Build the chart
    $('#containerRefer').highcharts({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      title: {
        text: 'Signup Channel'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        type: 'pie',
        name: 'User Amount',
        data: signupChannelData
      }]
    });
  }



});