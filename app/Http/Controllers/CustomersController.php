<?php

namespace App\Http\Controllers;
use DateTime;
use Illuminate\Http\Request;
use App\Models\Customer;

class CustomersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $customers = Customer::all();
        return response()->json([
            'data' => $customers
        ]);
    }

    public function show($id)
    {
        $customer = Customer::find($id);

        return response()->json([
            'data' => $customer
        ]);
    }

    public function add(Request $request)
    {
        $customers = new Customer;
        $customers->name = $request->get('name');
        $customers->phone_number = $request->get('phone_number');
        $customers->address = $request->get('address');
        $customers->remark = $request->get('remark');
        $customers->save();

        return response()->json([
            'status' => true,
            'created' => true,
            'data' => [
                'id' => $customers->id
            ]
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $customer->fill($request->all());
        $customer->updated_at = new DateTime();
        $customer->save();

        return response()->json([
            'status' => true,
            'data' => $customer
        ]);
    }

    public function destroy($id)
    {
        $customer = Customer::find($id);
        $customer->delete();
        return response()->json([
            'status' => true,
            'data' => $customer
        ]);
    }
}
