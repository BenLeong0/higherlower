const EXAMPLE_OPTIONS = {
    "category": "countries",
    "pretext": "has a population of",
    "posttext": null,
    "options": [
        {
            "id": "united-kingdom",
            "title": "United Kingdom",
            "value": 67220000,
            "img": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
        },
        {
            "id": "france",
            "title": "France",
            "value": 67390000,
            "img": "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
        },
        {
            "id": "japan",
            "title": "Japan",
            "value": 125800000,
            "img": "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg"
        },
    ]
}

export default function getOptions() {
    return EXAMPLE_OPTIONS;
}
