import legacyGeneral from './clients/legacy/general.js';
import legacyMerchant from './clients/legacy/merchant.js';
import legacyPayout from './clients/legacy/payout.js';

import V1Payment from './clients/v1/payment.js';
import V1General from './clients/v1/general.js';
import V1Payout from './clients/v1/payout.js';
import V1Common from './clients/v1/common.js';

export default {
    legacy: {
        general: legacyGeneral,
        merchant: legacyMerchant,
        payout: legacyPayout,
    },
    v1: {
        payment: V1Payment,
        general: V1General,
        payout: V1Payout,
        common: V1Common,
    },
}