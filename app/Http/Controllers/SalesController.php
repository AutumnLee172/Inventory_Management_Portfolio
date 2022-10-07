<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Content;
use App\Models\Invoice;
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
        $contents = Content::where('transaction_id',$sale->transaction_id)->get();
        foreach($contents as $content){
            $product = Product::where('item_number', $content['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $content['quantity'];
            $new_quantity = $current_quantity + $invoice_quantity;
            $product->quantity = $new_quantity;
            $product->save();
        }
        $contents->each->delete();
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

    public function getSale($id){
        $sale = Sale::find($id);
        $contents = Content::select('item_number','description', 'original_price', 'selling_price', 'quantity' , 'sub_total')->where('transaction_id',$sale->transaction_id)->get();
        return response()->json([
            'data' => $sale,
            'items' => $contents
        ]);
    }

    public function update($id, Request $request){
        DB::beginTransaction();
        $sale = Sale::find($id);    
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

            if($sale->save()){
                DB::commit();
            }else{
                DB::rollback();
            }

        //increase back the stock quantity
        $contents = Content::where('transaction_id',$sale->transaction_id)->get();
        foreach($contents as $c){
            $product = Product::where('item_number', $c['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $c['quantity'];
            $new_quantity = $current_quantity + $invoice_quantity;
            $product->quantity = $new_quantity;
            $product->save();
        }
        $contents->each->delete();
        //decrease the stock quantity and save in database
        $items = $request->get('cart');
        foreach($items as $i){
            $content = new Content;
            $content->transaction_type = "SalesOrder";
            $content->item_number = $i['item_number'];
            $content->description = $i['description'];
            $content->original_price = $i['original_price'];
            $content->selling_price = $i['selling_price'];
            $content->quantity = $i['quantity'];
            $content->sub_total = $i['sub_total'];
            $content->transaction_id = $sale->transaction_id;
            $content->save();

            $product = Product::where('item_number', $i['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $i['quantity'];
            $new_quantity = $current_quantity - $invoice_quantity;
            $product->quantity = $new_quantity;
            $product->save();
        }
        
        return response()->json([
            'data' => $sale
        ]);

    }

    public function toinvoice($id){
        $sale = Sale::find($id);
        $uuid = Str::uuid()->toString();

        DB::beginTransaction();
        $invoice = new Invoice;
    
        $invoice->customer_id =  $sale->customer_id;
        $invoice->customer_name = $sale->customer_name;
        $invoice->phone_number =  $sale->phone_number;
        $invoice->address = $sale->address;
        $invoice->remark = $sale->remark;
        $invoice->total = $sale->total;
        $invoice->discount = $sale->discount;
        $invoice->net = $sale->net;
        $invoice->deposit = $sale->deposit;
        $invoice->balance = $sale->balance;
        $invoice->status = "Pending";
        $invoice->transaction_id = $uuid;
        $invoice->created_date = new DateTime();

            if($invoice->save()){
                DB::commit();
            }else{
                DB::rollback();
            }
        
        $sale->status ="Invoiced";
        $sale->save();

        $items = Content::where('transaction_id',$sale->transaction_id)->get();
        foreach($items as $i){
            $content = new Content;
            $content->transaction_id = $uuid;
            $content->transaction_type = "Invoice";
            $content->item_number = $i['item_number'];
            $content->description = $i['description'];
            $content->original_price = $i['original_price'];
            $content->selling_price = $i['selling_price'];
            $content->quantity = $i['quantity'];
            $content->sub_total = $i['sub_total'];
            $content->save();
        }
        
        return response()->json([
            'data' => $invoice
        ]);
    }
}
