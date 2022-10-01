<?php

namespace App\Http\Controllers;
use DateTime;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $products = Product::all();
        return response()->json([
            'data' => $products
        ]);
    }

    public function show($id)
    {
        $products = Product::find($id);

        return response()->json([
            'data' => $products
        ]);
    }

    public function add(Request $request)
    {
        $products = new Product;
        $products->id = $request->get('id');
        $products->item_number = $request->get('item_number');
        $products->description = $request->get('description');
        $products->quantity = $request->get('quantity');
        $products->original_price = $request->get('original_price');
        $products->selling_price = $request->get('selling_price');
        $products->save();

        return response()->json([
            'status' => true,
            'created' => true,
            'data' => [
                'id' => $products->id
            ]
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $product->fill($request->all());
        $product->updated_at = new DateTime();
        $product->save();

        return response()->json([
            'status' => true,
            'data' => $product
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json([
            'status' => true,
            'data' => $product
        ]);
    }
}
