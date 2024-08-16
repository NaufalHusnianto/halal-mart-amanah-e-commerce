<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;

class ApiTransactionController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Transaction::all());
    }
    
}
