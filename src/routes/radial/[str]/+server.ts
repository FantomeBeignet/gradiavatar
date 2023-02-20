import { stringToRadialGradient } from '$lib/gradient';
import type { Offset } from '$lib/gradient';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, url }) => {
	const input = params.str;
	const size = url.searchParams.get('size') ? Number(url.searchParams.get('size')) : undefined;
	const offset = url.searchParams.get('offset') ?? undefined;
	const initial = url.searchParams.get('initial')
		? Boolean(url.searchParams.get('initial'))
		: undefined;
	const svg = stringToRadialGradient(input, { size, offset: offset as Offset, initial });
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}) satisfies RequestHandler;
