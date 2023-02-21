<script lang="ts">
	let input = '';
	let mode: 'linear' | 'radial' = 'linear';
	let initial = false;
	let direction: 'vertical' | 'horizontal' | 'diagonal' | 'antidiagonal' = 'diagonal';
	let offset:
		| 'center'
		| 'north'
		| 'south'
		| 'east'
		| 'west'
		| 'northeast'
		| 'northwest'
		| 'southeast'
		| 'southwest' = 'northeast';

	let url: string;
	$: url = `/${mode}/${input || 'fantomebeignet'}?${initial ? 'initial&' : ''}${
		mode === 'linear' ? 'direction=' + direction + '&' : 'offset=' + offset + '&'
	}`;
</script>

<main class="flex flex-col items-center justify-center gap-10 p-12">
	<h1 class="text-center text-2xl font-semibold">Generate a gradient avatar from text</h1>
	<img src={url} alt={`Avatar corresponding to ${input}`} class="w-8/12" />
	<input
		type="text"
		bind:value={input}
		class="gradient-input bg-gray-100 p-3 text-lg placeholder:text-gray-500"
		placeholder="Your text"
	/>
	<div class="flex flex-col items-start justify-center">
		<fieldset class="flex w-full flex-row items-center justify-between gap-4 p-2">
			<legend class="font-semibold">Mode:</legend>
			<div class="flex items-center justify-center">
				<div class="flex items-center justify-center rounded-full transition">
					<label
						class="hover:bg-gray-222 flex items-center justify-center gap-2 py-2 px-4 hover:cursor-pointer"
					>
						<input type="radio" value="linear" bind:group={mode} class="peer sr-only" checked />
						<div
							class="inline-block h-4 w-4 rounded-full bg-gray-300 transition peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-fuchsia-500"
						/>
						<span>Linear</span>
					</label>
				</div>
				<div class="flex items-center justify-center rounded-full transition">
					<label class="flex items-center justify-center gap-2 py-2 px-4 hover:cursor-pointer">
						<input type="radio" value="radial" bind:group={mode} class="peer sr-only" />
						<div
							class="inline-block h-4 w-4 rounded-full bg-gray-300 transition peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-fuchsia-500"
						/>
						<span>Radial</span>
					</label>
				</div>
			</div>
		</fieldset>
		<label class="flex w-full items-center justify-between py-4 font-semibold"
			>Initial letter:
			<input type="checkbox" bind:checked={initial} class="peer hidden" />
			<div
				class="peer relative h-6 w-11 rounded-full bg-gray-300 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-400 after:bg-gray-100 after:transition-all hover:cursor-pointer peer-checked:bg-gradient-to-r peer-checked:from-violet-500 peer-checked:to-fuchsia-500 peer-checked:after:translate-x-full peer-checked:after:border-gray-100 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"
			/>
		</label>
		{#if mode === 'linear'}
			<label for="direction" class="flex w-full items-center justify-between py-4 font-semibold"
				>Direction:
			</label>
			<div class="select-wrapper">
				<select
					bind:value={direction}
					id="direction"
					class="w-full appearance-none border-0 border-b-2 border-gray-400 bg-gray-100 px-2.5 py-2"
				>
					<option value="vertical">Vertical</option>
					<option value="horizontal">Horizontal</option>
					<option value="diagonal">Diagonal</option>
					<option value="antidiagonal">Antidiagonal</option>
				</select>
			</div>
		{:else if mode === 'radial'}
			<label for="offset" class="flex w-full items-center justify-between py-4 font-semibold"
				>Offset:
			</label>
			<div class="select-wrapper">
				<select
					bind:value={offset}
					id="offset"
					class="w-full appearance-none border-0 border-b-2 border-gray-400 bg-gray-100 px-2.5 py-2"
				>
					<option value="center">Center</option>
					<option value="north">North</option>
					<option value="south">South</option>
					<option value="east">East</option>
					<option value="west">West</option>
					<option value="northeast">Northeast</option>
					<option value="northwest">Northwest</option>
					<option value="southeast">Southeast</option>
					<option value="southwest">Southwest</option>
				</select>
			</div>
		{/if}
	</div>
</main>

<style>
	.gradient-input {
		border: 2px solid;
		border-image-source: linear-gradient(to left, #fa00d0, #008ffd);
		border-image-slice: 1;
		margin: 2px;
	}

	.gradient-input:focus,
	.gradient-input:active {
		border: 4px solid;
		outline: none;
		border-image-source: linear-gradient(to left, #fa00d0, #008ffd);
		border-image-slice: 1;
		box-sizing: border-box;
		margin: 0;
	}

	.select-wrapper {
		width: 100%;
		position: relative;
	}

	.select-wrapper::after {
		content: '';
		position: absolute;
		right: 0.625rem;
		top: 50%;
		transform: translateY(-50%);
		background-image: url('/chevron_down.svg');
		width: 1rem;
		height: 1rem;
		pointer-events: none;
	}
</style>
