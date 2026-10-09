export function calculateTotalPremium(rows) {
  return rows.reduce((sum, row) => sum + row.existingPremium, 0);
}

export function calculateTotalReserve(rows) {
  return rows.reduce((sum, row) => sum + row.existingReserve, 0);
}

export function calculateModifiedPremium(rows) {
  return rows.reduce((sum, row) => sum + row.modifiedPremium, 0);
}

export function calculateModifiedReserve(rows) {
  return rows.reduce((sum, row) => sum + row.modifiedReserve, 0);
}

export function calculateTotalAddon(rows) {
  return rows.reduce((sum, row) => sum + row.addon, 0);
}

export function calculatePayout(dst, payoutTiers, sumInsured) {
  let payout = 0;
  for (const tier of payoutTiers) {
    if (dst <= tier.threshold) {
      payout = tier.payout;
    }
  }
  return Math.min(payout, sumInsured);
}

export function evaluateTriggerConditions(input) {
  const { dst, threshold, durationPassed, spaceOracleValid, groundOracleValid } = input;
  if (dst > threshold) return { eligible: false, reason: 'Below index threshold' };
  if (!durationPassed) return { eligible: false, reason: 'Duration requirement not met' };
  if (!spaceOracleValid) return { eligible: false, reason: 'Space Oracle unverifiable' };
  if (!groundOracleValid) return { eligible: false, reason: 'Ground Oracle unverifiable' };
  return { eligible: true, reason: 'All conditions satisfied' };
}