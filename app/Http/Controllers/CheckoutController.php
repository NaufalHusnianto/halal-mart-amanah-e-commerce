<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\CartItem;
use App\Models\Transaction;

class CheckoutController extends Controller
{
    public function checkout(Request $request)
    {
        $selectedItems = $request->input('selectedItems');
        return Inertia::render('Checkout', [
            'selectedItems' => $selectedItems,
        ]);
    }

    public function purchase(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'payment_invoice' => 'required|file|mimes:jpg,jpeg,png,pdf',
        ]);

        $invoicePath = $request->file('payment_invoice')->store('invoices', 'public');

        $transaction = new Transaction();
        $transaction->user_id = auth()->id();
        $transaction->items = json_encode($request->input('items'));
        $transaction->shipping_address = $request->input('shipping_address');
        $transaction->payment_invoice = $invoicePath;
        $transaction->status = 'pending';
        $transaction->save();

        return redirect()->route('transaction.history')->with('success', 'Transaction submitted. Waiting for admin confirmation.');
    }
}
