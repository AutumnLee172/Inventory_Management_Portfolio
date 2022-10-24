<?php

namespace App\Http\Controllers;

use App\Models\Cashsale;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Content;
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
            $invoiceRevenue = (float) $i->balance;
            $RevenueToday = $RevenueToday + $invoiceRevenue;
        }
        foreach ($CashsalesToday as $c) {
            $CashsalesRevenue = (float) $c->balance;
            $RevenueToday = $RevenueToday + $CashsalesRevenue;
        }

        //VsRevenueYtd
        $invoicesYesterday = Invoice::where('status', 'Completed')->whereDate('created_at', Carbon::yesterday())->get();
        $CashsalesYesterday = Cashsale::where('status', 'Completed')->whereDate('created_at', Carbon::yesterday())->get();
        $RevenueYesterday = 0;
        foreach ($invoicesYesterday as $i) {
            $invoiceRevenue = (float) $i->balance;
            $RevenueYesterday = $RevenueYesterday + $invoiceRevenue;
        }
        foreach ($CashsalesYesterday as $c) {
            $CashsalesRevenue = (float) $c->balance;
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
        ]);
    }
}
