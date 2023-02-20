import { stringToRadialGradient } from '$lib/gradient';
import type { Offset } from '$lib/gradient';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, url }) => {
	const input = params.str;
	const size = Number(url.searchParams.get('size') ?? '256');
	const offset = url.searchParams.get('offset') || 'northeast';
	const svg = stringToRadialGradient(input, size, offset as Offset);
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}) satisfies RequestHandler;
