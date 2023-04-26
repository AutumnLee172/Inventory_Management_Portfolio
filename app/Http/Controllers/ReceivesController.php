<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DateTime;
use App\Models\Receive;
use App\Models\Content;
use App\Models\Product;
use Illuminate\Support\Str;
use PDF;
use DB;
use Carbon\Carbon;

class ReceivesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $receives = Receive::all();
        return response()->json([
            'data' => $receives
        ]);
    }

    public function create(Request $request)
    {
        DB::beginTransaction();
        $getid = Receive::orderBy('id', 'desc')->first()->id + 1;
        $uuid = str_pad($getid,6, 'R00000', STR_PAD_LEFT);
        $receive = new Receive;
    
        $receive->supplier_id = ($request->has('supplier_id') && !empty($request->get('supplier_id'))) ? $request->get('supplier_id') : '';
        $receive->supplier_name = ($request->has('supplier_name') && !empty($request->get('supplier_name'))) ? $request->get('supplier_name') : '';
        $receive->phone_number = ($request->has('phone_number') && !empty($request->get('phone_number'))) ? $request->get('phone_number') : '';
        $receive->address = ($request->has('address') && !empty($request->get('address'))) ? $request->get('address') : '';
        $receive->remark = ($request->has('remark') && !empty($request->get('remark'))) ? $request->get('remark') : '';
        $receive->total = ($request->has('total') && !empty($request->get('total'))) ? $request->get('total') : 0;
        $receive->discount = ($request->has('discount') && !empty($request->get('discount'))) ? $request->get('discount') : 0;
        $receive->net = ($request->has('net') && !empty($request->get('net'))) ? $request->get('net') : 0;
        $receive->deposit = ($request->has('deposit') && !empty($request->get('deposit'))) ? $request->get('deposit') : 0;
        $receive->balance = ($request->has('balance') && !empty($request->get('balance'))) ? $request->get('balance') : 0;
        $receive->status = "Completed";
        $today = new DateTime();        
        $receive->created_date = ($request->has('date') && !empty($request->get('date'))) ? $request->get('date').' 01:00:00' : $today;
        $receive->transaction_id = $uuid;

            if($receive->save()){
                DB::commit();
            }else{
                DB::rollback();
            }

        $items = $request->get('cart');
        foreach($items as $i){
            $content = new Content;
            $content->transaction_id = $uuid;
            $content->transaction_type = "Receive Order";
            $content->item_number = $i['item_number'];
            $content->description = $i['description'];
            $content->original_price = $i['original_price'];
            $content->selling_price = $i['original_price'];
            $content->quantity = $i['quantity'];
            $content->sub_total = $i['sub_total'];
            $content->save();

            //adding the product quantity
            $product = Product::where('item_number', $i['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $cash_quantity = (float) $i['quantity'];
            $new_quantity = $current_quantity + $cash_quantity;
            $product->quantity = $new_quantity;
            // $product->original_price = $content->original_price;
            $product->save();
        }
        
        return response()->json([
            'data' => [
                'id' => $receive->id
            ]
        ]);
    }

    public function destroy($id){
        $order = Receive::find($id);
        $contents = Content::where('transaction_id',$order->transaction_id)->get();
        foreach($contents as $content){
            $product = Product::where('item_number', $content['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $content['quantity'];
            $new_quantity = $current_quantity - $invoice_quantity;
            $product->quantity = $new_quantity;
            $product->save();
        }
        $contents->each->delete();
        $order->delete();

        return response()->json([
            'status' => 'true'
        ]);

    }

    public function getReceiveOrder($id){
        $order = Receive::find($id);
        $order->date = $order->created_date;
        $contents = Content::select('item_number','description', 'original_price', 'selling_price', 'quantity' , 'sub_total')->where('transaction_id',$order->transaction_id)->get();
        return response()->json([
            'data' => $order,
            'items' => $contents
        ]);
    }

    public function update($id, Request $request){
        DB::beginTransaction();
        $sale = Receive::find($id);    
       
        // $date = Carbon::createFromFormat('Y-m-d H:i:s', $request->get('date'))->format('Y-m-d');
        // $prevDate = Carbon::createFromFormat('Y-m-d H:i:s', $sale->created_date)->format('Y-m-d');
        // if($date->notEqualTo($prevDate)){
        //     // $sale->created_date = $date;
        // }
        
        $sale->supplier_id = ($request->has('supplier_id') && !empty($request->get('supplier_id'))) ? $request->get('supplier_id') : '';
        $sale->supplier_name = ($request->has('supplier_name') && !empty($request->get('supplier_name'))) ? $request->get('supplier_name') : '';
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

        //decrease back the stock quantity
        $contents = Content::where('transaction_id',$sale->transaction_id)->get();
        foreach($contents as $c){
            $product = Product::where('item_number', $c['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $c['quantity'];
            $new_quantity = $current_quantity - $invoice_quantity;
            $product->quantity = $new_quantity;
            $product->save();
        }
        $contents->each->delete();
        //increase the stock quantity and save in database
        $items = $request->get('cart');
        foreach($items as $i){
            $content = new Content;
            $content->transaction_type = "Receive Order";
            $content->item_number = $i['item_number'];
            $content->description = $i['description'];
            $content->original_price = $i['original_price'];
            $content->selling_price = $i['original_price'];
            $content->quantity = $i['quantity'];
            $content->sub_total = $i['sub_total'];
            $content->transaction_id = $sale->transaction_id;
            $content->save();

            $product = Product::where('item_number', $i['item_number'])->first();
            $current_quantity = (float) $product->quantity;
            $invoice_quantity = (float) $i['quantity'];
            $new_quantity = $current_quantity + $invoice_quantity;
            $product->quantity = $new_quantity;
            // $product->original_price = $content->original_price;
            $product->save();
        }
        
        return response()->json([
            'data' => $sale
        ]);

    }

    public function search($keywords){
        $receive = Receive::where('supplier_name', 'LIKE', "%$keywords%")->orWhere('phone_number', 'LIKE', "%$keywords%")->orWhere('address', 'LIKE', "%$keywords%")->orWhere('transaction_id', 'LIKE', "%$keywords%")->orWhere('remark', 'LIKE', "%$keywords%")->get();

        return response()->json([
            'data' => $receive
        ]);
    }

    public function createPDF($id){
        $receive = Receive::find($id);
        $content = Content::where('transaction_id',$receive->transaction_id)->get();
        $receive->customer_name = $receive->supplier_name;
        $pdf = PDF::loadView('report_pdf', ['data' => $receive, 'items' => $content])->setOptions(['defaultFont' => 'sans-serif']);
        return $pdf->download('ReceiveOrder.pdf');
    }
}
