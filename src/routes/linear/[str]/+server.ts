import { stringToLinearGradient } from '$lib/gradient';
import type { Direction } from '$lib/gradient';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, url }) => {
	const input = params.str;
	const size = url.searchParams.get('size') ? Number(url.searchParams.get('size')) : undefined;
	const direction = url.searchParams.get('direction') ?? undefined;
	const initial = url.searchParams.has('initial');
	const svg = stringToLinearGradient(input, { size, direction: direction as Direction, initial });
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}) satisfies RequestHandler;
