const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDFlNzdlZDJjOGEwYTE1NmM2Zjc1ZTI2ZmI4ODk2YiIsIm5iZiI6MTcxMzM4ODY2OS4yOTYsInN1YiI6IjY2MjAzYzdkYTZmZGFhMDEzMTZhMDYxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2mjp60SCCw-TBaa798baEDJsT-8s18LsvMN9J8-hhGc'
    }
  };
  
  fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));