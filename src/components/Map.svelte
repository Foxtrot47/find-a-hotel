<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import type { Map, Marker } from 'leaflet';

	interface Leaflet {
		map: (element: HTMLElement, options: Object) => Map;
		tileLayer: (url: string, options: Object) => any;
		marker: (coordinates: [number, number]) => Marker;
	}

	let mapElement: HTMLElement;
	let map: Map;
	let leaflet: Leaflet;
	let marker: Marker;

	export let center: [number, number];

	$: {
		if (map) {
			map.setView(center, center ? 4 : 2);
			if (marker) {
				map.removeLayer(marker);
			}
			marker = leaflet.marker(center).addTo(map).openPopup();
		}
	}

	onMount(async () => {
		if (!browser) return;
		leaflet = (await import('leaflet')) as Leaflet;
		map = leaflet
			.map(mapElement, {
				scrollWheelZoom: false
			})
			.setView(center || [51, -0.09], center ? 4 : 2);

		leaflet
			.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			})
			.addTo(map);

		marker = leaflet.marker(center).addTo(map).openPopup();
	});

	onDestroy(async () => {
		if (map) {
			map.remove();
		}
	});
</script>

<div class="z-0 h-96 rounded-lg" bind:this={mapElement} />

<style>
	@import 'leaflet/dist/leaflet.css';
</style>
