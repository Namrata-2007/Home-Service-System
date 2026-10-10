import React from 'react';
import { X, Printer, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InvoiceModal: React.FC = () => {
  const { invoiceBooking, setInvoiceBooking } = useApp();

  if (!invoiceBooking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full my-auto overflow-hidden border border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Actions bar */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex justify-between items-center print:hidden">
          <span className="text-xs font-semibold text-slate-600">
            Booking Invoice Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={() => setInvoiceBooking(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Area */}
        <div className="p-8 space-y-6 text-slate-800" id="printable-invoice">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Home<span className="text-blue-600">Serve</span>
                </span>
              </div>
              <p className="text-xs text-slate-500">742 Evergreen Plaza, Suite 400</p>
              <p className="text-xs text-slate-500">Springfield, IL 62704 • support@homeserve.com</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Service Invoice
              </span>
              <h3 className="text-lg font-mono font-bold text-slate-900">
                INV-{invoiceBooking.id}
              </h3>
              <p className="text-xs text-slate-500">
                Date: {invoiceBooking.bookingDate}
              </p>
              <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                invoiceBooking.paymentStatus === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {invoiceBooking.paymentStatus === 'Paid' ? 'PAID' : 'PAYABLE ON COMPLETION'}
              </span>
            </div>
          </div>

          {/* Customer & Booking Meta */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-slate-500 mb-1">
                Billed To
              </p>
              <p className="font-semibold text-slate-900 text-sm">{invoiceBooking.userName}</p>
              <p className="text-slate-600">{invoiceBooking.address.street}</p>
              {invoiceBooking.address.apartment && (
                <p className="text-slate-600">{invoiceBooking.address.apartment}</p>
              )}
              <p className="text-slate-600">{invoiceBooking.address.city}, {invoiceBooking.address.zipCode}</p>
              <p className="text-slate-600 mt-1">Phone: {invoiceBooking.userPhone}</p>
              <p className="text-slate-600">Email: {invoiceBooking.userEmail}</p>
            </div>

            <div>
              <p className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-slate-500 mb-1">
                Service Order Details
              </p>
              <p><strong className="text-slate-700">Category:</strong> {invoiceBooking.serviceCategory}</p>
              <p><strong className="text-slate-700">Scheduled Slot:</strong> {invoiceBooking.timeSlot}</p>
              <p><strong className="text-slate-700">Payment Option:</strong> {invoiceBooking.paymentMethod}</p>
              <p className="mt-2">
                <strong className="text-slate-700">Assigned Pro:</strong>{' '}
                {invoiceBooking.technician ? (
                  <span className="text-blue-700 font-semibold">{invoiceBooking.technician.name} ({invoiceBooking.technician.phone})</span>
                ) : (
                  <span className="text-amber-600">Pending Supervisor Assignment</span>
                )}
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="py-2.5 px-3 text-left">Description</th>
                <th className="py-2.5 px-3 text-center">Category</th>
                <th className="py-2.5 px-3 text-right">Qty</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3 px-3">
                  <p className="font-semibold text-slate-900">{invoiceBooking.serviceName}</p>
                  <p className="text-[11px] text-slate-500">Standard residential service with 30-day warranty</p>
                </td>
                <td className="py-3 px-3 text-center text-slate-600">{invoiceBooking.serviceCategory}</td>
                <td className="py-3 px-3 text-right">1</td>
                <td className="py-3 px-3 text-right font-mono">₹{invoiceBooking.servicePrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-600">Doorstep Inspection & Visit Fee</td>
                <td className="py-2 px-3 text-center text-slate-500">—</td>
                <td className="py-2 px-3 text-right">1</td>
                <td className="py-2 px-3 text-right font-mono text-emerald-600">₹0.00</td>
              </tr>
              {invoiceBooking.discountApplied && invoiceBooking.discountApplied > 0 ? (
                <tr>
                  <td className="py-2 px-3 text-emerald-700 font-medium">Promotional Discount Applied</td>
                  <td className="py-2 px-3 text-center text-emerald-700">—</td>
                  <td className="py-2 px-3 text-right">1</td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-700">-₹{invoiceBooking.discountApplied.toFixed(2)}</td>
                </tr>
              ) : null}
            </tbody>
          </table>

          {/* Total calculation */}
          <div className="flex justify-end pt-2">
            <div className="w-56 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{invoiceBooking.servicePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Taxes & GST (0%):</span>
                <span className="font-mono">₹0.00</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Due:</span>
                <span className="text-blue-700 font-mono text-base">₹{invoiceBooking.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Guarantee Footer */}
          <div className="bg-blue-50 border border-blue-200/70 p-3 rounded-xl flex items-center gap-3 text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="font-semibold">HomeServe Satisfaction Guarantee</p>
              <p className="text-[11px] text-blue-700">All services are backed by a complimentary 30-day rework warranty. Contact support@homeserve.com for disputes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
