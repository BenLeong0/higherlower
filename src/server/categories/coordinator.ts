import getCountriesOptions from "./countries"

export default function getOptions(category: string) {
    switch (category) {
        case "pokemon":
            return getCountriesOptions();
        case "countries":
        default:
            return getCountriesOptions();
    }
}
