# simple-chart
Simple chart written with JavaScript and you even don't need to add any css files. just download and use.

## How to use
Doanload the files and put chart.js or chart.min.js and data.json(which will be your personal API) in your project folder.
Add this following script to your file:
```
<script type="text/javascript" src="chart.min.js"></script>
```
Then just add these HTML tags to your HTML file:
```
<div class="container">
    <div class="chart">
        <div class="label-x"></div>
        <div class="label-y"></div>
    </div>
    <div class="info">
        <h2>-</h2>
        <p>-</p>
        <pre>-</pre>
    </div>
</div>
```
**Notice that you can ADD new classes to the elements but you can't change the main classes.**

***You may see an error or white screen while opening the files normally in the browser. Use this syntax for this purpose:***
```
python -m http.server
```
**You can also use apps like** ***Wampserver*** **or** ***Xampp*** **to run mentioned file.**
