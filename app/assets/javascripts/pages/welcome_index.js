//= require chartjs

google.load("visualization", "1", {
  packages: ["corechart"]
});
google.load('visualization', '1', {
  packages: ['table']
});

$(function(argument) {


  $.get('user_log_facts/activate_user_per_month').done(function(result) {
    draw_activate_user_per_month(result.activate_user_per_month);
  });

showActionByMonth("post");
  function showActionByMonth(action) {

    $.get('user_log_facts/action_by_month',{user_action:action}).done(function(result) {
      drawActionByMonth(result.action_by_month);
    });
  }



  function draw_activate_user_per_month(mauInfo) {
    var labels = [],
      amounts = [];
    for (var i = 0, max = mauInfo.data.length; i < max; i++) {
      var mau = mauInfo.data[i];
      labels.push(mau.date);
      amounts.push(mau.amount);
    }

    var data = {
        labels: labels,
        datasets: [

          {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: amounts
          }
        ]
      },
      options = {};
    var ctx = document.getElementById("Auaipm").getContext("2d");
    var myNewChart = new Chart(ctx).Line(data, options);
  }

 function drawActionByMonth(actionDatas) {
    var labels = [],
      amounts = [];
      user_count=[];
    for (var i = 0, max = actionDatas.length; i < max; i++) {
      var actionData = actionDatas[i];
      labels.push(actionData.date);
      amounts.push(actionData.action_amount);
      user_count.push(actionData.user_count)
    }

    var data = {
        labels: labels,
        datasets: [

          {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: amounts
          },
    {
      fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,1)",
      pointColor : "rgba(151,187,205,1)",
      pointStrokeColor : "#fff",
      data : user_count
    }
        ]
      },
      options = {};
    var ctx = document.getElementById("Aauaa").getContext("2d");
    var myNewChart = new Chart(ctx).Line(data, options);
  }


  function drawbarChart() { //Bar Chart

    //應該就是把這個 動作名稱 和數量丟進去就好  ARRAY TABLE
    var data = google.visualization.arrayToDataTable([
      ['Action', 'Amount'],
      ['Login', 1000],
      ['Post', 1170],
      ['Tag', 660],
      ['Comment', 1030]
    ]);

    var options = {
      title: 'Active user actions',
      hAxis: {
        title: 'Action',
        titleTextStyle: {
          color: 'red'
        }
      }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('Aauaa'));
    chart.draw(data, options);
  }



  google.load('visualization', '1', {
    packages: ['table']
  });
  google.setOnLoadCallback(drawLandingTable);


  function drawLandingTable() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Landing Url');
    data.addColumn('number', 'amount');

    //應該就是把這個 名稱 和數量丟進去就好  data
    data.addRows([
      ['Facebook', 10000],
      ['Google', 8000],
      ['Pocket.com', 12500],
      ['Ipeen.com.tw', 7000]
    ]);

    var table = new google.visualization.Table(document.getElementById('Aaulanding'));
    table.draw(data, {
      showRowNumber: true
    });
  }



  google.setOnLoadCallback(drawPortfolioTable);


  function drawPortfolioTable() {

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Portfolio');
    data.addColumn('number', 'amount');


    //應該就是把這個 名稱 和數量丟進去就好  data
    data.addRows([
      ['Gender-boy', {
        v: 60,
        f: '60%'
      }],
      ['Gender-girl', {
        v: 40,
        f: '40%'
      }],
      ['Age 12-18', {
        v: 20,
        f: '20%'
      }],
      ['Age 18-24', {
        v: 40,
        f: '40%'
      }]
    ]);

    var table = new google.visualization.Table(document.getElementById('Aaup'));
    table.draw(data, {
      showRowNumber: true
    });
  }

});