<?php

namespace App\Http\Controllers;
use App\Models\Invoice;
use App\Models\Content;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PDF;
use DB;
use DateTime;

class InvoicesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function create(Request $request)
    {
        DB::beginTransaction();
        $getid = Invoice::orderBy('id', 'desc')->first()->id + 1;
        $uuid = str_pad($getid,6, 'I00000', STR_PAD_LEFT);
        $invoice = new Invoice;
    
        $invoice->customer_id = ($request->has('customer_id') && !empty($request->get('customer_id'))) ? $request->get('customer_id') : '';
        $invoice->customer_name = ($request->has('customer_name') && !empty($request->get('customer_name'))) ? $request->get('customer_name') : '';
        $invoice->phone_number = ($request->has('phone_number') && !empty($request->get('phone_number'))) ? $request->get('phone_number') : '';
        $invoice->address = ($request->has('address') && !empty($request->get('address'))) ? $request->get('address') : '';
        $invoice->remark = ($request->has('remark') && !empty($request->get('remark'))) ? $request->get('remark') : '';
        $invoice->total = ($request->has('total') && !empty($request->get('total'))) ? $request->get('total') : 0;
        $invoice->discount = ($request->has('discount') && !empty($request->get('discount'))) ? $request->get('discount') : 0;
        $invoice->net = ($request->has('net') && !empty($request->get('net'))) ? $request->get('net') : 0;
        $invoice->deposit = ($request->has('deposit') && !empty($request->get('deposit'))) ? $request->get('deposit') : 0;
        $invoice->balance = ($request->has('balance') && !empty($request->get('balance'))) ? $request->get('balance') : 0;
        $today = new DateTime();        
        $invoice->created_date = ($request->has('date') && !empty($request->get('date'))) ? $request->get('date').' 01:00:00' : $today;
        $invoice->status = "Pending";
        $invoice->transaction_id = $uuid;

            if($invoice->save()){
                DB::commit();
            }else{
                DB::rollback();
            }

        $items = $request->get('cart');
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

            $product = Product::where('item_number', $i['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $i['quantity'];
            $new_quantity = $current_quantity - $invoice_quantity;
            $product->quantity = $new_quantity;
            $product->save();
        }
        
        return response()->json([
            'data' => [
                'id' => $invoice->id
            ]
        ]);
    }

    public function index(){
        $invoices = Invoice::all();
        return response()->json([
            'data' => $invoices
        ]);
    }

    public function createPDF($id){
        $invoice = Invoice::find($id);
        $content = Content::where('transaction_id',$invoice->transaction_id)->get();
        $pdf = PDF::loadView('report_pdf', ['data' => $invoice, 'items' => $content])->setOptions(['defaultFont' => 'sans-serif']);
        return $pdf->download('invoice.pdf');
    }

    public function complete($id){
        $invoice = Invoice::find($id);
        $invoice->status = "Completed";
        $invoice->save();
        return response()->json([
            'data' => [
                'id' => $invoice->id
            ]
        ]);
    }

    public function search($keywords){
        $invoices = Invoice::where('customer_name', 'LIKE', "%$keywords%")->orWhere('phone_number', 'LIKE', "%$keywords%")->orWhere('address', 'LIKE', "%$keywords%")->orWhere('transaction_id', 'LIKE', "%$keywords%")->orWhere('remark', 'LIKE', "%$keywords%")->get();

        return response()->json([
            'data' => $invoices
        ]);
    }

    public function destroy($id){
        $sale = Invoice::find($id);
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

    public function getInvoice($id){
        $invoice = Invoice::find($id);
        $invoice->date = $invoice->created_date;
        $contents = Content::select('item_number','description', 'original_price', 'selling_price', 'quantity' , 'sub_total')->where('transaction_id',$invoice->transaction_id)->get();
        return response()->json([
            'data' => $invoice,
            'items' => $contents
        ]);
    }

    public function update($id, Request $request){
        DB::beginTransaction();
        $sale = Invoice::find($id);    
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
        $today = new DateTime();        
        $sale->created_date = ($request->has('date') && !empty($request->get('date'))) ? $request->get('date').' 01:00:00' : $today;

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
            $content->transaction_type = "Invoice";
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
}
