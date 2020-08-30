// get the latest new about COVID Vaccine 
function getNewsData() {
    //'loader' is a loading indicator that shows a spinner when the data not fetched from API call.
    const loader = document.createElement('div')
    loader.classList.add('spinner-border', 'm-5')
    loader.setAttribute('id', 'loader')
    // this will be added to 'news-container' element.
    document.getElementById('news-container').appendChild(loader)
    //make HTTP request with fetch
    var url = 'https://newsapi.org//v2/everything?' +
        'q=covid vaccine&' +
        'language=en&' +
        'sortBy=relevancy&' +
        'pageSize=30&' +
        'apiKey=84c6767da1474c969c36cecf2a7870ab';
    var req = new Request(url);
    fetch(req)
        .then(response => { return response.json() })
        .then((data) => {
            let news_container = document.getElementById('news-container')
            news_container.setAttribute('class', 'row')
            data.articles.forEach((item) => {
                var date = new Date(item.publishedAt);
                // convert date to the new format
                date = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
                // make 'news_item' element to put data inside it.
                const news_item = document.createElement('div')
                news_item.classList.add('my-3', 'col-sm-6')
                news_item.innerHTML = '<div class="card"><div class="card"><img src="' + item.urlToImage + '" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">' + item.title + '</h5><p class="card-text">' + item.description + '</p><span class="card-text"><small class="text-muted">' + date + '</small></span><p class="card-text"><small class="text-muted">' + item.source.name + '</small></p><a href="' + item.url + '" class="btn btn-success">Read more...</a></div></div></div>'
                news_container.appendChild(news_item)
            })
            // after adding all the data to 'news_container', we hide the 'loader' by making display none.
            document.getElementById("loader").style.display = "none";
        })
        .catch((err) => {
            console.log(err)
        })
}

// you can get the latest facts and figures about COVID-19 in global.
function getLatestStatics() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };
    fetch("https://api.covid19api.com/summary", requestOptions)
        .then(response => response.json())
        .then(data => {
            const result = data.Global
            // add new options and data that fetched from API.
            const chart = document.getElementById('chart');
            chart.setAttribute('class', 'my-5')
            new Chart(chart, {
                type: 'doughnut',
                data: {
                    labels: [
                        'New Cases',
                        'New Deaths'
                    ],
                    datasets: [
                        {
                            label: 'Covid',
                            backgroundColor: ['#f1c40f', '#eb4034'],
                            data: [
                                result.NewConfirmed,
                                result.NewDeaths
                            ]
                        }
                    ]
                }
            });
        })
        .catch(error => console.log('error', error));
}

// invoke the function after local server started.
getNewsData()
