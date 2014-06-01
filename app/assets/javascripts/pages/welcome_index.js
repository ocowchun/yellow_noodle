//= require chartjs
//= require highcharts
//= require underscore


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

  $.get('user_dims/distribute').done(function(result) {
    drawUserDistribute(result.user_distribute);
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

  function drawUserDistribute(userDistribute) {

    var male = [],
      maleAge = [],
      female = [],
      femaleAge = [],
      maleSum = 0,
      femaleSum = 0,
      femaleRatio, maleRatio;

    for (var i = 0, max = userDistribute.length; i < max; i++) {

      var distribute = userDistribute[i];

      var gender = distribute.gender,
        amount = distribute.amount,
        age = distribute.age;

      if (gender == "female") {
        femaleSum += amount;
        female.push(amount);
        femaleAge.push(age);
      } else {
        maleSum += amount;
        male.push(amount);
        maleAge.push(age);
      }
    }
    var total = (femaleSum + maleSum);
    maleRatio = maleSum / total * 100
    femaleRatio = femaleSum / total * 100
    female = _.map(female, function(f) {
      return f / total*100;
    });
    male = _.map(male, function(m) {
      return m / total*100;
    });

    var colors = Highcharts.getOptions().colors,
      categories = ['Male', 'Female'],
      name = 'Browser brands',
      data = [{
        y: maleRatio,
        color: colors[0],
        drilldown: {
          name: 'Male',
          categories: maleAge,
          data: male,
          color: colors[0]
        }
      }, {
        y: femaleRatio,
        color: colors[1],
        drilldown: {
          name: 'Female',
          categories: femaleAge,
          data: female,
          color: colors[1]
        }
      }];


    // Build the data arrays
    var browserData = [];
    var versionsData = [];
    for (var i = 0; i < data.length; i++) {

      // add browser data
      browserData.push({
        name: categories[i],
        y: data[i].y,
        color: data[i].color
      });

      // add version data
      for (var j = 0; j < data[i].drilldown.data.length; j++) {
        var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5;
        versionsData.push({
          name: data[i].drilldown.categories[j],
          y: data[i].drilldown.data[j],
          color: Highcharts.Color(data[i].color).brighten(brightness).get()
        });
      }
    }

    // Create the chart
    $('#containerPortfolio').highcharts({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Browser market share, April, 2011'
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }
      },
      plotOptions: {
        pie: {
          shadow: false,
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '%'
      },
      series: [{
        name: 'Browsers',
        data: browserData,
        size: '60%',
        dataLabels: {
          formatter: function() {
            return this.y > 5 ? this.point.name : null;
          },
          color: 'white',
          distance: -30
        }
      }, {
        name: 'Versions',
        data: versionsData,
        size: '80%',
        innerSize: '60%',
        dataLabels: {
          formatter: function() {
            // display only if larger than 1
            return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
          }
        }
      }]
    });



    //end
  }


});