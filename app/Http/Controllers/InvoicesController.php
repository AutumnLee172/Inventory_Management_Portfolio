<?php

namespace App\Http\Controllers;
use App\Models\Invoice;
use App\Models\Content;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use PDF;
use DB;

class InvoicesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function create(Request $request)
    {
        DB::beginTransaction();
        $uuid = Str::uuid()->toString();
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
}
