import { stringToAvatar } from '$lib/gradient';
import type { Direction } from '$lib/gradient';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, url }) => {
	const input = params.str;
	const size = Number(url.searchParams.get('size') ?? '256');
	const direction = url.searchParams.get('direction') || 'diagonal';
	const svg = stringToAvatar(input, size, direction as Direction);
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}) satisfies RequestHandler;
