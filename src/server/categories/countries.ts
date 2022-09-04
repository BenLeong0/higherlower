const category = "countries";
const pretext = "has a population of";
const posttext = null;

function getOptions() {
    return [
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
    ];
};

const module = { category, pretext, posttext, getOptions };
export default module;
