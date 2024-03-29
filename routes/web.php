<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth/login');
});

Auth::routes(['register' => false]);

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/getStats', 'App\Http\Controllers\HomeController@getStats');
Route::get('/getChartData', 'App\Http\Controllers\HomeController@getChartData');
Route::get('/getChartData2', 'App\Http\Controllers\HomeController@getChartData2');

Route::prefix('/user')->group(function () {
    Route::get('', 'App\Http\Controllers\UserController@show');
});

Route::prefix('/profile')->group(function () {
    Route::get('', 'App\Http\Controllers\UserController@getUser');
    Route::post('/update', 'App\Http\Controllers\UserController@update');
});

Route::prefix('/products')->group(function () {
    Route::get('', 'App\Http\Controllers\ProductsController@index');
    Route::get('{id}', 'App\Http\Controllers\ProductsController@show');
    Route::get('/search/{keywords}', 'App\Http\Controllers\ProductsController@search');
    Route::get('/find/{item_number}', 'App\Http\Controllers\ProductsController@find');
    Route::post('/add', 'App\Http\Controllers\ProductsController@add');
    Route::post('/destroy/{id}', 'App\Http\Controllers\ProductsController@destroy');
    Route::patch('/update/{product}', 'App\Http\Controllers\ProductsController@update');
    Route::post('/upload/{id}', 'App\Http\Controllers\ProductsController@upload');
});

Route::prefix('/customers')->group(function () {
    Route::get('', 'App\Http\Controllers\CustomersController@index');
    Route::get('/search/{keywords}', 'App\Http\Controllers\CustomersController@search');
    Route::get('{id}', 'App\Http\Controllers\CustomersController@show');
    Route::post('/add', 'App\Http\Controllers\CustomersController@add');
    Route::post('/destroy/{id}', 'App\Http\Controllers\CustomersController@destroy');
    Route::patch('/update/{customer}', 'App\Http\Controllers\CustomersController@update');
});

Route::prefix('/suppliers')->group(function () {
    Route::get('', 'App\Http\Controllers\SuppliersController@index');
    Route::get('/search/{keywords}', 'App\Http\Controllers\SuppliersController@search');
    Route::get('{id}', 'App\Http\Controllers\SuppliersController@show');
    Route::post('/add', 'App\Http\Controllers\SuppliersController@add');
    Route::post('/destroy/{id}', 'App\Http\Controllers\SuppliersController@destroy');
    Route::patch('/update/{supplier}', 'App\Http\Controllers\SuppliersController@update');
});

Route::prefix('/invoices')->group(function () {
    Route::post('new', 'App\Http\Controllers\InvoicesController@create');
    Route::get('/search/{keywords}', 'App\Http\Controllers\InvoicesController@search');
    Route::post('complete/{id}', 'App\Http\Controllers\InvoicesController@complete');
    Route::get('', 'App\Http\Controllers\InvoicesController@index');
    Route::get('/createPDF/{id}', 'App\Http\Controllers\InvoicesController@createPDF');
    Route::post('/destroy/{id}', 'App\Http\Controllers\InvoicesController@destroy');
    Route::get('/get/{id}', 'App\Http\Controllers\InvoicesController@getInvoice');
    Route::post('/edit/{id}', 'App\Http\Controllers\InvoicesController@update');
});

Route::prefix('/sales')->group(function () {
    Route::post('new', 'App\Http\Controllers\SalesController@create');
    Route::get('/search/{keywords}', 'App\Http\Controllers\SalesController@search');
    Route::post('/edit/{id}', 'App\Http\Controllers\SalesController@update');
    Route::post('/toinvoice/{id}', 'App\Http\Controllers\SalesController@toinvoice');
    Route::get('', 'App\Http\Controllers\SalesController@index');
    Route::get('/createPDF/{id}', 'App\Http\Controllers\SalesController@createPDF');
    Route::post('/destroy/{id}', 'App\Http\Controllers\SalesController@destroy');
    Route::get('/get/{id}', 'App\Http\Controllers\SalesController@getSale');
    Route::get('/getCheckout/{id}', 'App\Http\Controllers\SalesController@getSaleforcheckout');
});

Route::prefix('/cash')->group(function () {
    Route::post('new', 'App\Http\Controllers\CashController@create');
    Route::get('', 'App\Http\Controllers\CashController@index');
    Route::get('/createPDF/{id}', 'App\Http\Controllers\CashController@createPDF');
    Route::post('/destroy/{id}', 'App\Http\Controllers\CashController@destroy');
    Route::get('/search/{keywords}', 'App\Http\Controllers\CashController@search');
    Route::post('/edit/{id}', 'App\Http\Controllers\CashController@update');
    Route::get('/get/{id}', 'App\Http\Controllers\CashController@getCashSale');
});

Route::prefix('/receives')->group(function () {
    Route::post('new', 'App\Http\Controllers\ReceivesController@create');
    Route::get('', 'App\Http\Controllers\ReceivesController@index');
    Route::get('/createPDF/{id}', 'App\Http\Controllers\ReceivesController@createPDF');
    Route::post('/destroy/{id}', 'App\Http\Controllers\ReceivesController@destroy');
    Route::get('/search/{keywords}', 'App\Http\Controllers\ReceivesController@search');
    Route::post('/edit/{id}', 'App\Http\Controllers\ReceivesController@update');
    Route::get('/get/{id}', 'App\Http\Controllers\ReceivesController@getReceiveOrder');
});