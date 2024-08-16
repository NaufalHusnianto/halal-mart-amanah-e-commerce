<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApiProductController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Product::all());
    }
    
}
