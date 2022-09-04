import countries from "./countries"
import pokemonStats from "./pokemonStats"


interface Option {
    id: string;
    title: string;
    value: number;
    img: string;
}


export function getOption(category: string, excludeId?: string) {
    const module = getModule(category);
    const options = module.getOptions();
    const option = getRandomOption(options, excludeId);
    return option
}

export function getInitialOptions(category: string) {
    const module = getModule(category);
    const { pretext, posttext } = module;

    const prev = getRandomOption(module.getOptions());
    const curr = getRandomOption(module.getOptions(), prev.id);
    const next = getRandomOption(module.getOptions(), curr.id);

    return { prev, curr, next, pretext, posttext};
}

function getModule(category: string) {
    switch (category) {
        case "pokemon":
            return pokemonStats;
        case "countries":
        default:
            return countries;
    }
}

function getRandomOption(options: Option[], excludeId?: string) {
    const filteredOptions = excludeId ? options.filter(option => option.id !== excludeId) : options;
    const selectedOption = filteredOptions[Math.floor(Math.random() * filteredOptions?.length)];
    if (typeof selectedOption === "undefined") throw Error("Empty options list");
    return selectedOption;
}
