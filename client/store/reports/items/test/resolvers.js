/*
* @format
*/

/**
 * External dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { dispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import resolvers from '../resolvers';

const { getReportItems } = resolvers;

jest.mock( '@wordpress/data', () => ( {
	dispatch: jest.fn().mockReturnValue( {
		setReportItems: jest.fn(),
	} ),
} ) );
jest.mock( '@wordpress/api-fetch', () => jest.fn() );

describe( 'getReportItems', () => {
	const ITEMS_1 = [ { id: 1214 }, { id: 1215 }, { id: 1216 } ];
	const ITEMS_2 = [ { id: 1 }, { id: 2 }, { id: 3 } ];
	const endpoint = 'products';

	beforeAll( () => {
		apiFetch.mockImplementation( options => {
			if ( options.path === `/wc/v3/reports/${ endpoint }` ) {
				return Promise.resolve( ITEMS_1 );
			}
			if ( options.path === `/wc/v3/reports/${ endpoint }?orderby=id` ) {
				return Promise.resolve( ITEMS_2 );
			}
		} );
	} );

	it( 'returns requested report data', async () => {
		expect.assertions( 1 );
		await getReportItems( endpoint );
		expect( dispatch().setReportItems ).toHaveBeenCalledWith( endpoint, ITEMS_1, undefined );
	} );

	it( 'returns requested report data for a specific query', async () => {
		expect.assertions( 1 );
		await getReportItems( endpoint, { orderby: 'id' } );
		expect( dispatch().setReportItems ).toHaveBeenCalledWith( endpoint, ITEMS_2, { orderby: 'id' } );
	} );
} );
