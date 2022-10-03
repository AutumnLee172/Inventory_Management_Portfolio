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

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::prefix('/user')->group(function () {
    Route::get('', 'App\Http\Controllers\UserController@show');
});

Route::prefix('/profile')->group(function () {
    
});

Route::prefix('/products')->group(function () {
    Route::get('', 'App\Http\Controllers\ProductsController@index');
    Route::get('{id}', 'App\Http\Controllers\ProductsController@show');
    Route::get('/find/{item_number}', 'App\Http\Controllers\ProductsController@find');
    Route::post('/add', 'App\Http\Controllers\ProductsController@add');
    Route::post('/destroy/{id}', 'App\Http\Controllers\ProductsController@destroy');
    Route::patch('/update/{product}', 'App\Http\Controllers\ProductsController@update');
    Route::post('/upload/{id}', 'App\Http\Controllers\ProductsController@upload');
});

Route::prefix('/customers')->group(function () {
    Route::get('', 'App\Http\Controllers\CustomersController@index');
    Route::get('{id}', 'App\Http\Controllers\CustomersController@show');
    Route::post('/add', 'App\Http\Controllers\CustomersController@add');
    Route::post('/destroy/{id}', 'App\Http\Controllers\CustomersController@destroy');
    Route::patch('/update/{customer}', 'App\Http\Controllers\CustomersController@update');
});