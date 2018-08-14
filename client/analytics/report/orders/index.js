/** @format */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { Button } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import moment from 'moment';
import { partial } from 'lodash';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import { filters, filterPaths, advancedFilterConfig } from './constants';
import Header from 'layout/header/index';
import { ReportFilters } from 'components/filters';
import './style.scss';

class OrdersReport extends Component {
	constructor( props ) {
		super( props );

		this.toggleStatus = this.toggleStatus.bind( this );
	}

	toggleStatus( order ) {
		const { requestUpdateOrder } = this.props;
		const updatedOrder = { ...order };
		const status = updatedOrder.status === 'completed' ? 'processing' : 'completed';
		updatedOrder.status = status;
		requestUpdateOrder( updatedOrder );
	}

	render() {
		const { orders, orderIds, query, path } = this.props;
		return (
			<Fragment>
				<Header
					sections={ [
						[ '/analytics', __( 'Analytics', 'wc-admin' ) ],
						__( 'Orders', 'wc-admin' ),
					] }
				/>
				<ReportFilters
					query={ query }
					path={ path }
					filters={ filters }
					filterPaths={ filterPaths }
					advancedConfig={ advancedFilterConfig }
				/>

				<p>Below is a temporary example</p>
				<Card title="Orders">
					<table style={ { width: '100%' } }>
						<thead>
							<tr style={ { textAlign: 'left' } }>
								<th>Id</th>
								<th>Date</th>
								<th>Total</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{ orderIds &&
								orderIds.map( id => {
									const order = orders[ id ];
									return (
										<tr key={ id }>
											<td>{ id }</td>
											<td>{ moment( order.date_created ).format( 'LL' ) }</td>
											<td>{ order.total }</td>
											<td>{ order.status }</td>
											<td>
												<Button isPrimary onClick={ partial( this.toggleStatus, order ) }>
													Toggle Status
												</Button>
											</td>
										</tr>
									);
								} ) }
						</tbody>
					</table>
				</Card>
			</Fragment>
		);
	}
}

export default compose(
	withSelect( select => {
		const { getOrders, getOrderIds } = select( 'wc-admin' );
		return {
			orders: getOrders(),
			orderIds: getOrderIds(),
		};
	} ),
	withDispatch( dispatch => {
		return {
			requestUpdateOrder: function( updatedOrder ) {
				dispatch( 'wc-admin' ).requestUpdateOrder( updatedOrder );
			},
		};
	} )
)( OrdersReport );