/**
 * @format
 */

/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { ERROR } from 'store/constants';
import reportItemsReducer from '../reducer';
import { getJsonString } from 'store/utils';

describe( 'reportItemsReducer()', () => {
	const endpoint = 'coupons';

	it( 'returns an empty object by default', () => {
		const state = reportItemsReducer( undefined, {} );
		expect( state ).toEqual( {} );
	} );

	it( 'returns with received items data', () => {
		const originalState = deepFreeze( {} );
		const query = {
			orderby: 'orders_count',
		};
		const itemsData = [ { id: 1214 }, { id: 1215 }, { id: 1216 } ];

		const state = reportItemsReducer( originalState, {
			type: 'SET_REPORT_ITEMS',
			endpoint,
			query,
			data: itemsData,
			totalCount: itemsData.length,
		} );

		const queryKey = getJsonString( query );
		expect( state[ endpoint ][ queryKey ] ).toEqual( {
			data: itemsData,
			totalCount: itemsData.length,
		} );
		expect( state[ endpoint ][ queryKey ].totalCount ).toEqual( itemsData.length );
	} );

	it( 'tracks multiple queries in items data', () => {
		const otherQuery = {
			orderby: 'id',
		};
		const otherQueryKey = getJsonString( otherQuery );
		const otherItemsData = [ { id: 1 }, { id: 2 }, { id: 3 } ];
		const otherQueryState = {
			[ endpoint ]: {
				[ otherQueryKey ]: {
					data: otherItemsData,
					totalCount: otherItemsData.length,
				},
			},
		};
		const originalState = deepFreeze( otherQueryState );
		const query = {
			orderby: 'orders_count',
		};
		const itemsData = [ { id: 1214 }, { id: 1215 }, { id: 1216 } ];

		const state = reportItemsReducer( originalState, {
			type: 'SET_REPORT_ITEMS',
			endpoint,
			query,
			data: itemsData,
			totalCount: itemsData.length,
		} );

		const queryKey = getJsonString( query );
		expect( state[ endpoint ][ queryKey ] ).toEqual( {
			data: itemsData,
			totalCount: itemsData.length,
		} );
		expect( state[ endpoint ][ otherQueryKey ] ).toEqual( {
			data: otherItemsData,
			totalCount: otherItemsData.length,
		} );
	} );

	it( 'returns with received error data', () => {
		const originalState = deepFreeze( {} );
		const query = {
			orderby: 'orders_count',
		};

		const state = reportItemsReducer( originalState, {
			type: 'SET_REPORT_ITEMS_ERROR',
			endpoint,
			query,
		} );

		const queryKey = getJsonString( query );
		expect( state[ endpoint ][ queryKey ] ).toEqual( ERROR );
	} );
} );
