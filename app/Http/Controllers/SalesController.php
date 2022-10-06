<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Content;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PDF;
use DB;
use DateTime;

class SalesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $sales = Sale::all();
        for($s = 0; $s < count($sales); $s++)
        {
            $sales[$s]->created_at = $sales[$s]->created_at->format('d M Y');
        }        

        return response()->json([
            'data' => $sales
        ]);
    }

    public function create(Request $request)
    {
        DB::beginTransaction();
        $uuid = Str::uuid()->toString();
        $sale = new Sale;
    
        $sale->customer_id = ($request->has('customer_id') && !empty($request->get('customer_id'))) ? $request->get('customer_id') : '';
        $sale->customer_name = ($request->has('customer_name') && !empty($request->get('customer_name'))) ? $request->get('customer_name') : '';
        $sale->phone_number = ($request->has('phone_number') && !empty($request->get('phone_number'))) ? $request->get('phone_number') : '';
        $sale->address = ($request->has('address') && !empty($request->get('address'))) ? $request->get('address') : '';
        $sale->remark = ($request->has('remark') && !empty($request->get('remark'))) ? $request->get('remark') : '';
        $sale->total = ($request->has('total') && !empty($request->get('total'))) ? $request->get('total') : 0;
        $sale->discount = ($request->has('discount') && !empty($request->get('discount'))) ? $request->get('discount') : 0;
        $sale->net = ($request->has('net') && !empty($request->get('net'))) ? $request->get('net') : 0;
        $sale->deposit = ($request->has('deposit') && !empty($request->get('deposit'))) ? $request->get('deposit') : 0;
        $sale->balance = ($request->has('balance') && !empty($request->get('balance'))) ? $request->get('balance') : 0;
        $sale->created_date = new DateTime();
        $sale->status = "Pending";
        $sale->transaction_id = $uuid;

            if($sale->save()){
                DB::commit();
            }else{
                DB::rollback();
            }

        $items = $request->get('cart');
        foreach($items as $i){
            $content = new Content;
            $content->transaction_id = $uuid;
            $content->transaction_type = "SalesOrder";
            $content->item_number = $i['item_number'];
            $content->description = $i['description'];
            $content->original_price = $i['original_price'];
            $content->selling_price = $i['selling_price'];
            $content->quantity = $i['quantity'];
            $content->sub_total = $i['sub_total'];
            $content->save();

            $product = Product::where('item_number', $i['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $i['quantity'];
            $new_quantity = $current_quantity - $invoice_quantity;
            $product->quantity = $new_quantity;
            $product->save();
        }
        
        return response()->json([
            'data' => [
                'id' => $sale->customer_id
            ]
        ]);


    }

    public function destroy($id){
        $sale = Sale::find($id);
        Content::where('transaction_id',$sale->transaction_id)->delete();
        $sale->delete();

        return response()->json([
            'status' => 'true'
        ]);

    }

    public function createPDF($id){
        $sale = Sale::find($id);
        // $sales[] = $sale->toArray();
        $content = Content::where('transaction_id',$sale->transaction_id)->get();


        $pdf = PDF::loadView('report_pdf', ['data' => $sale, 'items' => $content])->setOptions(['defaultFont' => 'sans-serif']);
        return $pdf->download('report.pdf');
    }
}
