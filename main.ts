import legacyGeneral from './clients/legacy/general';
import legacyMerchant from './clients/legacy/merchant';
import legacyPayout from './clients/legacy/payout';

import V1Payment from './clients/v1/payment';
import V1General from './clients/v1/general';
import V1Payout from './clients/v1/payout';

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
    },
}