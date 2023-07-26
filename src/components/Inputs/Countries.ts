import countries from 'world-countries';
const countriesList = countries.map((country) => ({
	value: country.cca2,
	label: country.name.common,
	flag: country.flag,
	latlng: country.latlng,
	region: country.region
}));
const getByValue = (value: string) => {
	console.log(value);
	return countriesList.find((country) => country.value === value);
};

export { countriesList, getByValue };

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: number[];
	region: string;
	value: string;
};
