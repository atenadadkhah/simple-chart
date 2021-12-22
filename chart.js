/******************** WRITTEN BY ATENA DADKHAH  ***********************/
//document ready function
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
//XMHttpRequest object
const xmlhttp = new XMLHttpRequest();
//YOUR JSON FILE HERE
const url = "data.json";
//start get and use the API
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        const myArr = JSON.parse(this.responseText);
        document.getElementsByClassName('label-x').item(0).innerHTML = myArr['labels']['x']
        document.getElementsByClassName('label-y').item(0).innerHTML = myArr['labels']['y']
        let values = []
        let nums = []
        let keys = []
        //values of numbers in order
        for (i = 0; i < myArr['items'].length; i++) {
            values.push(myArr['items'][i]['value'])
        }
        // sort values from highest to lowest
        values.sort(function (a, b) {
            return a - b
        })
        values.reverse()
        //get the index of each value
        for (let i = 0; i < values.length; i++) {
            let showKeys = values.indexOf(myArr['items'][i]['value'])
            nums.push(showKeys)
        }
        //set from the highest value index to the lowest value index
        for (let i = 0; i < nums.length; i++) {
            keys.push(nums.indexOf(i))
        }
        docReady(function () {
            //set styles
            if (document.querySelectorAll("style").length === 0) {
                let addStyleTag = document.createElement("style")
                addStyleTag.innerHTML = `
                    .container {
                        display: flex;
                        align-items: center;
                        font-family: sans-serif;
                    }
                    .chart {
                        position: relative;
                        border: 2px solid grey;
                        flex: 0 0 500px;
                        height: 300px;
                        margin: 40px;
                    }
                    .label-x {
                        position: absolute;
                        bottom: -1.5em;
                        left: 50%;
                        transform: translateX(-50%) translateY(50%);
                    }
                    .label-y {
                        position: absolute;
                        top: 50%;
                        left: -1.5em;
                        transform:  translateX(-50%) translateY(-50%) rotate(-90deg);
                    }
                    .info {
                        flex: 0 0 300px;
                    }`
                document.querySelector("head").appendChild(addStyleTag);

            }
            else {
                document.querySelector("style").innerHTML += `
                    .container {
                        display: flex;
                        align-items: center;
                        font-family: sans-serif;
                    }
                    .chart {
                        position: relative;
                        border: 2px solid grey;
                        flex: 0 0 500px;
                        height: 300px;
                        margin: 40px;
                    }
                    .label-x {
                        position: absolute;
                        bottom: -1.5em;
                        left: 50%;
                        transform: translateX(-50%) translateY(50%);
                    }
                    .label-y {
                        position: absolute;
                        top: 50%;
                        left: -1.5em;
                        transform:  translateX(-50%) translateY(-50%) rotate(-90deg);
                    }
                    .info {
                        flex: 0 0 300px;
                    }
                    `
            }
            const chart = document.querySelector(".chart")
            //width of each column => parent width/numbers of columns
            let columnWidth = (chart.clientWidth) / myArr['items'].length;
            let percentHeight = []
            //calculate the height of each column (here the height of the highest column considered 90% parent element height)
            //create columns
            for (let i = 0; i < values.length; i++) {
                percentHeight.push(values[i] / (values[0] / 9) * 10)
                const createDiv = document.createElement("div")
                createDiv.style.width = columnWidth + "px"
                createDiv.style.height = chart.clientHeight * (percentHeight[i] / 100) + "px";
                createDiv.style.backgroundColor = myArr['items'][keys[i]]['color']
                createDiv.style.display = "inline-block";
                createDiv.style.marginTop = chart.clientHeight * (10 / 100) + "px";
                createDiv.className = "column"
                chart.appendChild(createDiv)
            }
            //get all .column elements
            const columns = document.querySelectorAll(".column")
            //set color function based on API
            let setColor = () => {
                for (i = 0; i < percentHeight.length; i++) {
                    columns[i].style.backgroundColor = myArr['items'][keys[i]]['color']
                }
            }
            //set class function for each column
            let setClass = () => {
                columns.forEach((item) => {
                    item.className = "column"
                })
            }
            //set the primary properties when the page loaded
            columns.item(0).style.backgroundColor = myArr["activeColor"]
            columns.item(0).classList.add("on")
            //a function to get the contents from JSON file and set them in each element
            let setAPI = (index) => {
                document.querySelector(".info h2").innerHTML = myArr['items'][index]['title']
                document.querySelector(".info p").innerHTML = myArr['items'][index]['description']
                //separate numbers with commas by regex
                document.querySelector(".info pre").innerHTML = myArr['items'][index]['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            setAPI(keys[0])
            //a function to specify the index of active element in the parent element
            let indexOfOn = () => {
                const onElement = document.querySelector(".on")
                const parentColumns = onElement.parentNode
                let indexOn = nums.indexOf(Array.prototype.indexOf.call(parentColumns.children, onElement) - 2)
                return indexOn
            }
            //mouseenter event
            columns.forEach((item) => {
                item.onmouseenter = function () {
                    setColor()
                    setClass()
                    this.style.backgroundColor = myArr["activeColor"]
                    this.classList.add("on")
                    let numOn = indexOfOn()
                    setAPI(numOn)
                }
            })
            //keydown event to move the active element
            window.onkeydown = (ev) => {
                //next <div> of active element
                let nextElement = document.querySelectorAll(".on")[0].nextElementSibling != null ? document.querySelectorAll(".on")[0].nextElementSibling : document.querySelectorAll(".column")[0]
                //previous <div> of active element
                let prevElement = document.querySelectorAll(".on")[0].previousElementSibling != null && document.querySelectorAll(".on")[0].previousElementSibling.className !== "label-x" && document.querySelectorAll(".on")[0].previousElementSibling.className !== "label-y" ? document.querySelectorAll(".on")[0].previousElementSibling : document.querySelectorAll(".column")[columns.length - 1]
                switch (ev.keyCode) {
                    //left arrow key
                    case 37:
                        setColor()
                        setClass()
                        prevElement.style.backgroundColor = myArr["activeColor"]
                        prevElement.classList.add("on")
                        break
                    //right arrow key
                    case 39:
                        setColor()
                        setClass()
                        nextElement.style.backgroundColor = myArr["activeColor"]
                        nextElement.classList.add("on")
                        break
                }
                let numOn = indexOfOn()
                setAPI(numOn)
            }

        })
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();
