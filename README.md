# Frontend-Data (FD)
![Endresult](images/final_graph.png)

## Index
**[Introduction](#Introduction)**<br>
**[Installation](#installation)**<br>
**[Retrieving Data](#retrieving-data)**<br>
**[Data Restructering](#data-restructering)**<br>
**[To-Do](#to-do)**<br>
**[Conclusion](#conclusion)**<br>
**[Credits](#credits)**<br>


## Introduction
The assignment for FD was to create a interactive data visualisation in which user could explore for themselves. The data was provided by the Amsterdam library (OBA). I created a multiline graph that showes german books published between 1930-1970 by city. The default graph showcases the 4 biggest cities by publisher. The user can add other cities themselves. 

## Installation
Request a key from OBA
```
Clone the repo:

git clone https://github.com/sjerrietukkel/frondend-data

Install OBA-scraper:
npm i @gijslaarman/oba-scraper

Create .env file for storing API key:
touch .env

paste the APIkey in the .env file:
PUBLIC_KEY=your_API_key

Start up the nodeJS server:
node index
```

## Retrieving Data
The data I needed for my visualisation were all german books filtered by publication place and publication year. Using the following code in the Oba-Scraper:
```js
query: {
      q: 'book',
      facet: 'language(ger)',
      refine: true
  },
  pages: {
      page: 1,
      pagesize: 20,
      maxpages: 1000
  }
}  
```
Using the filter I made sure it got back data, if that isn't the case it'll return ```null```
```js
 filter: {
    pubYear: `book.publication && book.publication[0].year && book.publication[0].year[0]['_'] ? book.publication[0].year[0]['_'] : null`,
      publication: `book.publication && book.publication[0].publishers && book.publication[0].publishers[0].publisher && book.publication[0].publishers[0].publisher[0].$.place ? book.publication[0].publishers[0].publisher[0].$.place : null`
 }  
```
This was pushed into a .json file using 

```js
obaApi.getPages(search).then(
  res => fs.writeFile('data/all.json', JSON.stringify(res.data), 'utf8', () => {
    console.log('Joe joe, ik heb de file gemaakt.')
  })
)
```

This resulted in a all.json, which houses 19462 german books.

## Data Restructering
Using the OBA-Scraper I retrieved all 19462 german books, which literally took 35 minutes, and filtered those on publication place, and publication year. However, it wasn't structered the way I wanted .


That's what I spend the majority of the two weeks on. The example I based my graph on (https://beta.observablehq.com/@mbostock/d3-multi-line-chart) used the following structure: 
```js
[
    {
        y: "%Unemployed"
        series: {name:"Bethesda-Rockville-Frederick MD"
        values: ["2.4", "2.6", 'etc']
        }
        dates: [2000-01-01, 2001-02-02, 'etc']
    }
]
```
So to me it seemed logical to restructure it the same way, which horribly failed, because the example uses 2 seperate datasets which are combined and I used only one.

I wanted to restructure the data as city > pubYear > value. 
First I had to filter out all the typo's and invalid cities

```js
var publicationCity = data.map(d => {
        return {
            pubYear: d.pubYear,
            publication: d.publication == null ? 'geen plaats' : d.publication.replace(/[^a-zA-Z ]/g, "")
        }
    })
```
The following code counts checks publication years, how often a city is mentioned and checks the value.

```js

function createDataList(list){
    const result = [];
        list.forEach(city => {
            thisCityValues = {
                city: city,
                value: []
            }
            for (let i = 1920; i <= 1970; i++) {
                let thisYear = {
                    year: i,
                    value: 0
                }
            publicationCity.forEach(book => {
                if(book.publication != city) {
                            return
                        }
                        if (Number(book.pubYear) === i) {
                            thisYear.value++
                        }
                    })
                    thisCityValues.value.push(thisYear)
                }
            result.push(thisCityValues)
        })
    return result
}

```
This was done ith the help of @gijslaarman .



## To-Do

- [x] Restructure Data
- [x] Create graph
- [x] Add values on axis
- [x] User input
- [ ] Transitions
- [ ] Cleaner CSS 
- [ ] Give user more options & clarity (remove/hide lines, tooltip)
- [ ] Retrieve cleaner data
- [ ] Fix x-axis bug on Chrome

## Conclusion 
Creating this visualisation was difficult. I tried to restructure the data by myself and got horribly lost. Luckily Laurens helped me out by drawing the data structure. This helped me a lot. My initial idea was to see 3 different countries on a line graph during the second world war, but this quickly became to complex so I narrowed it down to Germany.

### Credits
@Gijslaarman for helping me restructure the data. <br>
@Folkert-Jan for helping with the update function.
<br>
@mbostock: https://beta.observablehq.com/@mbostock/d3-multi-line-chart

