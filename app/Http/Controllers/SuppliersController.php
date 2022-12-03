<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DateTime;
use App\Models\Supplier;

class SuppliersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $suppliers = Supplier::all();
        return response()->json([
            'data' => $suppliers
        ]);
    }

    public function show($id)
    {
        $suppliers = Supplier::find($id);

        return response()->json([
            'data' => $suppliers
        ]);
    }

    public function add(Request $request)
    {
        $suppliers = new Supplier;
        $suppliers->name = $request->get('name');
        $suppliers->phone_number = $request->get('phone_number');
        $suppliers->address = $request->get('address');
        $suppliers->remark = $request->get('remark');
        $suppliers->save();

        return response()->json([
            'status' => true,
            'created' => true,
            'data' => [
                'id' => $suppliers->id
            ]
        ]);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $supplier->fill($request->all());
        $supplier->updated_at = new DateTime();
        $supplier->save();

        return response()->json([
            'status' => true,
            'data' => $supplier
        ]);
    }

    public function destroy($id)
    {
        $supplier = Supplier::find($id);
        $supplier->delete();
        return response()->json([
            'status' => true,
            'data' => $supplier
        ]);
    }

    public function search($keywords){
        $suppliers = Supplier::where('name', 'LIKE', "%$keywords%")->orWhere('phone_number', 'LIKE', "%$keywords%")->orWhere('address', 'LIKE', "%$keywords%")->orWhere('remark', 'LIKE', "%$keywords%")->get();

        return response()->json([
            'data' => $suppliers
        ]);
    }
}
