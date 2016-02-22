// Draw the bar chart for expected delays
function draw_bar_chart() {
  var margin = 100,
      width = 1100 - margin,
      height = 550 - margin;

  var bar_gap = 10;

  var svg = d3.select('body')
              .append('div')
              .attr('id', 'bar_chart')
              .append('svg')
              .attr("width", width + margin)
              .attr("height", height + margin);

  // Initialize y axis, leave the domain undecided for now
  var y_scale = d3.scale.linear().range([height, margin]);

  // Add axis labels
  var y_label = 'Expected Delay (Minues)';

  svg.append('text')
     .attr('text-anchor', 'end')
     .attr('y', 50)
     .attr('x', -height / 2)
     .attr('transform', 'rotate(-90)')
     .text(y_label);

  // Only get the most recent two years
  var start_year = 2013;
  
  function agg_carrier(leaves) {

    var flights = d3.sum(leaves, function(d) {
      if (d.year >= start_year) {
        return d['arr_flights'];
      } else {
        return 0;
      }
    });

    var delay_time = d3.sum(leaves, function(d) {
      if (d.year >= start_year) {
        return d[' arr_delay'];
      } else {
        return 0;
      }
    });
    // Expected delay time is the total delay time averaged over the total number of flights
    var expected_delay_time = delay_time / flights;

    var carrier_name = leaves[0].carrier_name;

    var result = {
      'carrier_name' : carrier_name,
      'flights' : flights,
      'expected_delay_time' : expected_delay_time
    }
    
    return result;
  }
  var nested_data = [];
  function callback(data) {
    // Aggregation
    var nested_element = d3.nest()
                   .key(function(d) {
                    return d['carrier_name'];
                  })
                   .rollup(agg_carrier)
                   .entries(data); 
    nested_data.push(nested_element[0]); 
    // Only start plotting when I have have all the data
    if (nested_data.length === carriers.length) {
      var max_expected_delay = d3.max(nested_data, function(d) {
        return d.values.expected_delay_time;
      })
      // Add the y axis now that I know the maximum expected delay time
      y_scale.domain([0, max_expected_delay * 1.2]);
      var y_axis = d3.svg.axis()
                 .scale(y_scale)
                 .orient('left')
                 .ticks(6);                    

      svg.append('g')
         .attr('class', 'y axis')
         .attr('transform', 'translate(' + margin + ',0)')
         .call(y_axis);
      // Add the bars
      svg.append('g')
         .selectAll('rect')
         .data(nested_data.sort(function(a, b) {
          return a.values['expected_delay_time'] - b.values['expected_delay_time'];
         }), function(d) {
          return d.key;
         })
         .enter()
         .append('rect')
         .attr('class', 'bar')
         .attr('x', function(d, i) {
          return margin * 1.5 + width * 0.7 / nested_data.length * i;
         })
         .attr('y', function(d, i) {
          return y_scale(d.values['expected_delay_time']);
         })
         .attr('width', width * 0.7 / nested_data.length - bar_gap)
         .attr('height', function(d) {
          return height - y_scale(d.values['expected_delay_time']);
         })
         .attr('fill', function(d, i) {
          if (i < 2) {
            return 'DarkBlue';
          } else {
            return 'DarkCyan';
          }
         });
      // Add the values of the heights 
      svg.append('g')
         .selectAll('text')
         .data(nested_data)
         .enter()
         .append('text')
         .attr('x', function(d, i) {
          return margin * 1.5 + width * 0.7 / nested_data.length * (i + 0.35);
         })
         .attr('y', function(d) {
          return y_scale(d.values['expected_delay_time']) + 25;
         })
         .attr('fill', 'white')
         .text(function(d) {
          return Math.round(d.values['expected_delay_time'] * 100) / 100;
         })
      // Add carrier names
      svg.append('g')
         .selectAll('text')
         .data(nested_data)
         .enter()
         .append('text')
         .attr('x', function(d, i) {
          var add = 0;
          if (i === 0) {
            add = 0.2;
          } else if (i === 1) {
            add = 0.1
          } else {
            add = 0.02;
          }
          return margin * 1.5 + width * 0.7 / nested_data.length * (i + add);
         })
         .attr('y', height + 20)
         .attr('fill', 'black')
         .text(function(d) {
          return d.key.replace('Inc.', '').replace('Co.', '');
         })
    }                    
  }

  // Accessor function, convert everything into number
  function accessor(d) {
    d['arr_flights'] = +d["arr_flights"];
    d['arr_del15'] = +d['arr_del15'];
    d['arr_cancelled'] = +d['arr_cancelled'];
    d['arr_diverted'] = +d['arr_diverted'];
    d['year'] = +d['year'];
    d['carrier_ct'] = +d['carrier_ct'];
    d['weather_ct'] = +d[' weather_ct'];
    d['nas_ct'] = +d['nas_ct'];
    d['security_ct'] = +d['security_ct'];
    d['late_aircraft_ct'] = +d['late_aircraft_ct'];
    return d;
  }

  var carriers = ['AA', 'USAirway', 'UA', 'SW', 'Delta'];
  // Look at all airlines and make the bar chart
  for (var i = 0; i < carriers.length; i++) {
    d3.csv(carriers[i] + '2004to2014.csv', accessor, callback);
  }
}