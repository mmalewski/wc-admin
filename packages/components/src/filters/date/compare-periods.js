/** @format */
/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * WooCommerce dependencies
 */
import { periods } from '@woocommerce/date';

/**
 * Internal dependencies
 */
import SegmentedSelection from '../../segmented-selection';

class ComparePeriods extends Component {
	render() {
		const { onSelect, compare } = this.props;
		return (
			<SegmentedSelection
				options={ periods }
				selected={ compare }
				onSelect={ onSelect }
				name="compare"
				legend={ __( 'compare to', 'wc-admin' ) }
			/>
		);
	}
}

ComparePeriods.propTypes = {
	onSelect: PropTypes.func.isRequired,
	compare: PropTypes.string,
};

export default ComparePeriods;
