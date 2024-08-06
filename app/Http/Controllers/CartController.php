<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cartItem = $cart->items()->where('product_id', $request->product_id)->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Product added to cart successfully.');
    }


    public function getCart(): Response
    {
        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->with('items.product')->first();
        Log::info('Cart retrieved', ['cart' => $cart]);

        return Inertia::render('Cart', ['cart' => $cart]);
    }

    public function getCartItemCount()
    {
        $user = Auth::user();
        $cart = Cart::where('user_id', $user->id)->first();
        $itemCount = $cart ? $cart->items()->count() : 0;

        return response()->json(['itemCount' => $itemCount]);
    }
}
