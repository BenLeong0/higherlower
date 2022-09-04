const category = "pokemonStats";
const pretext = "has a base stat total of";
const posttext = null;

function getOptions() {
    return [
        {
            "id": "25",
            "title": "Pikachu",
            "value": 60,
            "img": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
        },
    ];
}

const module = { category, pretext, posttext, getOptions };
export default module;
