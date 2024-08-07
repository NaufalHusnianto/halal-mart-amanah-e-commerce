<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::where('user_id', auth()->id())->get();
        $products = Product::all();

        return Inertia::render('Transactions', [
            'transactions' => $transactions,
            'products' => $products
        ]);
    }
}