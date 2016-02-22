Summary:

	On time performance:
	Among the five airlines, the on time performance of Delta has improved from the worst to the best (0.84 in 2014), US Airways went through a similar pattern and landed at the second place in 2014 (0.81), while the other three airlines all went down in their on time performance during the recent few years to roughly 0.75.

	Average delay time:
	Southwest Airlines and US Airways have mostly maitained as companies with lowest average delay time over the years (around 45 minutes to 50 minutes), while United Air Lines and American Airlines have always had higher delay time at around 60 minutes. An interesting discovery is that although Delta has the highest on time percentage by 2014, their yearly average delay time went up from the less than 50 minutes to roughly 60 minutes.

Design:
	Initial design:
	The first idea was to simply make a line chart to show the change of on time performance of the five largest airlines in the U.S. Because the five lines turned out to be close to each other, I added the ability to highlight individual lines by hovering mouse on the legend or clicking it since it's easier to pick different rows in legend. Different lines are also color encoded.

	Changes:
	I have incorporated every feedback I listed below and made further improvements.
	1. A second plot was added to show yearly average delay time.
	2. When highlighting individual lines, other lines keep their colors and only have their opacity reduced.
	3. I added the attribute "class"="clickable" to interactive elements, and modified css so cursor changes into a hand on these elements.
	4. Circles are added to the line chart for data points. I've also made them interactive, when hovering over circles, the coordinates and carrier name are displayed at the bottom right corner.
	5. The right edge of the chart is moved a little inward, and the legend is moved to the right side of the chart.
	6. y axis is now starting from 0 by default to avoid over exaggerating differences and changes. But because the lines are relatively close to each other, I added one form for each chart so the viewer can manually set the range of y axis to get a better view at the chart. A simple error message will be shown if the input values are not valid.

	Changes After Review:
	1. I chose to highlight only the two most punctual carriers in the plots so the focus becomes clearer. I also added a bar chart at the end and sort it according to expected delay time. But I still left the option to explore by hovering or clicking on the legend in the first two plots.
	2. I tried to use the color blind friendly palette on colorbrewer2.org, but my plot has too many categories and some colors on that palette don't stand out on a white background. So I used color blind friendly palette found elsewhere. 
	3. y axis controls were removed.
	4. Textual explanations were added to describe the stories to viewer.
	5. The most punctual carriers are highlighted.

Feedback:
	I shared my visualization with 4 friends in person so I did not create a link.
	Here are the suggestions I collected:
	1. Make another plot to show the average delay time for different airlines since one airline may have a high on time percentage but long average delay time when a delay happens so delay time should also be taken into account.
	2. When highlighting individual airlines, instead of changing every other line ot grey, keep their colors and make them dimmer so viewers can still see which airlines they are.
	3. When mouseover an interactive element, give some visual cue this is an interactive element.
	4. Show data points on the line chart so viewers can read the data from the chart more conveniently.
	5. Move the legend so it does not overlap with the grid lines.
	6. The y axis should start from 0 or the visualization may lead to false impression on the actual amount of change over time and differences between airlines.
	Reivewer Feedback:
		1. Make an explanatory visualization instead of exploratory.
		2. Use color blind friendly palette.
		3. Remove y axis control to avoid confusion and remain in control of the visualization.
		4. Add textual explanation.
		5. Highlight the stories in the plot.

Resources:
    http://stackoverflow.com/, http://www.w3schools.com/, https://github.com/mbostock/d3/wiki/API-Reference.
