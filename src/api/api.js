export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "5a3283303e8b71660db01b96fb67c038";

export const API_KEY_4 = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTMyODMzMDNlOGI3MTY2MGRiMDFiOTZmYjY3YzAzOCIsInN1YiI6IjVmZjQyZWFhMmNkZTk4MDA0MDcxYjk5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uqx7uFjeSbLTyLxkAih6H85u5fr2zAo7DGj63bnu7s4"

export const fetchAPI = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => {
            if (response.status < 400) {
                return response.json()
            } else {
                throw response;
            }
        }).then(data => resolve(data)).catch(response => response.json().then(error => reject(error)))
    })
}
