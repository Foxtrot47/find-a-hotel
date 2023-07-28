<script lang="ts">
	import Icon from '@iconify/svelte';

	export let imageUrl: string;

	let fileInput: HTMLInputElement;
	let files: FileList;
	let uploading: boolean = false;
	let progress: number = 0;

	const getBase64 = (image: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e: ProgressEvent<FileReader>) => {
			if (e.target && e.target.result) {
				uploadImage(e.target.result as string);
			}
		};
	};
	const uploadImage = async (imgBase64: string) => {
		uploading = true;
		const data = {};
		const imgData = imgBase64.split(',')[1];

		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/api/uploadImage', true);
		xhr.setRequestHeader('Content-type', 'application/json');

		xhr.upload.addEventListener('progress', function (e) {
			if (e.lengthComputable) {
				progress = (e.loaded / e.total) * 100;
			}
		});

		xhr.onload = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				// The request has been completed successfully
				let response = JSON.parse(xhr.responseText);
				imageUrl = response.url;
				uploading = false;
			} else {
				console.log('Error: ' + xhr.status);
			}
		};

		xhr.send(JSON.stringify({ data: imgData }));
	};
</script>

<div class="h-full w-full">
	<input
		class="hidden"
		type="file"
		accept=".png,.jpg"
		bind:files
		bind:this={fileInput}
		on:change={() => getBase64(files[0])}
	/>
	<button
		on:click={() => fileInput.click()}
		class="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-2 text-neutral-600 transition hover:opacity-70"
	>
		<progress
			class={`z-10 text-rose-400 ${!uploading && 'hidden'}`}
			value={progress}
			max="100"
		/>
		<Icon icon="tabler:photo-plus" class="h-12 w-12" />
		<div class="text-lg font-semibold">Click to upload</div>
		{#if imageUrl}
			<div class="absolute inset-0 h-full w-full">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src={imageUrl} class="h-full w-full object-cover" />
			</div>
		{/if}
	</button>
</div>
