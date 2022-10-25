<?php

namespace App\Http\Controllers;

use App\Models\Cashsale;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Content;
use App\Models\sale;
use Carbon\Carbon;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function getStats()
    {
        //Revenue Today
        $invoicesToday = Invoice::where('status', 'Completed')->whereDate('created_at', Carbon::today())->get();
        $CashsalesToday = Cashsale::where('status', 'Completed')->whereDate('created_at', Carbon::today())->get();
        $RevenueToday = 0;
        foreach ($invoicesToday as $i) {
            $invoiceRevenue = (float) $i->net;
            $RevenueToday = $RevenueToday + $invoiceRevenue;
        }
        foreach ($CashsalesToday as $c) {
            $CashsalesRevenue = (float) $c->net;
            $RevenueToday = $RevenueToday + $CashsalesRevenue;
        }

        //VsRevenueYtd
        $invoicesYesterday = Invoice::where('status', 'Completed')->whereDate('created_at', Carbon::yesterday())->get();
        $CashsalesYesterday = Cashsale::where('status', 'Completed')->whereDate('created_at', Carbon::yesterday())->get();
        $RevenueYesterday = 0;
        foreach ($invoicesYesterday as $i) {
            $invoiceRevenue = (float) $i->net;
            $RevenueYesterday = $RevenueYesterday + $invoiceRevenue;
        }
        foreach ($CashsalesYesterday as $c) {
            $CashsalesRevenue = (float) $c->net;
            $RevenueYesterday = $RevenueYesterday + $CashsalesRevenue;
        }
        $RevenueVs = 0;
        if($RevenueYesterday !== 0){
            $RevenueVs = (($RevenueToday - $RevenueYesterday) / $RevenueYesterday) * 100;
        }       

        //totalNumberofRegisterCustomer
        $thismonthuserstotal = Customer::all()->count();
        $previoustotal = Customer::whereMonth('created_at', '<=', Carbon::now()->subMonth()->month)->count();
        $lastmonthuserstotal = $thismonthuserstotal - $previoustotal;

        //Gross Profit Today
        $contents = Content::whereDate('created_at', Carbon::today())->where(function ($q) {
            $q->where('transaction_type','Invoice')->orWhere('transaction_type', 'Cash Sale');
        })->get();
        $grosstoday = 0;
        foreach($contents as $c){
            $sellingPrice = (float) $c->selling_price;
            $originalPrice = (float) $c->original_price;
            $quantity = (float) $c->quantity;
            $profit = ($sellingPrice - $originalPrice) * $quantity;
            $grosstoday = $grosstoday + $profit;
        }

        //Gross Profit Ytd
        $contentsYTD = Content::whereDate('created_at', Carbon::yesterday())->where(function ($q) {
            $q->where('transaction_type','Invoice')->orWhere('transaction_type', 'Cash Sale');
        })->get();
        $grossytd = 0;
        foreach($contentsYTD as $c){
            $sellingPrice = (float) $c->selling_price;
            $originalPrice = (float) $c->original_price;
            $quantity = (float) $c->quantity;
            $profit = ($sellingPrice - $originalPrice) * $quantity;
            $grossytd = $grossytd + $profit;
        }
        $GrossVs = 0;
        if($grossytd !== 0){
            $GrossVs = (($grosstoday - $grossytd) / $grossytd) * 100;
        }

        //Total Uncollected Cash Sale
        $contentsUncollected = Content::where('transaction_type','SalesOrder')->where(function ($q) {
            $q->where('checked','0')->orWhere('checked', null);
        })->get();
        $uncollectedMoney = 0;
        foreach($contentsUncollected as $c){
            $subtotal = (float) $c->sub_total;
            $uncollectedMoney = $uncollectedMoney + $subtotal;
        }

        //Table Data
        $invoicesTable = Invoice::select('transaction_id', 'customer_name', 'net', 'created_date')->orderBy('id', 'desc')->take(2)->get();
        $CashTable = Cashsale::select('transaction_id', 'customer_name', 'net', 'created_date')->orderBy('id', 'desc')->take(2)->get();
        $SalesTable = Sale::select('transaction_id', 'customer_name', 'net', 'created_date')->orderBy('id', 'desc')->take(2)->get();
        foreach($invoicesTable as $i){
            $i->transaction_type = "Invoices";
        }
        foreach($CashTable as $c){
            $c->transaction_type = "Cash Sale";
        }
        foreach($SalesTable as $s){
            $s->transaction_type = "Sales Order";
        }
        $TableData = array_merge($invoicesTable->toArray(), $CashTable->toArray(), $SalesTable->toArray());

        $RevenueToday = number_format($RevenueToday, 2);
        $RevenueVs = number_format($RevenueVs, 2);
        $grosstoday = number_format($grosstoday, 2);
        $GrossVs = number_format($GrossVs, 2);
        $uncollectedMoney = number_format($uncollectedMoney, 2);

        return response()->json([
            'RevenueToday' => $RevenueToday,
            'RevenueVs' => $RevenueVs,
            'thismonthuserstotal' => $thismonthuserstotal,
            'lastmonthuserstotal' => $lastmonthuserstotal,
            'grosstoday' => $grosstoday,
            'GrossVs' => $GrossVs,
            'uncollectedMoney' => $uncollectedMoney,
            'TableData' => $TableData,
        ]);
    }

    public function getChartData()
    {
        // $InvoicesMonth = Invoice::selectRaw('sum(net) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        // $CashMonth = Cashsale::selectRaw('sum(net) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        // $RevenueMonth = [];
        // $RevenueMonthSum = [];
        // foreach($InvoicesMonth as $i){
        //     foreach($CashMonth as $c){
        //         if($c['months'] == $i['months']){
        //             $i['sum'] = $c['sum'] + $i['sum'];
        //         }
        //     }
        //     array_push($RevenueMonthSum, $i['sum']);
        //     array_push($RevenueMonth, $i['months']);
        // }

        // return response()->json([
        //     'data' => $RevenueMonthSum,
        //     'label' => $RevenueMonth,
        // ]);

        $InvoicesMonth = Invoice::selectRaw('sum(net) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        $CashMonth = Cashsale::selectRaw('sum(net) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        $RevenueMonth = [];
        $InvoiceRevenue = [];
        $CashRevenue = [];
        $temp = [];
        foreach($InvoicesMonth as $i){
            array_push($RevenueMonth, $i['months']);
        }
        foreach($CashMonth as $c){
           if(in_array($c['months'], $RevenueMonth))
           {
           }else{
            array_push($RevenueMonth, $c['months']);
           }
        }
        foreach($RevenueMonth as $r){
            foreach($InvoicesMonth as $i){
               if($i['months'] == $r){
                array_push($InvoiceRevenue, $i['sum']);
                array_push($temp, $i['months']);
               }
            }
            if(!in_array($r, $temp)){
                array_push($InvoiceRevenue, 0);
            }
        }

        $temp = [];
        foreach($RevenueMonth as $r){
            foreach($CashMonth as $c){
               if($c['months'] == $r){
                array_push($CashRevenue, $c['sum']);
                array_push($temp, $c['months']);
               }
            }
            if(!in_array($r, $temp)){
                array_push($CashRevenue, 0);
            }
        }

        return response()->json([
            'InvoiceData' => $InvoiceRevenue,
            'CashData' => $CashRevenue,
            'label' => $RevenueMonth,
        ]);
    }

    public function getChartData2()
    {
        // $InvoicesMonth = Invoice::selectRaw('count(id) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        // $CashMonth = Cashsale::selectRaw('count(id) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        // $NumberMonth = [];
        // $NumberOrder = [];
        // foreach($InvoicesMonth as $i){
        //     foreach($CashMonth as $c){
        //         if($c['months'] == $i['months']){
        //             $i['sum'] = $c['sum'] + $i['sum'];
        //         }
        //     }
        //     array_push($NumberOrder, $i['sum']);
        //     array_push($NumberMonth, $i['months']);
        // }
        // return response()->json([
        //     'data' => $NumberOrder,
        //     'label' => $NumberMonth,
        // ]);

        $InvoicesMonth = Invoice::selectRaw('count(id) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        $CashMonth = Cashsale::selectRaw('count(id) as sum')->selectRaw("DATE_FORMAT(created_at,'%M %Y') as months")->groupBy('months')->get();
        $NumberMonth = [];
        $InvoiceNumber = [];
        $CashNumber = [];
        $temp = [];
        foreach($InvoicesMonth as $i){
            array_push($NumberMonth, $i['months']);
        }
        foreach($CashMonth as $c){
           if(in_array($c['months'], $NumberMonth))
           {
           }else{
            array_push($NumberMonth, $c['months']);
           }
        }

        foreach($NumberMonth as $r){
            foreach($InvoicesMonth as $i){
               if($i['months'] == $r){
                array_push($InvoiceNumber, $i['sum']);
                array_push($temp, $i['months']);
               }
            }
            if(!in_array($r, $temp)){
                array_push($InvoiceNumber, 0);
            }
        }

        $temp = [];
        foreach($NumberMonth as $r){
            foreach($CashMonth as $c){
               if($c['months'] == $r){
                array_push($CashNumber, $c['sum']);
                array_push($temp, $c['months']);
               }
            }
            if(!in_array($r, $temp)){
                array_push($CashNumber, 0);
            }
        }
        
        return response()->json([
            'InvoiceData' => $InvoiceNumber,
            'CashData' => $CashNumber,
            'label' => $NumberMonth,
        ]);
    }
}
