    google.load("visualization", "1", {
      packages: ["corechart"]
    });
    google.load('visualization', '1', {
      packages: ['table']
    });

    $(function(argument) {
      console.log(google)

      google.setOnLoadCallback(drawLineChart); //呼叫畫圖函數

      function drawLineChart() { //Line Chart

        //應該就是把這個 Month 和數量丟進去就好  ARRAY TABLE
        var data = google.visualization.arrayToDataTable([
          ['Month', 'Amount'],
          ['一月', 1000],
          ['二月', 1170],
          ['三月', 660],
          ['四月', 1030]
        ]);

        var options = {
          title: 'Active user MAU'
        };

        var chart = new google.visualization.LineChart(document.getElementById('Auaipm'));
        chart.draw(data, options);
      }


      google.setOnLoadCallback(drawbarChart); //呼叫畫圖函數


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