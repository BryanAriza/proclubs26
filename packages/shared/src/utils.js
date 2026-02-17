"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformLabel = exports.formatDate = exports.formatWinRate = exports.formatNumber = void 0;
const formatNumber = (num) => {
    if (num === undefined || num === null)
        return '0';
    return num.toLocaleString('en-US');
};
exports.formatNumber = formatNumber;
const formatWinRate = (wins, total) => {
    if (total === 0)
        return '0%';
    return ((wins / total) * 100).toFixed(1) + '%';
};
exports.formatWinRate = formatWinRate;
const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
exports.formatDate = formatDate;
const platformLabel = (platform) => {
    switch (platform) {
        case 'common-gen5':
            return 'Current Gen';
        case 'common-gen4':
            return 'Last Gen';
        case 'nx':
            return 'Switch';
        default:
            return platform;
    }
};
exports.platformLabel = platformLabel;
//# sourceMappingURL=utils.js.map