import React from 'react';
import Modal from '../common/Modal';
import { formatCurrency } from '../../utils/formatters';

export default function PolicyDetailsModal({ type, onClose, totals }) {
  if (!type) return null;

  const { totalExistingPremium, totalExistingReserve, totalModifiedPremium, totalModifiedReserve, totalAddon } = totals;
  const isModified = type === 'modified';
  
  const title = isModified ? 'Comprehensive Solar Storm & NDBI Protection' : 'Existing Policy';

  return (
    <Modal isOpen={!!type} onClose={onClose} title={title}>
      <div className="mb-4">
        <div className="text-xs text-secondaryText uppercase tracking-widest mb-1">{isModified ? 'Enhanced Cover' : 'Policy category: Standard'}</div>
        <div className="flex flex-col gap-2 bg-panelBg p-4 rounded border border-borderAccent mt-4">
          <div className="flex justify-between">
            <span className="text-secondaryText">{isModified ? 'Modified Premium:' : 'Total Premium:'}</span>
            <span className="font-mono text-mainText">{formatCurrency(isModified ? totalModifiedPremium : totalExistingPremium)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondaryText">{isModified ? 'Modified Reserve:' : 'Total Reserve:'}</span>
            <span className="font-mono text-mainText">{formatCurrency(isModified ? totalModifiedReserve : totalExistingReserve)}</span>
          </div>
        </div>
      </div>

      <h4 className="text-mainText font-semibold mb-2">{isModified ? 'Additional Cover Benefits' : 'Coverage Scope'}</h4>
      <ul className="list-disc pl-5 mb-4 text-secondaryText space-y-2">
        {isModified ? (
          <>
            <li>Parametric protection for qualifying non-physical operational losses.</li>
            <li>Space-weather index trigger using the configured Dst threshold.</li>
            <li>GNSS disruption confirmation, where required by the policy conditions.</li>
            <li>Automated payout calculation after required verification.</li>
            <li>Target processing objective: under 15 minutes.</li>
          </>
        ) : (
          <>
            <li>Physical damage, subject to policy wording.</li>
            <li>Non-physical damage and business interruption: not included in this illustrative baseline.</li>
          </>
        )}
      </ul>

      <div className="bg-amberWarning/10 border border-amberWarning/30 p-3 rounded text-sm text-amberWarning/90 mb-4">
        {isModified 
          ? "Payout eligibility depends on the actual contract wording, source-data validity, event conditions, and configured verification rules. The under-15-minute figure is a design objective for the prototype, not a verified production service-level guarantee." 
          : "Conventional indemnity coverage depends on the specific policy wording, exclusions, and qualifying loss conditions. This case-study baseline assumes that pure space-weather-related operational downtime is not covered."}
      </div>

      {isModified && (
        <div className="bg-secondaryBg border border-borderAccent p-4 rounded text-sm space-y-2 mt-6">
          <h4 className="text-mainText font-semibold mb-3 border-b border-borderAccent pb-2">Financial Summary</h4>
          <div className="flex justify-between"><span className="text-secondaryText">Existing Premium:</span><span className="font-mono">{formatCurrency(totalExistingPremium)}</span></div>
          <div className="flex justify-between"><span className="text-secondaryText">Add-on Premium:</span><span className="font-mono text-cyanAccent">+{formatCurrency(totalAddon)}</span></div>
          <div className="flex justify-between font-bold"><span className="text-mainText">Modified Premium:</span><span className="font-mono text-mainText">{formatCurrency(totalModifiedPremium)}</span></div>
          <hr className="border-borderAccent my-2" />
          <div className="flex justify-between"><span className="text-secondaryText">Additional Reserve:</span><span className="font-mono text-blueAccent">+{formatCurrency(totalModifiedReserve - totalExistingReserve)}</span></div>
          <div className="flex justify-between font-bold"><span className="text-mainText">Modified Reserve:</span><span className="font-mono text-mainText">{formatCurrency(totalModifiedReserve)}</span></div>
        </div>
      )}
    </Modal>
  );
}