/**
 * @jest-environment jsdom
 */

import page from '@automattic/calypso-router';
import { redirectToInbox } from '../controller';

jest.mock( '@automattic/calypso-router', () => ( {
	__esModule: true,
	default: { redirect: jest.fn() },
} ) );
jest.mock( 'calypso/components/async-load', () => () => null );
jest.mock( 'calypso/reader/controller-helper', () => ( {} ) );
jest.mock( 'calypso/reader/stats', () => ( {} ) );

const run = async ( teams ) => {
	const next = jest.fn();
	const context = { queryClient: { fetchQuery: jest.fn().mockResolvedValue( { teams } ) } };
	await redirectToInbox( context, next );
	return next;
};

describe( 'redirectToInbox', () => {
	beforeEach( () => jest.clearAllMocks() );

	it( 'redirects Automattic team members to the inbox', async () => {
		const next = await run( [ { slug: 'a8c' } ] );

		expect( page.redirect ).toHaveBeenCalledWith( '/reader/conversations/inbox' );
		expect( next ).not.toHaveBeenCalled();
	} );

	it( 'leaves everyone else on the old feed', async () => {
		const next = await run( [] );

		expect( page.redirect ).not.toHaveBeenCalled();
		expect( next ).toHaveBeenCalled();
	} );
} );
