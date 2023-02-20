import { stringToRadialGradient } from '$lib/gradient';
import type { Offset } from '$lib/gradient';
import type { RequestHandler } from './$types';

export const GET = (async ({ params, url }) => {
	const input = params.str;
	const size = url.searchParams.get('size') ? Number(url.searchParams.get('size')) : undefined;
	const offset = url.searchParams.get('offset') ?? undefined;
	const svg = stringToRadialGradient(input, { size, offset: offset as Offset });
	return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}) satisfies RequestHandler;
